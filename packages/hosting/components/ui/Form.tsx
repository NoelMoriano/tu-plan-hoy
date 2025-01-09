import React from "react";

interface Props {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  children?: React.ReactNode;
}

export const Form = ({ children, ...props }: Props) => (
  <form noValidate autoComplete="off" {...props}>
    <div className="w-full flex flex-col gap-5">{children}</div>
  </form>
);
