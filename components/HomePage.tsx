"use client";
import Conversation from "@/components/Conversation";
import Sidebar from "@/components/Sidebar";
import Nav from "@/components/Nav";
import { useState } from "react";
import { MessageSquareTextIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const [showChatArea, setShowChatArea] = useState<boolean>(false);

  const { regInfo } = useAuth();

  return (
    <>
      <div
        className={`${
          showChatArea && "hidden"
        } lg:flex flex-col w-full lg:w-2/5`}
      >
        <Nav />
        <Sidebar setShowChatArea={setShowChatArea} />
      </div>

      <div
        className={`${
          !showChatArea && "hidden"
        } lg:block w-full h-[96vh] p-3 bg-white rounded-2xl`}
      >
        {localStorage.getItem("userID") ? (
          <Conversation setShowChatArea={setShowChatArea} />
        ) : (
          <div className="h-full flex flex-col justify-center place-items-center text-center">
            <h2 className="text-3xl font-semibold text-green-700">
              Welcome 👋 {regInfo.fullName}
            </h2>

            <h2 className="text-3xl font-semibold text-green-700 my-3">
              Select chat to start messaging
            </h2>

            <MessageSquareTextIcon className="h-10 w-10 text-green-700" />
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
