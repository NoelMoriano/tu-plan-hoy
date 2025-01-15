import React from "react";
import { Search } from "lucide-react";

interface Props {
  placeholder?: string;
  className?: string;
}

export const InputSearch = ({ placeholder, className }: Props) => {
  return (
    <div
      className={`w-full h-[44px] grid grid-cols-[1fr,auto] bg-white rounded-[5px] px-2 ${className && className}`}
    >
      <div className="w-full grid place-items-center outline-0">
        <input
          type="text"
          className="w-full h-full p-1 text-secondary placeholder-secondary text-[14px] outline-0"
          placeholder={placeholder}
        />
      </div>
      <div className="grid place-items-center">
        <Search size={17} className="cursor-pointer" />
      </div>
    </div>
  );
};
