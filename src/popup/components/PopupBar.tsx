import React from "react";
import { AiFillGithub } from "react-icons/ai";

export default function PopupBar() {
  return (
    <div className="bg-gray-100 h-8 flex justify-center ">
      <button className="hover:bg-white px-2">
        <AiFillGithub size={24} />
      </button>
    </div>
  );
}
