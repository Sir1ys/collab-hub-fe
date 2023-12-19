import { useState } from "react";

export default function Profile() {
  const [info, setInfo] = useState({});
  const [skills, setSkills] = useState([]);
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddSkill = (e: any) => {
    e.preventDefault();
    setIsEditingSkill(false);
  };

  const handleEditSkills = () => {
    {
      isEditingSkill ? setIsEditingSkill(false) : setIsEditingSkill(true);
    }
  };

  return (
    <div className="p-16">
      <h1 className="text-8xl my-16">Profile</h1>
      <section className="bg-sky-50 border-4 border-sky-700 rounded-xl p-8 mb-8">
        <h2 className="text-6xl">Your info</h2>
        <ul></ul>
        <button className="bg-sky-700 text-white px-2 py-1 my-4 rounded-lg hover:bg-sky-900">
          Edit
        </button>
      </section>
      <section className="bg-sky-50 border-4 border-sky-700 rounded-xl p-8 mb-8">
        <h2 className="text-6xl">Your skills</h2>
        <ul></ul>
        <button
          className="bg-sky-700 text-white px-2 py-1 my-4 rounded-lg hover:bg-sky-900"
          type="button"
          onClick={handleEditSkills}
        >
          Edit
        </button>
        {isEditingSkill ? (
          <form className="flex flex-col">
            <label htmlFor="addSkill">Add new skill</label>
            <input
              className="mb-4 p-2 rounded-md"
              required
              placeholder="e.g. C++"
              type="text"
            />
            <select className="mb-4 p-2 rounded-md" name="proficiency">
              <option value="proficiency">Proficiency</option>
              <option value="proficiency">Beginner (0-1 years)</option>
              <option value="proficiency">Intermediate (2-3 years)</option>
              <option value="proficiency">Expert (4-5 years)</option>
              <option value="proficiency">Master (5+ years) </option>
            </select>
            <button
              className="bg-sky-700 text-white px-2 py-1 my-4 rounded-lg hover:bg-sky-900"
              type="submit"
              onSubmit={handleAddSkill}
            >
              Add
            </button>
          </form>
        ) : (
          <div></div>
        )}
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
