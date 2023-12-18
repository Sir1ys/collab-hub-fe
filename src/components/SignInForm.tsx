import Button from "./Button";
import { Input } from "./Input";

type Props = {};

export const SignInForm = (props: Props) => {
  return (
    <form className="flex flex-col gap-10">
      <Input type="email" id="email" label="email" />
      <Input type="password" id="password" label="password" />
      <Button text="Sign In"/>
    </form>
  );
};
