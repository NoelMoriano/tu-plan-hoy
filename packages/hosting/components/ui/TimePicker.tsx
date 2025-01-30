import React from "react";

interface Props {
  label?: string;
  placeholder?: string;
}

export const TimePicker = ({ label, placeholder }: Props) => {
  return (
    <div>
      {label && (
        <div>
          <label
            htmlFor="time-picker"
            className="text-[15px] font-bold m-0 text-primary"
          >
            {label}
          </label>
        </div>
      )}
      <div className="w-full h-[47px] bg-white border-tertiary border-[1px] rounded-[5px] outline-none m-0 overflow-hidden">
        <input
          rel="time-picker"
          type="time"
          placeholder={placeholder}
          className="w-full h-full py-1 px-4 text-secondary placeholder-secondary text-[14px] outline-none"
        />
      </div>
    </div>
  );
};
