"use client";
import React from "react";
import Chat from "./Chat";
import useQueryData from "@/hooks/UseReactQuery";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";

const Sidebar = ({
  setShowChatArea,
}: {
  setShowChatArea: (con: boolean) => void;
}) => {
  const { data, isLoading } = useQueryData({
    queryKey: ["chats"],
    url: "/users",
  });
  console.log("chats", data[0]);

  return (
    <ScrollArea className="w-full h-[88vh] sm:h-[86vh] p-4 bg-white rounded-2xl">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 my-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        ))
      ) : (
        <>
          {data.map((chat: { _id: string; fullName: string }) => (
            <React.Fragment key={chat._id}>
              <Chat
                id={chat._id}
                name={chat.fullName}
                img={"signup.jpg"}
                onClick={() => {
                  setShowChatArea(true);
                  localStorage.setItem("userID", chat._id);
                }}
              />
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </>
      )}
    </ScrollArea>
  );
};

export default Sidebar;
