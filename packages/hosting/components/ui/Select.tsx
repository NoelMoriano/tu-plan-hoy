"use cliente";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { twMerge } from "tailwind-merge";
import { ComponentWrapper } from "@/components/ui/ComponentWrapper";

interface Props {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  multiple?: boolean;
  closeMenuOnSelect?: boolean;
  onChange?: (value: any) => void;
  value?: any;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export const Select = ({
  label,
  options = [],
  multiple,
  closeMenuOnSelect = false,
  onChange,
  value = "",
  error = false,
  required = false,
  disabled = false,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ComponentWrapper
      label={label}
      error={error}
      required={required}
      disabled={disabled}
    >
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
    </ComponentWrapper>
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
