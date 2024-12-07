"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";
import { getMessages } from "@/app/actions/userActions";
import MessageBox from "./MessageBox";
import { Input, Button, ScrollArea, Avatar, AvatarImage, Skeleton } from "./ui";
import { ArrowLeft, SendHorizonal } from "lucide-react";

interface Iprops {
  setShowChatArea: (con: boolean) => void;
}

interface Imsg {
  message: string;
  senderId: string;
  receiverId: string;
}

const Conversation = ({ setShowChatArea }: Iprops) => {
  const { register, handleSubmit, reset } = useForm<Imsg>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Imsg[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const { user } = useAuth();
  const regID = localStorage.getItem("regID");
  const id = localStorage.getItem("userID");

  useEffect(() => {
    if (!id) {
      console.error("No userID found in localStorage.");
      return;
    }

    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const res = await getMessages(id);
        setMessages(res);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    const socketInstance = io("http://localhost:3000");

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Socket connected successfully:", socketInstance.id);
    });

    socketInstance.on("new_message", (messageData: Imsg) => {
      console.log("Received message:", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socketInstance.disconnect();
      console.log("Socket disconnected.");
    };
  }, [id]);

  const onSubmit: SubmitHandler<Imsg> = async (msg) => {
    if (id && regID && msg.message) {
      try {
        if (socket && msg.message) {
          try {
            const messageData = {
              message: msg.message,
              senderId: regID,
              receiverId: id,
            };
            socket.emit("message", messageData);
            setMessages((prevMessages) => [...prevMessages, messageData]);
            reset();
          } catch (error) {
            console.error("Failed to send message:", error);
          }
        } else {
          console.error("Socket is not initialized or message is empty.");
        }

        reset();
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    } else {
      console.error("No userID found in localStorage.");
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <main className="flex flex-col h-full">
      <header className="flex items-center space-x-2">
        <div className="w-full bg-white shadow-md rounded-full p-2 mb-5 flex items-center space-x-3">
          <ArrowLeft
            onClick={() => {
              setMessages([]);
              setShowChatArea(false);
              localStorage.removeItem("userID");
            }}
            className="lg:hidden mx-3 hover:animate-pulse cursor-pointer"
            size={20}
          />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <div>
            <p className="font-semibold text-lg">{user.fullName}</p>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full px-4">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-[250px] rounded-full" />
              <Skeleton className="h-10 w-[250px] rounded-full ml-auto" />
            </div>
          ) : (
            messages.map((msg: Imsg, index: number) => (
              <MessageBox
                key={index}
                msgContent={msg.message}
                id={msg.senderId}
              />
            ))
          )}
          <div ref={scrollRef} />
        </ScrollArea>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white shadow-md rounded-full py-2 px-5 flex items-center space-x-2"
      >
        <Input
          {...register("message")}
          placeholder="Write something..."
          className="rounded-full"
        />
        <Button
          type="submit"
          size={"icon"}
          className="bg-green-600 hover:bg-green-700 p-2 rounded-full"
        >
          <SendHorizonal size={20} className="text-white" />
        </Button>
      </form>
    </main>
  );
};

export default Conversation;
