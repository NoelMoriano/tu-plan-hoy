import React from "react";

interface Props {
  label?: string;
  placeholder?: string;
  rows?: number;
}

export const TextArea = ({ label, placeholder, rows = 4 }: Props) => {
  return (
    <div>
      {label && (
        <div>
          <label
            htmlFor="textarea"
            className="text-[15px] font-bold m-0 text-primary"
          >
            {label}
          </label>
        </div>
      )}
      <div className="w-full h-auto bg-white border-tertiary border-[1px] rounded-[5px] outline-none m-0 overflow-hidden">
        <textarea
          rel="textarea"
          rows={rows}
          placeholder={placeholder}
          className="w-full h-full py-2 px-4 text-secondary placeholder-secondary text-[14px] outline-none"
        />
      </div>
    </div>
  );
};
