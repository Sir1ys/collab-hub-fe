import {
  ComponentPropsWithoutRef,
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

export type FormHandle = {
  clear: () => void;
};

type Props = ComponentPropsWithoutRef<"form"> & {
  signUp: boolean;
  onSave: (value: unknown) => void;
};

const Form = forwardRef<FormHandle, Props>(function Form(
  { onSave, children, signUp, ...otherProps },
  ref
) {
  const form = useRef<HTMLFormElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  useImperativeHandle(ref, () => {
    return {
      clear() {
        form.current?.reset();
      },
    };
  });

  return (
    <form
      className={!signUp ? "flex flex-col gap-10 " : "grid grid-cols-1 md:grid-cols-2 gap-10"}
      {...otherProps}
      onSubmit={handleSubmit}
      ref={form}
    >
      {children}
    </form>
  );
});

export default Form;
