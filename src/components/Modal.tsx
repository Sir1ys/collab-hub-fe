type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function Modal({ active, setActive, children }: Props) {
  return (
    <div
      className={`h-screen w-screen bg-gray-600 fixed top-0 left-0 flex items-center justify-center opacity-0 pointer-events-none duration-200 ${
        !active ? "scale-0" : "scale-100 opacity-90 pointer-events-auto"
      }`}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className={`p-10 rounded-2xl bg-gray-50 transition-all delay-200 h-52 w-96 flex justify-center items-center ${
          !active ? "scale-50" : "scale-100"
        }`}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        {children}
      </div>
    </div>
  );
}
