import { ComponentPropsWithoutRef } from "react";

type Props = {
  text: string;
  styles?: string;
  cancel?: boolean;
} & ComponentPropsWithoutRef<"button">;

export default function Button({ text, cancel, styles, ...props }: Props) {
  return (
    <button
      {...props}
      className={
        cancel === false
          ? `bg-sky-300 py-2 rounded-xl text-sky-600 font-medium text-lg border-2 border-sky-500 hover:bg-sky-600 hover:text-sky-200 hover:border-sky-300 active:bg-sky-700 disabled:bg-slate-300 disabled:text-slate-700 disabled:border-slate-700 ${styles}`
          : `bg-red-600 py-2 rounded-xl font-medium text-lg border-2 hover:bg-red-700 active:bg-red-800 text-stone-50 hover:text-stone-50 active:text-stone-50 border-red-700 hover:border-red-300 active:border-red-300 ${styles}`
      }
    >
      {text}
    </button>
  );
}
