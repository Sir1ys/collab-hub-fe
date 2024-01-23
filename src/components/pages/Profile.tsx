import { SetStateAction, useEffect, useState } from "react";
import { getAllSkills } from "../../utils/skills_api";
import {
  getSkillsById,
  patchUser,
  deleteUserSkill,
} from "../../utils/users_api";
import { addSkill, deleteUser } from "../../utils/users_api";
import { type Skill } from "../../types/types";
import { useSelector } from "react-redux";
import SkillComponent from "../SkillComponent";
import { setUser } from "../../store/userSlice";
import { useUserDispatch } from "../../store/hooks";
import { removeUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Modal from "../Modal";

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
  const dispatch = useUserDispatch();
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

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

  const handleAddSkill = (e: any) => {
    e.preventDefault();
    const skill_id = parseInt(e.target.skills.value.split(",")[1]);
    addSkill(user.user_id, skill_id)
      .then(() => {
        getSkillsById(user.user_id).then((skills) => {
          setUserSkills(skills);
        });
        setIsEditingSkill(false);
        setAddSkillError("");
      })
      .catch((err) => {
        console.log(err);
        setAddSkillError("You already have this skill!");
      });
  };

  const handleDeleteSkill = (e: any) => {
    e.preventDefault();
    const skill_id = parseInt(e.target.skills.value.split(",")[1]);
    deleteUserSkill(user.user_id, skill_id)
      .then(() => {
        getSkillsById(user.user_id).then((skills) => {
          setUserSkills(skills);
        });
        setIsDeletingSkill(false);
      })
      .catch((err) => {
        console.log(err);
        setDeleteSkillError("Something went wrong, please try again.");
      });
  };

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
    setActive(true);
    {
      isEditingProfile ? setIsEditingProfile(false) : setIsEditingProfile(true);
    }
  };

  const handleProfileSubmit = (e: any) => {
    e.preventDefault();

    const updatedUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      name: name || user.name,
      bio: bio || user.bio,
      avatar_url: avatar_url || user.avatar_url,
      github_url: user.github_url
    };
    patchUser(user.user_id, updatedUser)
      .then((res) => {
        dispatch(setUser(res));
        setIsEditingProfile(false);
        setActive(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteAccount = () => {
    deleteUser(user.user_id)
      .then(() => {
        dispatch(removeUser(user));
        setIsDeleting(false);
        navigate("/s");
      })
      .catch((err) => console.log(err));
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
              }}
              type="submit"
            />
          </div>
        </div>

        {isEditingProfile && (
          <Modal active={active} setActive={setActive}>
            <div className="p-3 bg-sky-100 rounded-xl">
              <p className="text-sky-600 uppercase mb-5 text-1xl">
                Fill in one or more fields and press submit.
              </p>

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
          </Modal>
        )}
      </div>

      <section>
        {isDeletingSkill ? (
          <>
            <form
              className="p-6 flex mb-10 bg-sky-100 md:flex-[1_0_41%] 2xl:flex-[1_0_31%] flex-col gap-4 rounded-xl border-2 border-sky-500 cursor-pointer hover:shadow-xl hover:scale-105 transition m-5"
              onSubmit={handleDeleteSkill}
            >
              <h2 className="text-sky-800 font-semibold text-2xl p-2">
                Delete skill...
              </h2>
              <div className="relative">
                <select
                  className="w-full p-2 rounded-md text-sky-600 uppercase bg-sky-50 text-1xl appearance-none focus:outline-none focus:border-sky-700 focus:ring focus:ring-sky-300"
                  name="skills"
                >
                  <option>Select...</option>
                  {userSkills.map((skill: any) => (
                    <option
                      value={[skill.skill_name, skill.skill_id]}
                      key={skill.skill_name}
                      className="p-2 hover:bg-sky-100 cursor-pointer"
                    >
                      {skill.skill_name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-sky-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <Button
                text="Delete"
                styles="w-40 self-center mt-4"
                type="submit"
              />
            </form>
          </>
        ) : (
          <div></div>
        )}

        {isEditingSkill ? (
          <form
            className="p-6 flex mb-10 bg-sky-100 md:flex-[1_0_41%] 2xl:flex-[1_0_31%] flex-col gap-4 rounded-xl border-2 border-sky-500 cursor-pointer hover:shadow-xl hover:scale-105 transition m-5"
            onSubmit={handleAddSkill}
          >
            <h2 className="text-sky-800 font-semibold text-2xl p-2">
              Add skill...
            </h2>
            <div className="relative">
              <select
                className="w-full p-2 rounded-md text-sky-600 uppercase bg-sky-50 text-1xl appearance-none focus:outline-none focus:border-sky-700 focus:ring focus:ring-sky-300"
                name="skills"
              >
                <option>Select...</option>
                {allSkills.map((skill: any) => {
                  return (
                    <option
                      value={[skill.skill_name, skill.skill_id]}
                      key={skill.skill_name}
                      className="p-2 hover:bg-sky-100 cursor-pointer"
                    >
                      {skill.skill_name}
                    </option>
                  );
                })}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <Button
              text="Add"
              styles="w-40 self-center mt-4"
              cancel={false}
              type="submit"
            />
          </form>
        ) : (
          <div></div>
        )}
        {deleteSkillError ? (
          <p className="text-red-700">{deleteSkillError}</p>
        ) : (
          <div></div>
        )}
        {addSkillError ? (
          <p className="text-red-700">{addSkillError}</p>
        ) : (
          <div></div>
        )}
      </section>

      <section>
        {isDeleting ? (
          <div className="p-6 flex mb-10 mt-0 bg-sky-100 flex-[1_0_30%] md:flex-[1_0_41%] 2xl:flex-[1_0_31%] flex flex-col gap-0.5 rounded-xl border-2 border-sky-500 cursor-pointer hover:shadow-xl hover:scale-105 transition m-5">
            <h2 className="text-sky-800 font-semibold text-2xl">
              Are you sure you want to delete your account?
            </h2>
            <h2 className="text-sky-800 font-semibold text-2xl">
              All connections will be lost.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                text="Submit"
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
        ) : (
          <div></div>
        )}
      </section>
    </>
  );
}
