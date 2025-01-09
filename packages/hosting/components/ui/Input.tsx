import React from "react";

interface Props {
  type?: string;
  label?: string;
  placeholder?: string;
}

export const Input = ({ type = "text", label, placeholder }: Props) => {
  return (
    <div>
      {label && (
        <div>
          <label
            htmlFor="input"
            className="text-[15px] font-bold m-0 text-primary"
          >
            {label}
          </label>
        </div>
      )}
      <div className="w-full h-[47px] bg-white border-tertiary border-[1px] rounded-[5px] outline-none m-0 overflow-hidden">
        <input
          rel="input"
          type={type}
          placeholder={placeholder}
          className="w-full h-full py-1 px-4 text-secondary placeholder-secondary text-[14px] outline-none"
        />
      </div>
    </div>
  );
};
