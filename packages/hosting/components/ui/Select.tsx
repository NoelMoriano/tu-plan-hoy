"use cliente";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { twMerge } from "tailwind-merge";

interface Props {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  multiple?: boolean;
  closeMenuOnSelect?: boolean;
  onChange?: (value: any) => void;
  value?: any;
}

export const Select = ({
  label,
  options = [],
  multiple,
  closeMenuOnSelect = false,
  onChange,
  value = "",
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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
      <div className="w-full min-h-[47px] h-auto bg-white border-tertiary border-[1px] rounded-[5px] outline-none m-0">
        <ReactSelect
          className="w-full h-full p-1 text-secondary text-[14px]"
          classNames={{
            container: () => twMerge("border-none outline-none"),
            control: ({ isFocused }) =>
              twMerge(
                "border-none outline-none focus:border-none",
                isFocused && "border-none",
              ),
            multiValue: () =>
              twMerge("bg-secondary border-none outline-none rounded px-2"),
            multiValueLabel: () => twMerge("text-black"),
            multiValueRemove: () =>
              twMerge(
                "text-white cursor-pointer px-1 rounded bg-secondary hover:bg-secondary",
              ),
          }}
          isMulti={multiple}
          closeMenuOnSelect={closeMenuOnSelect}
          defaultValue={value}
          onChange={onChange}
          options={options}
          styles={customStyles}
        />
      </div>
    </div>
  );
};

const customStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "white",
    border: "none",
    outline: "none",
    focus: "none",
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "bg-secondary",
    color: "white",
    borderRadius: "0.25rem",
    padding: "2px 6px",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "white",
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "bg-secondary",
      color: "white",
    },
  }),
};
