import ChatArea from "@/components/ChatArea";
import Chats from "@/components/Chats";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div className="max-h-screen p-3 lg:p-5 lg:px-10 bg-orange-100 flex space-x-5">
      <div className="flex flex-col w-full lg:w-2/5">
        <Nav />
        <Chats />
      </div>
      <ChatArea img="" name="Heba Yasser" />
    </div>
  );
}
