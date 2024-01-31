import { useEffect, useState } from "react";
import { getAllSkills } from "../../utils/skills_api";
import { getSkillsById } from "../../utils/users_api";
import { type Skill } from "../../types/types";
import { useSelector } from "react-redux";
import SkillComponent from "../SkillComponent";
import Button from "../Button";
import ProfileEditForm from "../modals/EditProfileModal";
import AddSkillModal from "../modals/AddSkillModal";
import DeleteAccount from "../modals/DeleteAccountModal";
import { RootState } from "../../store/store";
import Modal from "../modals/Modal";

export default function Profile() {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [deleteProfileModal, setDeleteProfileModal] = useState(false);
  const [addSkillModal, setAddSkillModal] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getSkillsById(user.user_id).then((skills) => {
      setUserSkills(skills);
    });
    getAllSkills()
      .then((skills) => {
        setAllSkills(skills);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <>
      <div className="p-6 flex m-10 bg-sky-100 flex-[1_0_30%] md:flex-[1_0_41%] 2xl:flex-[1_0_31%] flex flex-col gap-0.5 rounded-xl border-2 border-sky-500 cursor-pointer hover:shadow-xl hover:scale-105 transition m-5">
        <div className="flex flex-col items-center gap-4">
          <img
            className="w-36 rounded-full p-1 bg-sky-300"
            src={user.avatar_url}
            alt="Image representing user's avatar"
          />
          <h2 className="text-sky-800 font-semibold text-2xl">{user.name}</h2>
          <h3 className="text-sky-800 font-semibold text-1xl">
            @{user.username}
          </h3>
          <h3 className="text-sky-500 font-medium">{user.bio}</h3>
          <a
            href={user.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 font-medium underline hover:text-sky-700"
          >
            {user.github_url}
          </a>
          <ul className="flex gap-2 items-center justify-center flex-wrap my-2">
            {userSkills.map((skill: Skill, index: number) => {
              return <SkillComponent key={index} skill={skill} />;
            })}
          </ul>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              text="Edit Profile"
              styles="w-40"
              onClick={() => {
                setEditProfileModal(true);
              }}
              cancel={false}
              type="button"
            />
            <Button
              text="Add Skill"
              styles="w-40"
              onClick={() => {
                setAddSkillModal(true);
              }}
              cancel={false}
            />
            <Button
              text="Delete Account"
              styles="w-40"
              onClick={() => {
                setDeleteProfileModal(true);
              }}
            />
          </div>
        </div>
      </div>

      <Modal active={editProfileModal} setActive={setEditProfileModal}>
        <ProfileEditForm setActive={setEditProfileModal} />
      </Modal>
      <Modal active={addSkillModal} setActive={setAddSkillModal}>
        <AddSkillModal setActive={setAddSkillModal} setSkills={setUserSkills} />
      </Modal>
      <Modal active={deleteProfileModal} setActive={setDeleteProfileModal}>
        <DeleteAccount setActive={setDeleteProfileModal} />
      </Modal>
    </>
  );
}
