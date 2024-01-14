export type User = {
  email: string;
  user_id: number;
  bio: string;
  name: string;
  username: string;
  avatar_url: string;
  github_url: string;
  password?: string;
};

export type Project = {
  project_id: number;
  project_author: number;
  project_name: string;
  project_description: string;
  project_created_at: number;
  required_members: number;
};

export type Skill = {
  skill_id: number;
  skill_name: string;
  skill_avatar: string;
};

export type Status = "open" | "in progress" | "completed";

export type MemberRequest = {
  user_id: number;
  username: string;
};
