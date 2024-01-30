import { deleteUser } from "../../utils/users_api";
import { removeUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserDispatch } from "../../store/hooks";
import Button from "../Button";
import { RootState } from "../../store/store";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteAccount({ setActive }: Props) {
  const dispatch = useUserDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    deleteUser(user.user_id)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-sky-800 font-semibold text-xl mb-4">
          Are you sure that you want to delete profile?
        </h2>
        <div className="flex flex-wrap flex-col justify-center gap-4">
          <Button
            text="Delete"
            styles="w-full"
            cancel={false}
            onClick={handleDeleteAccount}
          />
          <Button
            text="Cancel"
            styles="w-full"
            type="submit"
            cancel={true}
            onClick={() => setActive(false)}
          />
        </div>
      </div>
    </>
  );
}
