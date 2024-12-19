import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const WrapperComponent = ({ className, children }: Props) => {
  return (
    <div className={`w-full m-auto max-w-[1243px] ${className && className}`}>
      {children}
    </div>
  );
};
