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
  styles?: string;
  onSave: (value: unknown) => void;
};

const Form = forwardRef<FormHandle, Props>(function Form(
  { onSave, styles, children, ...otherProps },
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
      className={`${styles}`}
      {...otherProps}
      onSubmit={handleSubmit}
      ref={form}
    >
      {children}
    </form>
  );
});

export default Form;
