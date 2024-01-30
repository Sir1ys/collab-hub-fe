import { useSelector } from "react-redux";
import { useUserDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";
import { patchUser } from "../../utils/users_api";
import Button from "../Button";
import { RootState } from "../../store/store";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import Form, { FormHandle } from "../Form";
import { useRef } from "react";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileEditForm({ setActive }: Props) {
  const dispatch = useUserDispatch();
  const user = useSelector((state: RootState) => state.user);
  const editProfileFormRef = useRef<FormHandle>(null);

  const handleProfileUpdate = (data: unknown) => {
    const { userName, userBio, userAvatarUrl } = data as {
      userName: string;
      userBio: string;
      userAvatarUrl: string;
    };

    const updatedUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      name: userName !== "" ? userName : user.name,
      bio: userBio !== "" ? userBio : user.bio,
      avatar_url: userAvatarUrl !== "" ? userAvatarUrl : user.avatar_url,
      github_url: user.github_url,
    };

    patchUser(user.user_id, {
      ...updatedUser,
      password: updatedUser.password || "",
    })
      .then((res) => {
        dispatch(setUser(res));
      })
      .catch((err) => console.log(err));

    setActive(false);
    editProfileFormRef.current?.clear();
  };

  return (
    <>
      <div>
        <h2 className="text-sky-800 font-semibold text-2xl mb-8">
          Update Profile Form
        </h2>
        <Form
          className="flex flex-col gap-6"
          onSave={handleProfileUpdate}
          ref={editProfileFormRef}
        >
          <Input id="userName" label="Name" />
          <TextArea id="userBio" label="Bio" placeholder="Enter Bio" />
          <Input id="userAvatarUrl" label="Avatar URL" type="text" />
          <Button text="Update" styles="w-full" cancel={false} type="submit" />
        </Form>
      </div>
    </>
  );
}
