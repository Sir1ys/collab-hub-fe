import { useSelector } from "react-redux";
import { useUserDispatch } from "../store/hooks";
import { setUser } from "../store/userSlice";
import { patchUser } from "../utils/users_api";
import Button from "./Button"
import { RootState } from "../store/store";

export default function ProfileEditForm({ setIsEditingProfile, setName, setBio, setAvatar_url, name, bio, avatar_url } : { setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>, setName: React.Dispatch<React.SetStateAction<string>>, setBio: React.Dispatch<React.SetStateAction<string>>, setAvatar_url: React.Dispatch<React.SetStateAction<string>>, name: string, bio: string, avatar_url: string}) {

    const dispatch = useUserDispatch();
    const user = useSelector((state: RootState) => state.user);

    const handleProfileSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
    
        const updatedUser = {
          username: user.username,
          email: user.email,
          password: user.password,
          name: name || user.name,
          bio: bio || user.bio,
          avatar_url: avatar_url || user.avatar_url,
          github_url: user.github_url,
        };
        patchUser(user.user_id, {
          ...updatedUser,
          password: updatedUser.password || "",
        })
          .then((res) => {
            dispatch(setUser(res));
            setIsEditingProfile(false);
          })
          .catch((err) => console.log(err));
      };

    return (
        <>
        <div  className="p-6 flex mb-4 bg-sky-100 md:flex-[1_0_41%] 2xl:flex-[1_0_31%] flex-col gap-4 rounded-xl border-2 border-sky-500 cursor-pointer hover:shadow-xl hover:scale-105 transition m-5">
              <h2 className="text-sky-800 font-semibold text-2xl p-2">
                Fill in one or more fields and click submit.
              </h2>

              <form className="flex flex-col" onSubmit={handleProfileSubmit}>
                <div className="w-full p-2.5 border-2 border-sky-500 rounded-md outline-none bg-white text-sky-700 focus:border-sky-700 mb-5">
                  <label
                    htmlFor="name"
                    className="absolute text-sky-500 uppercase translate-x-4 translate-y-[-1.375rem] bg-sky-50"
                  >
                    Name
                  </label>
                  <input
                    className="mb-4 p-2 rounded-md w-full"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name..."
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full p-2.5 border-2 border-sky-500 rounded-md outline-none bg-white text-sky-700 focus:border-sky-700 mb-5">
                  <label
                    htmlFor="bio"
                    className="absolute text-sky-500 uppercase translate-x-4 translate-y-[-1.375rem] bg-sky-50"
                  >
                    Bio
                  </label>
                  <textarea
                    className="mb-4 p-2 rounded-md w-full resize-none"
                    name="bio"
                    id="bio"
                    placeholder="Enter your bio..."
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <div className="w-full p-2.5 border-2 border-sky-500 rounded-md outline-none bg-white text-sky-700 focus:border-sky-700">
                  <label
                    htmlFor="avatar_url"
                    className="absolute text-sky-500 uppercase translate-x-4 translate-y-[-1.375rem] bg-sky-50"
                  >
                    Avatar URL
                  </label>
                  <input
                    className="mb-4 p-2 rounded-md w-full"
                    type="text"
                    name="avatar_url"
                    id="avatar_url"
                    placeholder="Enter your avatar URL..."
                    onChange={(e) => setAvatar_url(e.target.value)}
                  />
                </div>
                <Button
                  text="Submit"
                  styles="w-40 self-center mt-4"
                  cancel={false}
                  type="submit"
                  onClick={handleProfileSubmit}
                />
              </form>
            </div>

        </>
    )
}