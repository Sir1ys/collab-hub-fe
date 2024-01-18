import { Input } from "./Input";
import { TextArea } from "./TextArea";

type OtherDetailsProps = {
  bio: string;
  avatar_url: string;
  github_url: string;
};

type OtherDetailsFormProps = OtherDetailsProps & {
  updateFields: (fields: Partial<OtherDetailsProps>) => void;
};

export default function OtherDetailsForm({
  avatar_url,
  bio,
  github_url,
  updateFields,
}: OtherDetailsFormProps) {
  return (
    <>
      <Input
        type="text"
        id="github_url"
        label="GitHub Url"
        styles="mb-6"
        required
        value={github_url}
        onChange={(e) => updateFields({ github_url: e.target.value })}
      />
      <TextArea
        id="bio"
        label="bio"
        placeholder="Tell us about yourself"
        styles="mb-6"
        required
        value={bio}
        onChange={(e) => updateFields({ bio: e.target.value })}
      />
      <Input
        type="text"
        id="avatar_url"
        label="avatar"
        styles="mb-2"
        required
        value={avatar_url}
        onChange={(e) => updateFields({ avatar_url: e.target.value })}
      />
    </>
  );
}
