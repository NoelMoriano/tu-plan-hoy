import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  variant = "primary",
  className,
  onClick,
  children,
  type = "button",
}: Props) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark focus-none",
    secondary: "bg-tertiary text-primary hover:bg-tertiary-dark focus-none",
    tertiary: "bg-secondary text-white hover:bg-secondary-dark focus-none",
  };

  return (
    <button
      type={type}
      className={twMerge(
        "w-auto p-3 rounded-[5px] text-[14px] font-bold cursor-pointer",
        variants[variant],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
