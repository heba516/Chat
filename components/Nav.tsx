"use client";

import { EllipsisVertical, LogOut, Pen } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
} from "./ui";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  function logout() {
    localStorage.clear();
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
          <Label htmlFor="pic">
            <DropdownMenuItem>
              <Pen />
              <span>Add photo</span>
              <Input type="file" className="hidden" id="pic" />
            </DropdownMenuItem>
          </Label>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="text-red-600 hover:text-red-600"
          >
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Nav;
