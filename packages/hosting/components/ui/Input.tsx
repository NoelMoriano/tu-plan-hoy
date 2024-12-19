import React from "react";

interface Props {
  type?: string;
  placeholder?: string;
}

export const Input = ({ type = "text", placeholder }: Props) => {
  return (
    <div className="w-full h-[47px] p-1 px-2 bg-white rounded-[5px] outline-none">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-full p-1 text-secondary placeholder-secondary text-[14px]"
      />
    </div>
  );
};
