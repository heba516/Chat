"use client";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import { Separator, Skeleton, ScrollArea } from "@/components/ui";
import { sidebar } from "@/app/actions/userActions";
import { useAuth } from "@/context/AuthContext";
import { Ichat } from "@/interfaces";

const Sidebar = ({
  setShowChatArea,
}: {
  setShowChatArea: (con: boolean) => void;
}) => {
  const [contacts, setContacts] = useState<Ichat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setUser } = useAuth();

  const fetchData = async () => {
    try {
      const response = await sidebar();
      setContacts([
        ...response.data.map((contact: Ichat) => ({
          ...contact,
          img: "https://github.com/shadcn.png",
        })),
      ]);
    } catch (error) {
      console.error("Error fetching sidebar data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
          {contacts.map((contact) => (
            <React.Fragment key={contact._id}>
              <Chat
                user={contact}
                setContacts={setContacts}
                setChat={() => {
                  setUser({
                    fullName: contact.fullName,
                    _id: contact._id,
                    img: "login.jpg",
                  });
                  setShowChatArea(true);
                  localStorage.setItem("userID", contact._id);
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
