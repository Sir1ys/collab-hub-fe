import { useUserSelector } from "../../store/hooks";

export default function Profile() {
  const user = useUserSelector((state) => state.user);

  return <div>UserName: {user.username}</div>;
}
