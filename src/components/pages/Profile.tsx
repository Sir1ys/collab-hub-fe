import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAllSkills } from "../../utils/skills_api";
import {
  getSkillsById
} from "../../utils/users_api";
import { type Skill } from "../../types/types";
import { useSelector } from "react-redux";
import SkillComponent from "../SkillComponent";
import Button from "../Button";
import ProfileEditForm from "../ProfileEditForm";
import AddSkill from "../AddSkill";
import DeleteAccount from "../DeleteAccount";
import DeleteSkills from "../DeleteSkills";
import ErrorIcon from "@mui/icons-material/Error";
import { RootState } from "../../store/store"

export default function Profile() {
  const [allSkills, setAllSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [isDeletingSkill, setIsDeletingSkill] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [deleteSkillError, setDeleteSkillError] = useState("");
  const [addSkillError, setAddSkillError] = useState("");
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

  const handleDeleteSkills = () => {
    setIsEditingSkill(false);
    {
      setAddSkillError("");
    }
    setIsDeletingSkill((prevIsDeletingSkill) => !prevIsDeletingSkill);
  };

  const handleEditSkills = () => {
    setIsDeletingSkill(false);
    setDeleteSkillError("");
    setIsEditingSkill((prevIsEditingSkill) => !prevIsEditingSkill);
  };

  const handleEditProfile = () => {
    {
      isEditingProfile ? setIsEditingProfile(false) : setIsEditingProfile(true);
    }
  };

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
              styles="w-40 self-center"
              onClick={() => {
                handleEditProfile();
                setIsDeleting(false);
                setIsDeletingSkill(false);
                setIsEditingSkill(false);
              }}
              cancel={false}
              type="submit"
            />
            <Button
              text="Add Skill"
              styles="w-40 self-center"
              onClick={() => {
                handleEditSkills();
                setIsDeleting(false);
                setIsEditingProfile(false);
              }}
              cancel={false}
              type="submit"
            />
            <Button
              text="Delete Skill"
              styles="w-40 self-center"
              onClick={() => {
                handleDeleteSkills();
                setIsDeleting(false);
                setIsEditingProfile(false);
              }}
              cancel={false}
              type="submit"
            />
            <Button
              text="Delete Account"
              styles="w-40 self-center"
              onClick={() => {
                setIsDeleting(true);
                setIsDeletingSkill(false);
                setIsEditingSkill(false);
                setIsEditingProfile(false);
              }}
              type="submit"
            />
          </div>
        </div>
      </div>

      <section>
        {isEditingProfile && (
          <ProfileEditForm
            setIsEditingProfile={setIsEditingProfile}
            setName={setName}
            setBio={setBio}
            setAvatar_url={setAvatar_url}
            name={name}
            bio={bio}
            avatar_url={avatar_url}
          />
        )}

        {isDeletingSkill && (
          <DeleteSkills
            userSkills={userSkills}
            setUserSkills={setUserSkills as Dispatch<SetStateAction<Skill[]>>}
            setIsDeletingSkill={setIsDeletingSkill}
            setDeleteSkillError={setDeleteSkillError}
          />
        )}

        {isEditingSkill && (
          <AddSkill
            allSkills={allSkills}
            setUserSkills={setUserSkills as Dispatch<SetStateAction<Skill[]>>}
            setIsEditingSkill={setIsEditingSkill}
            setAddSkillError={setAddSkillError}
          />
        )}
        {deleteSkillError && <p className="text-red-700 mb-3"><ErrorIcon /> {deleteSkillError}</p>}
        {addSkillError && <p className="text-red-700 mb-3"><ErrorIcon />{addSkillError}</p>}
      </section>

      <section>
        {isDeleting && (
          <DeleteAccount
            setIsDeleting={setIsDeleting}
            setIsEditingSkill={setIsEditingSkill}
          />
        )}
      </section>
    </>
  );
}
