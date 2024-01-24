import { deleteUser } from "../utils/users_api";
import { removeUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserDispatch } from "../store/hooks";
import Button from "./Button";
import { RootState } from "../store/store";

export default function DeleteAccount({setIsDeleting, setIsEditingSkill} : {setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>, setIsEditingSkill: React.Dispatch<React.SetStateAction<boolean>>}) {
    const dispatch = useUserDispatch();
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleDeleteAccount = () => {
      deleteUser(user.user_id)
        .then(() => {
          dispatch(removeUser());
          setIsDeleting(false);
          navigate("/");
        })
        .catch((err) => console.log(err));
    };

    return (
        <>
        <div className="p-6 flex mb-4 mt-0 bg-sky-100 flex-[1_0_30%] md:flex-[1_0_41%] 2xl:flex-[1_0_31%] flex flex-col gap-0.5 rounded-xl border-2 border-sky-500 cursor-pointer hover:shadow-xl hover:scale-105 transition m-5">
            <h2 className="text-sky-800 font-semibold text-2xl">
              Are you sure you want to delete your account?
            </h2>
            <h2 className="text-sky-800 font-semibold text-2xl">
              All connections will be lost.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                text="Delete"
                styles="w-40 self-center mt-4"
                type="submit"
                onClick={handleDeleteAccount}
              />
              <Button
                text="Cancel"
                styles="w-40 self-center mt-4"
                type="submit"
                cancel={false}
                onClick={() => {
                  setIsDeleting(false);
                  setIsEditingSkill(false);
                }}
              />
            </div>
          </div>
        </>
    )
}