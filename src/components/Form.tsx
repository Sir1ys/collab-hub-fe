import { Input } from "./Input";

type Props = {};

export const Form = (props: Props) => {
  return (
    <form className="flex flex-col gap-10">
      <Input type="email" id="email" label="email" />
      <Input type="password" id="password" label="password"/>
    </form>
  );
};
