import { deleteChat } from "@/app/actions/userActions";
import { Avatar, AvatarImage } from "@/components/ui";
import { Ichat } from "@/interfaces";
import { Trash } from "lucide-react";

const Chat = ({
  fullName,
  img,
  id,
  ...props
}: Ichat & React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className="cursor-pointer p-3 flex items-center justify-between hover:bg-gray-100"
      {...props}
    >
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={img} alt="@shadcn" />
        </Avatar>
        <p className="text-lg">{fullName}</p>
      </div>
      <Trash
        onClick={() => {
          if (id) deleteChat(id);
        }}
        className="text-red-500 cursor-pointer hover:text-red-700"
        size={18}
      />
    </div>
  );
};

export default Chat;
