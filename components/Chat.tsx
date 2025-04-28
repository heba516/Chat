import { deleteChat } from "@/app/actions/userActions";
import { Avatar, AvatarImage } from "@/components/ui";
import { Ichat } from "@/interfaces";
import { Trash } from "lucide-react";

interface IProps {
  user: Ichat;
  setContacts: React.Dispatch<React.SetStateAction<Ichat[]>>;
}

const Chat = ({
  user,
  setContacts,
  ...props
}: IProps & React.HTMLProps<HTMLDivElement>) => {
  const handleDelete = async (id: string) => {
    if (user._id) await deleteChat(user._id);
    setContacts((prev: Ichat[]) =>
      prev.filter((contact) => contact._id !== id)
    );
  };

  return (
    <div
      className="cursor-pointer p-3 flex items-center justify-between hover:bg-gray-100"
      {...props}
    >
      <div className="flex items-center flex-grow space-x-4">
        <Avatar>
          <AvatarImage
            src={
              user.profilePhoto
                ? `http://localhost:3000/${user.profilePhoto?.replace(
                    /\\/g,
                    "/"
                  )}`
                : "profile.png"
            }
            alt="@shadcn"
          />
        </Avatar>
        <p className="text-lg">{user.fullName}</p>
      </div>
      <Trash
        onClick={() => handleDelete(user._id)}
        className="text-red-500 cursor-pointer hover:text-red-700"
        size={18}
      />
    </div>
  );
};

export default Chat;
