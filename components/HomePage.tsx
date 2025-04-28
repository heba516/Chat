"use client";
import Conversation from "@/components/Conversation";
import Sidebar from "@/components/Sidebar";
import Nav from "@/components/Nav";
import { useCallback, useState } from "react";
import { MessageSquareTextIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Ichat } from "@/interfaces";
// import Cookies from "js-cookie";

const HomePage = () => {
  const [showChatArea, setShowChatArea] = useState<boolean>(false);

  const { regInfo, setUser } = useAuth();

  const handleChatSelect = useCallback((id: string, user: Ichat) => {
    localStorage.setItem("userID", id);
    setShowChatArea(true);
    setUser({
      fullName: user.fullName,
      _id: user._id,
      profilePhoto: user.profilePhoto,
    });
  }, []);

  return (
    <>
      <div
        className={`${
          showChatArea && "hidden"
        } lg:flex flex-col w-full lg:w-2/5`}
      >
        <Nav />
        <Sidebar onChatSelect={handleChatSelect} />
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
