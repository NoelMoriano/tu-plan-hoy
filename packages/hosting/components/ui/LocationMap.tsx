import React from "react";
import Image from "next/image";

interface Props {
  label?: string;
}

export const LocationMap = ({ label }: Props) => {
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
      <div className="w-full h-[316] bg-white border-tertiary border-[1px] rounded-[10px] outline-none m-0 overflow-hidden">
        <Image
          src="/images/map.jpg"
          width={400}
          height={300}
          alt="map - tu plan hoy"
          className="w-full h-full bg-opacity-5 object-cover"
        />
      </div>
    </div>
  );
};
