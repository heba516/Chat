import React from "react";
import ChatRow from "./ChatRow";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "./ui/scroll-area";

const Chats = () => {
  return (
    <ScrollArea className="w-full max-h-[88vh] p-4 bg-white rounded-2xl">
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
      <Separator className="my-2" />
      <ChatRow name={"Heba Yasser"} img={""} />
    </ScrollArea>
  );
};

export default Chats;
