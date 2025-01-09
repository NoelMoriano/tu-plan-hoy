import React from "react";

interface Props {
  label?: string | React.ReactNode;
  htmlFor?: string;
}

export const Checkbox = ({ label, htmlFor = "checkbox" }: Props) => {
  return (
    <div className="w-full h-auto flex gap-2">
      <input
        id={htmlFor}
        type="checkbox"
        className="w-auto h-auto border-primary border-[1px] rounded-[3px] outline-none"
      />
      {label && (
        <label htmlFor={htmlFor} className="text-[13px] m-0 text-primary">
          {label}
        </label>
      )}
    </div>
  );
};
