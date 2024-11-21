import React from "react";

interface Imsg {
  msgContent: string;
  side: "left" | "right";
}

const MessageBox = ({ msgContent, side }: Imsg) => {
  return (
    <div
      className={`p-3 w-fit shadow-sm rounded-full my-2 ${
        side === "left" ? "bg-orange-100" : "bg-green-600 ml-auto"
      }`}
    >
      {msgContent}
    </div>
  );
};

export default MessageBox;
