"use client";
import Conversation from "@/components/Conversation";
import Sidebar from "@/components/Sidebar";
import Nav from "@/components/Nav";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageSquareTextIcon } from "lucide-react";

const HomePage = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [showChatArea, setShowChatArea] = useState<boolean>(false);
  return (
    <QueryClientProvider client={queryClient}>
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
          <Conversation
            setShowChatArea={setShowChatArea}
            chat={{
              name: "Heba Yasser",
              img: "",
              id: "673df15c463293a44fa39df0",
            }}
          />
        ) : (
          <div className="h-full flex flex-col justify-center place-items-center text-center">
            <h2 className="text-3xl font-semibold text-green-700">
              Welcome 👋 Heba
            </h2>
            <h2 className="text-3xl font-semibold text-green-700 my-3">
              Select chat to start messaging
            </h2>
            <MessageSquareTextIcon className="h-10 w-10 text-green-700" />
          </div>
        )}

        {/*  */}
      </div>
    </QueryClientProvider>
  );
};

export default HomePage;
