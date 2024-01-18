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
  const [error, setError] = useState("")
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
  
    switch (inputName) {
      case "email":
        setError(validateEmail(inputValue) ? "" : "Please enter a valid email.");
        break;
      case "password":
        setError(inputValue.length >= 6 ? "" : "Password must be at least 6 characters long.");
        break;
      case "username":
        setError(inputValue.length >= 2 ? "" : "Username must be at least 2 characters long.");
        break;
      case "name":
        setError(inputValue.length >= 2 ? "" : "Name must be at least 2 characters long.");
        break;
      case "github_url":
        setError(validateGitHubLink(inputValue) ? "" : "Please enter a valid GitHub link.");
        break;
      case "bio":
        setError(inputValue.length >= 30 ? "" : "Bio must be at least 30 characters long.");
        break;
      case "avatar_url":
        setError(validateAvatarUrl(inputValue) ? "" : "Please enter a valid Avatar link.");
        break;
      default:
        setError("");
    }
  };
  
  const validateEmail = (email: string): boolean => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const validateAvatarUrl = (url: string): boolean => {
    return /^(https?:\/\/|www\.)[^\s\/$.?#]+(\.[^\s\/$.?#]+)+[a-zA-Z]{1,}[^\s]*$/i.test(url);
  };
  

  function validateGitHubLink(link: string): boolean {
    const githubLinkRegex = /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+(\/)?$/;
    return githubLinkRegex.test(link);
  }

  const areFieldsFilled = () => {
    const values = Object.values(data);
    return values.every(value => value.trim() !== "")
  };

  return (
    <>
      <div className="absolute top-0 right-10 text-sky-800 font-medium">
        {currentStepIndex + 1} / {steps.length}
      </div>
      <form
        onSubmit={handleSingUp}
        className="flex flex-col gap-6"
        onChange={(e: React.ChangeEvent<HTMLFormElement>) => handleInputChange(e as any)}
      >
        <h3 className="text-sky-800 text-center font-semibold text-xl">
          Sign Up
        </h3>
        {step}
        {error ? (
              <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 w-72"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            ) : null}
        <div className="flex gap-2 justify-end">
          {isFirstStep && (
            <Button
              text="Next"
              styles={"w-24"}
              onSubmit={handleSingUp}
              type="submit"
              disabled={error === "Please enter a valid email." || error === "Password must be at least 6 characters long." || error === "Username must be at least 2 characters long." || error === "Name must be at least 2 characters long."}
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
              <Button text="Sign Up" styles={"w-24"} type="submit" disabled={!areFieldsFilled() || error !== ""}/>
            </>
          )}
        </div>
      </form>
    </>
  );
}
