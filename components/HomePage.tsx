"use client";
import ChatArea from "@/components/ChatArea";
import Chats from "@/components/Chats";
import Nav from "@/components/Nav";
import { useState } from "react";

const HomePage = () => {
  const [showChatArea, setShowChatArea] = useState<boolean>(false);
  return (
    <>
      <div
        className={`${
          showChatArea && "hidden"
        } lg:flex flex-col w-full lg:w-2/5`}
      >
        <Nav />
        <Chats setShowChatArea={setShowChatArea} />
      </div>
      <div className={`${!showChatArea && "hidden"} lg:block w-full`}>
        <ChatArea
          chat={{ name: "Heba Yasser", img: "" }}
          setShowChatArea={setShowChatArea}
        />
      </div>
    </>
  );
};

export default HomePage;
