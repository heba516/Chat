import React from "react";
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { Ichat } from "@/interfaces";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import MessageBox from "./MessageBox";

const ChatArea = ({ name }: Ichat) => {
  return (
    <div className="flex flex-col w-full max-h-full p-3 pb-0 bg-white rounded-2xl">
      <header className="flex items-center space-x-2">
        <div className="w-full bg-white shadow-md rounded-full py-2 px-5 mb-5 flex items-center space-x-5">
          <ArrowLeft className="hover:animate-pulse cursor-pointer" size={20} />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <p className="font-semibold text-lg">{name}</p>
        </div>
      </header>
      <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full px-4">
          <MessageBox msgContent="Hello" side="left" />
          <MessageBox msgContent="How Are You ?" side="right" />
          <MessageBox msgContent="Hello" side="left" />
          <MessageBox msgContent="Hello" side="left" />
          <MessageBox msgContent="How Are You ?" side="right" />
          <MessageBox msgContent="Hello" side="left" />
          <MessageBox msgContent="How Are You ?" side="right" />
          <MessageBox msgContent="How Are You ?" side="right" />
          <MessageBox msgContent="How Are You ?" side="right" />
          <MessageBox msgContent="Hello" side="left" />
          <MessageBox msgContent="How Are You ?" side="right" />
          <MessageBox msgContent="How Are You ?" side="right" />
        </ScrollArea>
      </div>
      <div className="w-full bg-white shadow-md rounded-full py-2 px-5 mb-5 flex items-center space-x-2">
        <Input placeholder="Write something..." className="rounded-full" />
        <div className="bg-green-600 hover:bg-green-700 p-2 rounded-full">
          <SendHorizonal size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;