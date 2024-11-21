"use client";

import { EllipsisVertical, LogOut, Pen, Trash } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { deleteAcc } from "@/app/actions/auth";

const Nav = () => {
  const router = useRouter();
  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div className="w-full bg-white shadow-md rounded-full py-2 px-5 mb-5 flex items-center justify-between">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-5">
          <DropdownMenuItem>
            <Pen />
            <span>Edit Photo</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600" onClick={deleteAcc}>
            <Trash />
            <span>Delete Account</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Nav;
