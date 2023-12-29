import { useEffect, useState } from "react";
import { getAllSkills} from "../../utils/skills_api";
import { getSkillsById, patchUser, deleteUserSkill } from "../../utils/users_api";
import { addSkill } from "../../utils/users_api";
import { type Skill } from "../../types/types";
import { useSelector } from "react-redux";
import SkillComponent from "../SkillComponent";
import { setUser } from "../../store/userSlice";
import { useUserDispatch } from "../../store/hooks";


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
  const [error, setError] = useState("");
  const dispatch = useUserDispatch();
  const { user } = useSelector((state: any) => state);

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
    const skill_id = parseInt(e.target.skills.value.split(',')[1]);
    addSkill(user.user_id, { skill_id: skill_id })
      .then(() => {
        getSkillsById(user.user_id).then((skills) => {
          setUserSkills(skills);
        });
        setIsEditingSkill(false);
        setError("")
      })
      .catch((err) => { 
        console.log(err)
        setError("You already have this skill!")
      });
  };

  const handleDeleteSkill = (e: any) => {
    e.preventDefault();
    const skill_id = parseInt(e.target.skills.value.split(',')[1]);
    deleteUserSkill(user.user_id, skill_id)
      .then(() => {
        getSkillsById(user.user_id).then((skills) => {
          setUserSkills(skills);
        });
        setIsDeletingSkill(false);
      })
      .catch((err) => console.log(err));
  }

  const handleDeleteSkills = () => {
    {
      isDeletingSkill ? setIsDeletingSkill(false) : setIsDeletingSkill(true);
    }
  }

  const handleEditSkills = () => {
    {
      isEditingSkill ? setIsEditingSkill(false) : setIsEditingSkill(true);
    }
  };

  const handleEditProfile = () => {
    {
      isEditingProfile ? setIsEditingProfile(false) : setIsEditingProfile(true);
    }
  }

  const handleProfileSubmit = (e: any) => {
    e.preventDefault();

    const updatedUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      name: name || user.name,
      bio: bio || user.bio,
      avatar_url: avatar_url || user.avatar_url,
    }
    patchUser(user.user_id, { user : updatedUser })
      .then((res) => {
        dispatch(setUser(res));
        setIsEditingProfile(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="p-20">
      <section className="p-3 flex bg-sky-100 flex-[1_0_90%] md:flex-[1_0_47%] 2xl:flex-[1_0_31%] flex flex-col gap-3 rounded-xl border-2 border-sky-500 cursor-pointer hover:shadow-xl hover:scale-105 transition mb-5">
      <img className="w-18 h-18 rounded-lg p-1 bg-sky-600 flex-1 w-32 flex gap-2 items-center justify-start flex-wrap" src={user.avatar_url} alt="Image representing user's avatar" />
        <h2 className="text-6xl text-sky-800 text-center">{user.name}</h2>
        <h2 className="text-2xl text-sky-800 text-center">@{user.username}</h2>
        <h3 className="text-2xl text-sky-400">{user.bio}</h3>
        <button className="bg-sky-700 text-white px-2 py-1 my-4 rounded-lg hover:bg-sky-900" onClick={handleEditProfile}>
          Edit
        </button>
        {isEditingProfile ? (
          <div>
            <p className="text-sky-600 uppercase bg-sky-50 mb-5 text-1xl">Fill in one or more fields and press submit. </p>
          
          <form className="flex flex-col" onSubmit={handleProfileSubmit}>
            <div className="w-full p-2.5 border-2 border-sky-500 rounded-md outline-none bg-white text-sky-700 focus:border-sky-700 mb-5">
              <label htmlFor="name" className="absolute text-sky-500 uppercase translate-x-4 translate-y-[-1.375rem] bg-sky-50">Name</label>
              <input className="mb-4 p-2" type="text" name="name" id="name" placeholder="Enter your name..." onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="w-full p-2.5 border-2 border-sky-500 rounded-md outline-none bg-white text-sky-700 focus:border-sky-700 mb-5">
              <label htmlFor="bio" className="absolute text-sky-500 uppercase translate-x-4 translate-y-[-1.375rem] bg-sky-50">Bio</label>
              <input className="mb-4 p-2 rounded-md" type="text" name="bio" id="bio" placeholder="Enter your bio..." onChange={(e) => setBio(e.target.value)}/>
            </div>
            <div className="w-full p-2.5 border-2 border-sky-500 rounded-md outline-none bg-white text-sky-700 focus:border-sky-700">
              <label htmlFor="avatar_url" className="absolute text-sky-500 uppercase translate-x-4 translate-y-[-1.375rem] bg-sky-50">Avatar URL</label>
              <input className="mb-4 p-2 rounded-md" type="text" name="avatar_url" id="avatar_url" placeholder="Enter your avatar URL..." onChange={(e) => setAvatar_url(e.target.value)}/>
            </div>
            <button className="bg-sky-700 text-white px-2 py-1 my-4 rounded-lg hover:bg-sky-900"
          type="submit">Submit
            </button>
          </form>
          </div>
        ) : (<div></div>)}
      </section>
      <section className="p-3 bg-sky-100 flex-[1_0_90%] md:flex-[1_0_47%] 2xl:flex-[1_0_31%] flex flex-col gap-3 rounded-xl border-2 border-sky-500 cursor-pointer hover:shadow-xl hover:scale-105 transition mb-5">
        <h2 className="text-6xl text-sky-800">My skills</h2>
        <ul className="flex gap-2 items-center justify-start flex-wrap">
        {userSkills.map((skill: Skill, index: number) => {
          return <SkillComponent key={index} skill={skill} />;
        })}
      </ul>
        <button
          className="bg-sky-700 text-white px-2 py-1 rounded-lg hover:bg-sky-900"
          type="button"
          onClick={handleEditSkills}
        >
          Add skill
        </button>
        <button 
        className="bg-sky-700 text-white px-2 py-1 rounded-lg hover:bg-sky-900"
        type="button"
        onClick={handleDeleteSkills}
        >
          Delete skill
        </button>

        {isDeletingSkill ? (
        <div>
          <form className="flex flex-col" onSubmit={handleDeleteSkill}>
          <label htmlFor="addSkill">Select a skill to delete</label>
          <select className="mb-4 p-2 rounded-md" name="skills">
              <option>Select skill</option>
              {userSkills.map((skill: any) => {
                return (
                  <option value={[skill.skill_name, skill.skill_id]} key={skill.skill_name}>
                    {skill.skill_name}
                  </option>
                );
              })}
            </select>
            <button
              className="bg-sky-700 text-white px-2 py-1 my-4 rounded-lg hover:bg-sky-900"
              type="submit"
            >
              Delete
            </button>
            </form>
        </div>) : <div></div>}
        {isEditingSkill ? ( 
          <form className="flex flex-col" onSubmit={handleAddSkill}>
            <label htmlFor="addSkill">Add new skill</label>
            <select className="mb-4 p-2 rounded-md" name="skills">
              <option>Select skill</option>
              {allSkills.map((skill: any) => {
                return (
                  <option value={[skill.skill_name, skill.skill_id]} key={skill.skill_name}>
                    {skill.skill_name}
                  </option>
                );
              })}
            </select>
            <button
              className="bg-sky-700 text-white px-2 py-1 my-4 rounded-lg hover:bg-sky-900"
              type="submit"
            >
              Add
            </button>
          </form>
        ) : (
          <div></div>
        )}
        {error ? <p className="text-red-700">{error}</p> : <div></div>}
      </section>

      <section>
        <button
          className="border-4 border-red-900 bg-red-700 p-2 rounded-lg text-white hover:bg-red-900"
          type="button"
          onClick={() => {
            setIsDeleting(true);
          }}
        >
          Delete Account
        </button>

        {isDeleting ? (
          <div>
            <p>
              Are you sure you want to delete your account? All connections will
              be lost.
            </p>
            <button
              className="border-2 border-red-900 bg-red-700 p-2 rounded-lg text-white mr-4 hover:bg-red-900 hover:border-6"
              onClick={() => {}}
            >
              Delete
            </button>
            <button
              className="border-2 border-green-700 bg-green-500 p-2 rounded-lg text-white hover:bg-green-600"
              onClick={() => {
                setIsDeleting(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
}
