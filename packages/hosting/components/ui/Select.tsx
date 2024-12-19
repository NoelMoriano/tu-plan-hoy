import React from "react";

type Option = {
  label: string;
  value: string;
};

interface Props {
  placeholder?: string;
  options: Option[];
}

export const Select = ({ options = [] }: Props) => {
  return (
    <div className="w-full h-[47px] p-1 px-2 pr-3 bg-white rounded-[5px] outline-none">
      <select className="w-full h-full p-1 text-secondary text-[14px]">
        {options.map((option, index) => (
          <option key={option?.value || index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
