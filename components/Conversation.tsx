"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";
import { getMessages, sendMsg } from "@/app/actions/userActions";
import { Ichat } from "@/interfaces";
import MessageBox from "./MessageBox";
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { Input, Button, ScrollArea, Avatar, AvatarImage } from "./ui";

interface Iprops {
  chat: Ichat;
  setShowChatArea: (con: boolean) => void;
}
interface Imsg {
  message: string;
  senderId: string;
}

interface MyEvents {
  message: (message: string) => void;
  disconnect: () => void;
}

const Conversation = ({ setShowChatArea }: Iprops) => {
  const { register, handleSubmit, reset } = useForm<Imsg>();

  const [messages, setMessages] = useState<Imsg[]>([]);
  const [socket, setSocket] = useState<Socket<MyEvents>>();

  const { user, regInfo } = useAuth();

  const id = localStorage.getItem("userID");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await getMessages(id);
        setMessages(res);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
      // finally {
      //   setIsLoading(false);
      // }
    };
    fetchData();

    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });

    socketInstance.on("message", (message: string) => {
      console.log(`Received message: ${message}`);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, senderId: id },
      ]);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [id]);

  const onSubmit: SubmitHandler<Imsg> = async (msg) => {
    if (id && msg.message) {
      try {
        const response = await sendMsg(id, msg.message);

        if (socket && msg.message) {
          socket.emit("message", msg.message);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              message: msg.message,
              senderId: regInfo.id,
            },
          ]);
        }

        reset();
        return response;
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
          {
            <>
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
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
              <p className="font-semibold text-lg">{user.fullName}</p>
            </>
          }
        </div>
      </header>
      <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full px-4">
          {messages.map((msg: Imsg, index: number) => (
            <MessageBox
              key={index}
              msgContent={msg.message}
              id={`${msg.senderId}`}
            />
          ))}
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
