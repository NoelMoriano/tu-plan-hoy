import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children?: React.ReactNode;
  label?: string;
  error: boolean;
  required: boolean;
  disabled: boolean;
}

export const ComponentWrapper = ({
  children,
  label,
  required,
  error,
  disabled,
}: Props) => {
  return (
    <div
      className={twMerge(
        "w-full",
        `${disabled && "pointer-events-none cursor-not-allowed opacity-90"}`,
      )}
    >
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
      <div
        className={twMerge(
          "w-full min-h-[47px] h-auto bg-white border-tertiary border-[1px] rounded-[5px] outline-none m-0",
          `${(error || required) && "border-red-600"}`,
        )}
      >
        {children}
      </div>
    </div>
  );
};
