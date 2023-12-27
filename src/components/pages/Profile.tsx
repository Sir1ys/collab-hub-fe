import { useEffect, useState } from "react";
import { getAllSkills} from "../../utils/skills_api";
import { getSkillsById, patchUser } from "../../utils/users_api";
import { addSkill } from "../../utils/users_api";
import { type User, Skill } from "../../types/types";
import { useSelector } from "react-redux";
import SkillComponent from "../SkillComponent";
import { setUser } from "../../store/userSlice";
import { useUserDispatch } from "../../store/hooks";


export default function Profile() {
  const [info, setInfo] = useState({});
  const [allSkills, setAllSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [isEditingSkill, setIsEditingSkill] = useState(false);
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
        setError("You already have this skill!")
      });
  };

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
    <div className="p-16">
      <section className="bg-sky-50 border-4 border-sky-700 rounded-xl p-8 mb-8">
      <img className="w-14 h-14 rounded-lg p-1 bg-sky-600" src={user.avatar_url} alt="Image representing user's avatar" />
        <h2 className="text-6xl">{user.name}</h2>
        <h2 className="text-2xl">@{user.username}</h2>
        <h3 className="text-2xl">{user.bio}</h3>
        <button className="bg-sky-700 text-white px-2 py-1 my-4 rounded-lg hover:bg-sky-900" onClick={handleEditProfile}>
          Edit
        </button>
        {isEditingProfile ? (
          <form className="flex flex-col" onSubmit={handleProfileSubmit}>
            <label htmlFor="name">Name</label>
            <input className="mb-4 p-2 rounded-md" type="text" name="name" id="name" placeholder="Enter your name..." onChange={(e) => setName(e.target.value)} />
            <label htmlFor="bio">Bio</label>
            <input className="mb-4 p-2 rounded-md" type="text" name="bio" id="bio" placeholder="Enter your bio..." onChange={(e) => setBio(e.target.value)}/>
            <label htmlFor="avatar_url">Avatar URL</label>
            <input className="mb-4 p-2 rounded-md" type="text" name="avatar_url" id="avatar_url" placeholder="Enter your avatar URL..." onChange={(e) => setAvatar_url(e.target.value)}/>
            <button className="bg-sky-700 text-white px-2 py-1 my-4 rounded-lg hover:bg-sky-900"
          type="submit">Submit
            </button>
          </form>
        ) : (<div></div>)}
      </section>
      <section className="bg-sky-50 border-4 border-sky-700 rounded-xl p-8 mb-8">
        <h2 className="text-6xl">My skills</h2>
        <ul className="flex gap-2 items-center justify-start flex-wrap">
        {userSkills.map((skill: Skill, index: number) => {
          return <SkillComponent key={index} skill={skill} />;
        })}
      </ul>
        <button
          className="bg-sky-700 text-white px-2 py-1 my-4 rounded-lg hover:bg-sky-900"
          type="button"
          onClick={handleEditSkills}
        >
          Edit
        </button>
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
