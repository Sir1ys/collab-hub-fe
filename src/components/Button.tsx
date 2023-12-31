import { ComponentPropsWithoutRef } from "react";

type Props = {
  text: string;
  styles?: string;
} & ComponentPropsWithoutRef<"button">;

export default function Button({ text, styles, ...props }: Props) {
  return (
    <button
      {...props}
      className={`bg-sky-300 py-2 rounded-xl text-sky-600 font-medium text-lg border-2 border-sky-500 hover:bg-sky-600 hover:text-sky-200 hover:border-sky-300 active:bg-sky-700 ${styles} disabled:bg-slate-300 disabled:text-slate-700 disabled:border-slate-700`}
    >
      {text}
    </button>
  );
}
