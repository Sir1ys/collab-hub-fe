type Props = {
  type: string;
  label: string;
  id: string;
};

export const Input = ({ type, label, id }: Props) => {
  return (
    <div className="relative w-72">
      <label
        htmlFor={id}
        className="absolute left-0 px-2.5 text-sky-500 uppercase translate-x-4 translate-y-[-1.375rem] bg-sky-50"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        required
        placeholder={`Enter ${label}`}
        className="w-full p-2.5 border-2 border-sky-500 rounded-md outline-none bg-sky-50 text-sky-700 focus:border-sky-700"
      />
    </div>
  );
};
