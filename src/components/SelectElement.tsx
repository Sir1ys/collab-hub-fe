import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { type SelectOptions } from "../types/types";

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOptions[];
  onChange: (value: SelectOptions[]) => void;
};

type SelectProps = {
  options: SelectOptions[];
  title: string;
} & (SingleSelectProps | MultipleSelectProps);

export default function SelectElement({
  multiple,
  value,
  onChange,
  options,
  title,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOptions) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((el) => el !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOptions) => {
    return multiple ? value.includes(option) : option === value;
  };

  return (
    <>
      <div
        className="relative border-2 border-sky-500 rounded-md flex items-center gap-2 p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="absolute left-4 top-[-1rem] px-2.5  text-sky-500 uppercase bg-sky-50">
          Choose {`${title}`}
        </span>
        <span className="grow text-left flex flex-row flex-wrap gap-4">
          {multiple
            ? value.map((el) => (
                <button
                  key={el.value}
                  className="text-sky-600 hover:text-red-800 border-2 hover:border-red-300 px-2 py-0.5 rounded-md"
                  onClick={(event) => {
                    event.stopPropagation();
                    selectOption(el);
                  }}
                >
                  {el.label}
                </button>
              ))
            : value?.label}
        </span>
        <ClearIcon
          className="cursor-pointer p-0 m-0 hover:text-sky-500"
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
        />
        <div className="bg-sky-800 self-stretch w-0.5"></div>
        <ExpandMoreIcon className="cursor-pointer hover:text-sky-500" />
        <ul
          className={`${"mt-1 p-0 w-full max-h-28 overflow-y-auto absolute left-0 top-[calc(100%)] bg-sky-100 z-50 border-2 border-sky-500 text-left"} ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {options.map((option) => {
            return (
              <li
                key={option.label}
                className={`${"pl-2 my-2 cursor-pointer text-sky-800 font-medium hover:bg-sky-400 hover:text-white active:bg-sky-800"}${
                  isOptionSelected(option) ? " bg-sky-800 text-white" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(option);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
