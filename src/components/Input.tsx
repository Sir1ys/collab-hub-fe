import { type ComponentPropsWithoutRef, forwardRef } from "react";

type Props = {
  label: string;
  id: string;
  styles?: string;
} & ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, id, styles, ...props }, ref) => {
    return (
      <p className={`relative w-full ${styles}`}>
        <label
          htmlFor={id}
          className="absolute left-0 px-2.5 text-sky-500 uppercase translate-x-4 translate-y-[-1.375rem] bg-sky-50"
        >
          {label}
        </label>
        <input
          id={id}
          {...props}
          placeholder={`Enter ${label}`}
          ref={ref}
          className="w-full p-2.5 border-2 border-sky-500 rounded-md outline-none bg-sky-50 text-sky-700 focus:border-sky-700"
          name={id}
        />
      </p>
    );
  }
);
