"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { ArrowLeft, SendHorizonal } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

import { Ichat } from "@/interfaces";
import MessageBox from "./MessageBox";

import useQueryData from "@/hooks/UseReactQuery";
import { sendMsg } from "@/app/actions/userActions";

interface Iprops {
  chat: Ichat;
  setShowChatArea: (con: boolean) => void;
}

const Conversation = ({ chat, setShowChatArea }: Iprops) => {
  const { handleSubmit } = useForm<{ message: string }>();

  const { data, isLoading } = useQueryData({
    queryKey: ["messages", `${localStorage.getItem("userID")}`],
    url: `/messages/${localStorage.getItem("userID")}`,
  });
  console.log("messages", { data });

  const onSubmit: SubmitHandler<{ message: string }> = async (data) => {
    const id = localStorage.getItem("userID");
    if (id) await sendMsg(id, data.message);
  };

  return (
    <main className="flex flex-col h-full">
      <header className="flex items-center space-x-2">
        <div className="w-full bg-white shadow-md rounded-full p-2 mb-5 flex items-center space-x-3">
          {isLoading ? (
            <div className="flex items-center space-x-4 my-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
          ) : (
            <>
              <ArrowLeft
                onClick={() => {
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
              <p className="font-semibold text-lg">{chat.name}</p>
            </>
          )}
        </div>
      </header>
      <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full px-4">
          {isLoading ? (
            <Skeleton className="h-8 w-[250px]" />
          ) : (
            data.map((msg: string) => (
              <MessageBox key={msg} msgContent={msg} side="left" />
            ))
          )}
        </ScrollArea>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white shadow-md rounded-full py-2 px-5 flex items-center space-x-2"
      >
        <Input placeholder="Write something..." className="rounded-full" />
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
