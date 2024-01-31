import { useEffect, useState } from "react";
import { type Skill, type User, type MemberRequest } from "../../types/types";
import { getSkillsById, getUserById } from "../../utils/users_api";
import SkillComponent from "../SkillComponent";
import Modal from "./Modal";
import Button from "../Button";
import { deleteMemberRequest, postMember } from "../../utils/projects_api";
import { addMemberToChat } from "../../utils/chat_api";

type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  user_id: number;
  project_id: number;
  setMemberRequests: React.Dispatch<React.SetStateAction<MemberRequest[]>>;
};

export default function ProfileModal({
  active,
  setActive,
  user_id,
  project_id,
  setMemberRequests,
}: Props) {
  const [userInfo, setUserInfo] = useState<User>();
  const [userSkills, setUserSkills] = useState<Skill[]>([]);

  const handleConfirm = () => {
    if (user_id !== 0) {
      postMember(project_id, user_id)
        .then(() => {
          addMemberToChat(user_id, `${project_id}`);
          setMemberRequests((prevReq) => {
            return [...prevReq].filter((req) => req.user_id !== user_id);
          });
        })
        .catch((err) => console.log(err));
      setActive(false);
    }
  };

  const handleReject = () => {
    if (user_id !== 0) {
      deleteMemberRequest(project_id, user_id)
        .then(() =>
          setMemberRequests((prevReq) => {
            return [...prevReq].filter((req) => req.user_id !== user_id);
          })
        )
        .catch((err) => console.log(err));
    }
    setActive(false);
  };

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
          <Button
            styles={"w-24"}
            text="Confirm"
            cancel={false}
            onClick={handleConfirm}
          />
          <Button styles={"w-24"} text="Reject" onClick={handleReject} />
        </div>
      </div>
    </Modal>
  );
}
