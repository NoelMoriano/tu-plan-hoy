import React from "react";

interface Props {
  className?: string;
}

export const Divider = ({ className }: Props) => {
  return (
    <hr className={`w-full h-[1px] bg-tertiary ${className && className}`} />
  );
};
