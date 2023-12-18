type Props = {
  text: string;
};

export default function Button({ text }: Props) {
  return (
    <button className="bg-sky-300 py-2 rounded-xl text-sky-600 font-medium text-lg border-2 border-sky-500 hover:bg-sky-600 hover:text-sky-200 hover:border-sky-300 active:bg-sky-700">
      {text}
    </button>
  );
}
