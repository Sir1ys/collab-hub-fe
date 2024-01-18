import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { dateFromTimestamp } from "../../utils/dates";
import {
  type MemberRequest,
  type Project,
  type Skill,
  type Status,
} from "../../types/types";
import {
  getProjectSkills,
  getProjectStatus,
  postMemberRequest,
  deleteMemberRequest,
  getMemberRequestsByProjectId,
} from "../../utils/projects_api";
import { useUserSelector } from "../../store/hooks";
import SkillComponent from "../SkillComponent";
import Button from "../Button";
import Modal from "../Modal";
import EditProjectModal from "../EditProjectModal";

type LocationState = {
  state: Project;
};

export default function ProjectPage() {
  const location = useLocation();
  const { state: project } = location as LocationState;
  const [skills, setSkills] = useState<Skill[]>([]);
  const [status, setStatus] = useState<Status>("open");
  const [memberRequests, setMemberRequests] = useState<MemberRequest[]>([]);
  const [active, setActive] = useState<boolean>(false);
  const [activeEditModal, setActiveEditModal] = useState<boolean>(false);
  const [textModal, setTextModal] = useState<string>("");
  const user = useUserSelector((state) => state.user);

  useEffect(() => {
    getProjectSkills(project.project_id).then((skills: Skill[]) => {
      setSkills(skills);
    });
    getProjectStatus(project.project_id).then((status: Status) => {
      setStatus(status);
    });
    getMemberRequestsByProjectId(project.project_id).then((response) => {
      setMemberRequests(response);
    });
  }, []);

  const handleApply = () => {
    postMemberRequest(project.project_id, user.user_id)
      .then((response) =>
        setMemberRequests((prevState) => {
          return [...prevState, response];
        })
      )
      .catch((err) => {
        setTextModal(err.response.data.msg);
        setActive(true);
      });
  };

  const handleCancelRequest = () => {
    deleteMemberRequest(project.project_id, user.user_id)
      .then(() => {
        setMemberRequests((prevState) => {
          return prevState.filter((member) => member.user_id !== user.user_id);
        });
      })
      .catch((err) => {
        setTextModal(err.response.data.msg);
        setActive(true);
      });
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <article className="max-w-5xl m-5 px-12 py-12 border-2 border-sky-700 shadow-xl flex flex-col gap-3 rounded-lg">
        <h2 className="text-sky-800 text-2xl font-semibold text-center relative">
          {project.project_name}
          <p className="px-3 py-1 absolute top-0 right-0 bg-sky-800 text-sky-50 text-sm rounded-2xl">
            {status}
          </p>
        </h2>
        <p className="text-right text-sky-600">
          {`${dateFromTimestamp(project.project_created_at.toString())}`}
        </p>
        <h3 className="text-sky-600 text-lg font-medium">
          Description:
          <p className="text-sky-400">{project.project_description}</p>
        </h3>
        <h3 className="text-sky-600 text-lg font-medium">Skills required: </h3>
        <ul className="flex gap-2 items-center justify-start flex-wrap">
          {skills.map((skill: Skill, index: number) => {
            return <SkillComponent key={index} skill={skill} />;
          })}
        </ul>
        <p className="text-sky-600 text-lg font-medium">
          People required: {project.required_members}
        </p>
        {project.project_author !== user.user_id ? (
          <Button
            cancel={false}
            text={
              memberRequests.find((member) => member.user_id === user.user_id)
                ? "Unsubscribe"
                : "Apply"
            }
            styles="w-28"
            onClick={
              memberRequests.find((member) => member.user_id === user.user_id)
                ? handleCancelRequest
                : handleApply
            }
            disabled={user.user_id !== 0 ? false : true}
          />
        ) : (
          <Button
            cancel={false}
            text="Edit"
            styles="w-28"
            onClick={() => setActiveEditModal(true)}
          />
        )}
        <Modal active={active} setActive={setActive}>
          {textModal}
        </Modal>
        <EditProjectModal
          active={activeEditModal}
          setActive={setActiveEditModal}
        />
      </article>
    </section>
  );
}
