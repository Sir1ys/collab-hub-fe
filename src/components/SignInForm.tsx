import { useRef } from "react";
import Button from "./Button";
import { Input } from "./Input";

type Props = {};

export const SignInForm = (props: Props) => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  return (
    <form className="flex flex-col gap-10">
      <Input type="email" id="email" label="email" required ref={emailInput} />
      <Input
        type="password"
        id="password"
        label="password"
        required
        ref={passwordInput}
      />
      <Button text="Sign In" />
    </form>
  );
};
