import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface Imsg {
  msgContent: string;
  id: string;
}

const MessageBox = ({ msgContent, id }: Imsg) => {
  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  useEffect(() => {
    setUserID(localStorage.getItem("userID"));
  }, []);

  return (
    <div
      className={clsx(
        "p-3 w-fit shadow-sm rounded-full my-2",
        id === userID ? "bg-orange-100" : "bg-green-600 ml-auto"
      )}
    >
      {msgContent}
    </div>
  );
};

export default MessageBox;
