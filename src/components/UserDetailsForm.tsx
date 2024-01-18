import { Input } from "./Input";

type UserDetailsProps = {
  email: string;
  name: string;
  username: string;
  password: string;
};

type UserDetailsFormProps = UserDetailsProps & {
  updateFields: (fields: Partial<UserDetailsFormProps>) => void;
};

export default function UserDetailsForm({
  email,
  name,
  username,
  password,
  updateFields,
}: UserDetailsFormProps) {
  return (
    <>
      <Input
        type="email"
        id="email"
        label="email"
        styles="mb-6"
        required
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />
      <Input
        type="text"
        id="name"
        label="name"
        styles="mb-6"
        required
        value={name}
        onChange={(e) => updateFields({ name: e.target.value })}
      />
      <Input
        type="text"
        id="username"
        label="username"
        styles="mb-6"
        required
        value={username}
        onChange={(e) => updateFields({ username: e.target.value })}
      />
      <Input
        type="password"
        id="password"
        label="password"
        styles="mb-2"
        required
        value={password}
        onChange={(e) => updateFields({ password: e.target.value })}
      />
    </>
  );
}
