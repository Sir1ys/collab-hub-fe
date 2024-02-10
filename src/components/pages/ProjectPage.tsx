import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  deleteProject,
  getProjectMembers,
} from "../../utils/projects_api";
import { useUserSelector } from "../../store/hooks";
import SkillComponent from "../SkillComponent";
import Button from "../Button";
import Modal from "../modals/Modal";
import EditProjectModal from "../modals/EditProjectModal";
import ProfileModal from "../modals/ProfileModal";
import { socket } from "../../App";
import UpdateSkillModal from "../modals/UpdateSkillModal";
import { getAllSkills } from "../../utils/skills_api";
import ProjectMembersModal from "../modals/ProjectMembersModal";

type LocationState = {
  state: {
    project: Project;
    involved?: true | undefined;
  };
};

export default function ProjectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    state: { project, involved },
  } = location as LocationState;

  const [projectMembers, setProjectMembers] = useState<MemberRequest[]>([]);
  const [projectState, setProjectState] = useState(project);
  const {
    project_author,
    project_created_at,
    project_description,
    project_id,
    project_name,
    required_members,
  } = projectState;
  const [isInvolvedPage, setIsInvolvedPage] = useState(involved);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [projectSkills, setProjectSkills] = useState<Skill[]>([]);
  const [status, setStatus] = useState<Status>("open");
  const [memberRequests, setMemberRequests] = useState<MemberRequest[]>([]);
  const [currentMemberRequest, setCurrentMemberRequest] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [activeEditModal, setActiveEditModal] = useState<boolean>(false);
  const [activeProfileModal, setActiveProfileModal] = useState<boolean>(false);
  const [activeViewMembersModal, setActiveViewMembersModal] =
    useState<boolean>(false);
  const [activeUpdateSkillModal, setActiveUpdateSkillModal] =
    useState<boolean>(false);
  const [textModal, setTextModal] = useState<string>("");

  const user = useUserSelector((state) => state.user);
  const { user_id } = user;

  useEffect(() => {
    getProjectSkills(project_id).then((skills: Skill[]) => {
      setProjectSkills(skills);
    });
    getProjectStatus(project_id).then((status: Status) => {
      setStatus(status);
    });
    getMemberRequestsByProjectId(project_id).then((response) => {
      setMemberRequests(response);
    });
    getAllSkills().then((skills) => {
      setAllSkills(skills);
    });
    getProjectMembers(project_id).then((response: MemberRequest[]) =>
      setProjectMembers(response)
    );
  }, []);

  const handleApply = () => {
    postMemberRequest(project_id, user_id)
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
    deleteMemberRequest(project_id, user_id)
      .then(() => {
        setMemberRequests((prevState) => {
          return prevState.filter((member) => member.user_id !== user_id);
        });
      })
      .catch((err) => {
        setTextModal(err.response.data.msg);
        setActive(true);
      });
  };

  const handleViewRequest = (user_id: number) => {
    setCurrentMemberRequest(user_id);
    setActiveProfileModal(true);
  };

  const handleDeleteProject = () => {
    deleteProject(project_id).then(() => {
      navigate("/");
    });
  };

  const handleOpenChat = () => {
    const room = project_id;
    if (user_id !== 0) {
      socket.emit("join_room", room);
      navigate("/chat", { state: { room: room, project: project } });
    }
  };

  return (
    <section className="w-11/12 md:w-full flex flex-col justify-center items-center">
      <article className="w-full max-w-5xl m-5 px-12 py-12 border-2 border-sky-700 shadow-xl flex flex-col gap-6 rounded-lg">
        <h2 className="text-sky-800 text-2xl font-semibold text-center relative">
          {project_name}
          <p className="px-3 py-1 md:absolute md:top-0 md:right-0 md:bg-sky-800 md:text-sky-50 text-lg text-right md:text-sm rounded-2xl">
            {status}
          </p>
        </h2>
        <p className="text-right text-sky-600">
          {`${dateFromTimestamp(project_created_at.toString())}`}
        </p>
        <h3 className="text-sky-600 text-lg font-medium text-left">
          Description:
          <p className="text-sky-400">{project_description}</p>
        </h3>
        <h3 className="text-sky-600 text-lg font-medium text-left">
          Skills required:{" "}
          <ul className="flex gap-2 items-center justify-start flex-wrap">
            {projectSkills.map((skill: Skill, index: number) => {
              return <SkillComponent key={index} skill={skill} />;
            })}
          </ul>
        </h3>

        <p className="text-sky-600 text-lg font-medium text-left">
          People required: {required_members}
        </p>
        {project_author !== user_id ? (
          <>
            {isInvolvedPage ||
            projectMembers.find((member) => member.user_id === user_id) ? (
              <Button
                cancel={false}
                text={"Open Chat"}
                styles="w-28"
                onClick={handleOpenChat}
                disabled={user_id !== 0 ? false : true}
              />
            ) : (
              <Button
                cancel={false}
                text={
                  memberRequests.find((member) => member.user_id === user_id)
                    ? "Unsubscribe"
                    : "Apply"
                }
                styles="w-28"
                onClick={
                  memberRequests.find((member) => member.user_id === user_id)
                    ? handleCancelRequest
                    : handleApply
                }
                disabled={user_id !== 0 ? false : true}
              />
            )}
          </>
        ) : (
          <>
            <div>
              <h3 className="text-sky-600 text-lg font-medium text-left">
                Member requests:
              </h3>

              <div className="text-left m-2 mr-0 flex gap-3">
                {memberRequests.length === 0 ? (
                  <span className="text-sky-400 text-lg font-medium">
                    There is no requests yet!
                  </span>
                ) : (
                  memberRequests.map((request, index) => (
                    <span
                      key={index}
                      className="p-3 rounded-xl cursor-pointer text-sky-800 font-medium shadow-sm shadow-sky-600 hover:shadow-md hover:shadow-sky-800"
                      onClick={() => handleViewRequest(request.user_id)}
                    >
                      {request.username}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="md:self-start flex flex-col md:flex-row justify-center items-center gap-4">
              <Button
                cancel={false}
                text="Chat"
                styles="w-full md:w-28"
                onClick={() => handleOpenChat()}
              />
              <Button
                cancel={false}
                text="Edit Project"
                styles="w-full md:w-28"
                onClick={() => setActiveEditModal(true)}
              />
              <Button
                cancel={false}
                text="Edit Skills"
                styles="w-full md:w-28"
                onClick={() => setActiveUpdateSkillModal(true)}
              />
              <Button
                cancel={false}
                text="Update Members"
                styles="w-full md:w-auto p-2"
                onClick={() => setActiveViewMembersModal(true)}
              />
              <Button
                cancel={true}
                text="Delete"
                styles="w-full md:w-28"
                onClick={() => handleDeleteProject()}
              />
            </div>
          </>
        )}
        <Modal active={active} setActive={setActive}>
          {textModal}
        </Modal>
        <EditProjectModal
          active={activeEditModal}
          setActive={setActiveEditModal}
          project={project}
          setProjectState={setProjectState}
        />
        <ProfileModal
          project_id={project_id}
          user_id={currentMemberRequest}
          active={activeProfileModal}
          setActive={setActiveProfileModal}
          setMemberRequests={setMemberRequests}
        />
        <ProjectMembersModal
          active={activeViewMembersModal}
          setActive={setActiveViewMembersModal}
          project_id={project_id}
        />
        <Modal
          active={activeUpdateSkillModal}
          setActive={setActiveUpdateSkillModal}
        >
          <UpdateSkillModal
            setActive={setActiveUpdateSkillModal}
            allSkills={allSkills}
            setAllSkills={setAllSkills}
            currentSkills={projectSkills}
            setCurrentSkills={setProjectSkills}
            projectId={project_id}
            type="project"
          />
        </Modal>
      </article>
    </section>
  );
}
