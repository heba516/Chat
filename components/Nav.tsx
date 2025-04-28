"use client";

import { CameraIcon, LogOut } from "lucide-react";
import { Avatar, AvatarImage, Input, Label } from "./ui";
import { useRouter } from "next/navigation";
import { uploadProfilePhoto } from "@/app/actions/userActions";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";

const Nav = () => {
  const path = useRouter();
  const { regInfo, setRegInfo } = useAuth();

  function logout() {
    localStorage.clear();
    Cookies.remove("token");
    path.push("/login");
  }

  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      console.log(file);

      const res = await uploadProfilePhoto(file);

      console.log(res.profilePhoto);

      setRegInfo({
        ...regInfo,
        profilePhoto: res.profilePhoto,
      });
    } catch (error) {
      throw error;
    }
  };

  console.log(regInfo);

  return (
    <div className="w-full bg-white shadow-md rounded-full py-2 px-5 mb-5 flex items-center justify-between">
      <Label htmlFor="pic" className="relative cursor-pointer">
        <Avatar>
          <Input
            type="file"
            className="hidden"
            id="pic"
            onChange={uploadPhoto}
          />
          <AvatarImage
            src={
              regInfo.profilePhoto
                ? `http://localhost:3000/${regInfo.profilePhoto.replace(
                    /\\/g,
                    "/"
                  )}`
                : "profile.png"
            }
            alt="profile"
          />
        </Avatar>
        <div className="absolute -right-1 bottom-0 p-1 bg-white rounded-full border-2 border-gray-900 flex items-center justify-center">
          <CameraIcon className="w-2 h-2" />
        </div>
      </Label>

      <div
        onClick={logout}
        className="text-red-600 hover:text-red-600 cursor-pointer"
      >
        <LogOut width={20} height={20} />
      </div>
    </div>
  );
};

export default Nav;
