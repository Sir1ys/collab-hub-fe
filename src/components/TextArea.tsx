import { type ComponentPropsWithoutRef, forwardRef } from "react";

type Props = {
  label: string;
  id: string;
  styles?: string;
} & ComponentPropsWithoutRef<"textarea">;

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ id, label, styles, ...props }, ref) => {
    return (
      <p className={`relative w-72 ${styles}`}>
        <label
          htmlFor={id}
          className="absolute left-0 px-2.5 text-sky-500 uppercase translate-x-4 translate-y-[-1.375rem] bg-sky-50"
        >
          {label}
        </label>
        <textarea
          {...props}
          id={id}
          ref={ref}
          className="w-full p-2.5 border-2 border-sky-500 rounded-md outline-none bg-sky-50 text-sky-700 focus:border-sky-700"
          name={id}
        ></textarea>
      </p>
    );
  }
);
