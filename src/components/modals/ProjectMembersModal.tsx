import { useEffect, useState } from "react";
import {
  deleteProjectMember,
  getProjectMembers,
} from "../../utils/projects_api";
import { type MemberRequest } from "../../types/types";
import ClearIcon from "@mui/icons-material/Clear";
import Modal from "./Modal";

type Props = {
  project_id: number;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProjectMembersModal({
  active,
  setActive,
  project_id,
}: Props) {
  const [members, setMembers] = useState<MemberRequest[]>([]);

  const handleDelete = (user_id: number) => {
    deleteProjectMember(project_id, user_id).then(() =>
      setMembers((prevMembers: MemberRequest[]) => {
        return [...prevMembers].filter((member) => member.user_id !== user_id);
      })
    );
  };

  useEffect(() => {
    getProjectMembers(project_id).then((response: MemberRequest[]) => {
      setMembers(response);
    });
  }, [project_id]);

  return (
    <Modal active={active} setActive={setActive}>
      <ul className="w-full flex flex-col gap-4 items-start">
        {members.length === 0 ? (
          <li className="self-center text-sky-800 font-semibold text-xl">
            There is no members yet!
          </li>
        ) : (
          members.map((member) => {
            return (
              <li
                key={member.user_id}
                className="w-full px-3 py-2 flex justify-between items-center border border-sky-400 rounded-md"
              >
                <span className="text-sky-800 font-semibold">
                  {member.username}
                </span>
                <ClearIcon
                  onClick={() => handleDelete(member.user_id)}
                  fontSize="large"
                  className="cursor-pointer text-sky-800 hover:text-sky-500"
                />
              </li>
            );
          })
        )}
      </ul>
    </Modal>
  );
}
