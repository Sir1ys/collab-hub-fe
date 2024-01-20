import { useEffect, useState } from "react";
import { Skill, type User } from "../types/types";
import { getSkillsById, getUserById } from "../utils/users_api";
import SkillComponent from "./SkillComponent";
import Modal from "./Modal";
import Button from "./Button";

type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  user_id: number;
};

export default function ProfileModal({ active, setActive, user_id }: Props) {
  const [userInfo, setUserInfo] = useState<User>();
  const [userSkills, setUserSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (user_id !== 0) {
      getUserById(user_id).then((userData: User) => setUserInfo(userData));
      getSkillsById(user_id).then((skills: Skill[]) => {
        setUserSkills(skills);
      });
    }
  }, [user_id]);

  return (
    <Modal active={active} setActive={setActive}>
      <div className="flex flex-col items-center gap-4">
        <img
          className="w-36 rounded-full p-1 bg-sky-300"
          src={userInfo?.avatar_url}
          alt="Image representing user's avatar"
        />
        <h2 className="text-sky-800 font-semibold text-2xl">
          {userInfo?.name}
        </h2>
        <h3 className="text-sky-500 font-medium">{userInfo?.bio}</h3>
        <span className="text-sky-500 font-medium">{userInfo?.github_url}</span>
        <ul className="flex gap-2 items-center justify-center flex-wrap my-2">
          {userSkills.map((skill: Skill, index: number) => {
            return <SkillComponent key={index} skill={skill} />;
          })}
        </ul>
        <div className="flex gap-4">
          <Button styles={"w-24"} text="Confirm" cancel={false} />
          <Button styles={"w-24"} text="Reject" />
        </div>
      </div>
    </Modal>
  );
}
