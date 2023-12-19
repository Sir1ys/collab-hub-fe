import { useState } from "react";

export default function Profile() {
  const [info, setInfo] = useState({});
  const [skills, setSkills] = useState([]);
  const [isEditingSkill, setIsEditingSkill] = useState(false);

  const handleAddSkill = (e: any) => {
    e.preventDefault();
    setIsEditingSkill(false);
  };

  return (
    <div>
      <h1 className="text-8xl mt-0">Profile</h1>
      <section>
        <h2 className="text-6xl">Your skills</h2>
        <ul></ul>
        <button
          type="button"
          onClick={() => {
            setIsEditingSkill(true);
          }}
        >
          Edit
        </button>
        {isEditingSkill ? (
          <form>
            <label htmlFor="addSkill">Add new skill</label>
            <input required placeholder="e.g. C++" type="text" />
            <select name="proficiency">
              <option value="proficiency">Proficiency</option>
              <option value="proficiency">Beginner (0-1 years)</option>
              <option value="proficiency">Intermediate (2-3 years)</option>
              <option value="proficiency">Expert (4-5 years)</option>
              <option value="proficiency">Master (5+ years) </option>
            </select>
            <button type="submit" onSubmit={handleAddSkill}>
              Add
            </button>
          </form>
        ) : (
          <div></div>
        )}
      </section>
      <section>
        <h2 className="text-6xl">Your info</h2>
        <ul></ul>
        <button>Edit</button>
      </section>
    </div>
  );
}
