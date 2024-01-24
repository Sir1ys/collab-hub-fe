import { useSelector } from "react-redux";
import { addSkill, getSkillsById } from "../utils/users_api";
import Button from "./Button";
import { Skill } from "../types/types"
import { RootState } from "../store/store";

export default function AddSkill({allSkills, setUserSkills, setIsEditingSkill, setAddSkillError} : {allSkills: Skill[], setUserSkills: React.Dispatch<React.SetStateAction<Skill[]>>, setIsEditingSkill: React.Dispatch<React.SetStateAction<boolean>>, setAddSkillError: React.Dispatch<React.SetStateAction<string>>}) {
    const user = useSelector((state: RootState) => state.user);

    const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const skill_id = parseInt((e.target as HTMLFormElement).skills.value.split(",")[1]);
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

    return (
        <>
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
                {allSkills.map((skill: Skill) => {
                  return (
                    <option
                    value={[skill.skill_name, skill.skill_id.toString()]}
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
        </>
    );
}