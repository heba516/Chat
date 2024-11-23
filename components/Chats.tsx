"use client";
import ChatRow from "./ChatRow";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "./ui/scroll-area";

const Chats = ({
  setShowChatArea,
}: {
  setShowChatArea: (con: boolean) => void;
}) => {
  return (
    <ScrollArea className="w-full h-[88vh] sm:h-[86vh] p-4 bg-white rounded-2xl">
      <ChatRow
        name={"Heba Yasser"}
        img={""}
        onClick={() => setShowChatArea(true)}
      />
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
      <ChatRow name={"Nashwa Ahmed"} img={""} />
    </ScrollArea>
  );
};

export default Chats;
