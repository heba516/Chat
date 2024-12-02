"use client";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import { Separator, Skeleton, ScrollArea } from "@/components/ui";
import { sidebar } from "@/app/actions/userActions";
import { useAuth } from "@/context/AuthContext";

const Sidebar = ({
  setShowChatArea,
}: {
  setShowChatArea: (con: boolean) => void;
}) => {
  const [data, setData] = useState<{ _id: string; fullName: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sidebar();
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
          {data.map((chat) => (
            <React.Fragment key={chat._id}>
              <Chat
                id={chat._id}
                fullName={chat.fullName}
                img={"signup.jpg"}
                onClick={() => {
                  setUser({ fullName: chat.fullName });
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
