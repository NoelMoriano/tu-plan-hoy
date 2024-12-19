import React from "react";
import Image from "next/image";

interface Props {
  src: string;
  className: string;
}

export const ImageComponent = ({ src, className }: Props) => {
  return (
    <Image
      src={src}
      width={320}
      height={320}
      alt="img"
      className={className && className}
    />
  );
};
