import React from "react";

type Option = {
  label: string | React.ReactNode;
  value: string;
};

interface Props {
  label?: string;
  placeholder?: string;
  options: Option[];
  multiple?: boolean;
}

export const Select = ({ label, options = [], multiple }: Props) => {
  return (
    <div className="w-full">
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
      <div className="w-full h-[47px] p-1 px-2 pr-3 bg-white border-tertiary border-[1px] rounded-[5px] outline-none m-0 overflow-hidden">
        <select
          className="w-full h-full p-1 text-secondary text-[14px] outline-none m-0"
          multiple={multiple}
        >
          {options.map((option, index) => (
            <option key={option?.value || index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
