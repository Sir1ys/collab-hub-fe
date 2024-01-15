import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMultiStepForm from "../hooks/useMultiStepForm";
import UserDetailsForm from "./UserDetailsForm";
import OtherDetailsForm from "./OtherDetailsForm";
import Button from "./Button";
import { useUserDispatch } from "../store/hooks";
import { setUser } from "../store/userSlice";
import { createUser } from "../utils/users_api";
import { type User } from "../types/types";

type UserData = {
  email: string;
  bio: string;
  name: string;
  username: string;
  avatar_url: string;
  github_url: string;
  password: string;
};

const initial_data: UserData = {
  email: "",
  bio: "",
  name: "",
  username: "",
  avatar_url: "",
  github_url: "",
  password: "",
};

export default function SignUpForm() {
  const [data, setData] = useState(initial_data);
  const dispatch = useUserDispatch();
  const navigate = useNavigate();

  const { steps, step, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <UserDetailsForm
        name={data.name}
        username={data.username}
        email={data.email}
        password={data.password}
        updateFields={updateFields}
      />,
      <OtherDetailsForm
        avatar_url={data.avatar_url}
        bio={data.bio}
        github_url={data.github_url}
        updateFields={updateFields}
      />,
    ]);

  function updateFields(fields: Partial<User>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function handleSingUp(event: FormEvent) {
    event.preventDefault();

    if (!isLastStep) return next();

    createUser({
      user: data,
    }).then((user: User) => {
      dispatch(setUser(user));
      navigate("/");
    });
  }

  return (
    <>
      <div className="absolute top-0 right-10 text-sky-800 font-medium">
        {currentStepIndex + 1} / {steps.length}
      </div>
      <form onSubmit={handleSingUp} className="flex flex-col gap-6">
        {step}
        <div className="flex gap-2 justify-end">
          {isFirstStep && (
            <Button
              text="Next"
              styles={"w-24"}
              onSubmit={handleSingUp}
              type="submit"
            />
          )}
          {isLastStep && (
            <>
              <Button
                text="Back"
                styles={"w-24"}
                onClick={back}
                type="button"
              />
              <Button text="Sign Up" styles={"w-24"} type="submit" />
            </>
          )}
        </div>
      </form>
    </>
  );
}
