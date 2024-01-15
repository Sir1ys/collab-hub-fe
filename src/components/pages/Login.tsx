import { useRef, useState, FormEvent } from "react";
import { useUserDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";
import Form, { type FormHandle } from "../Form";
import Button from "../Button";
import { Input } from "../Input";
import { type User } from "../../types/types";
import { createUser, getUserByEmail } from "../../utils/users_api";
import { useNavigate } from "react-router-dom";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import UserDetailsForm from "../UserDetailsForm";
import OtherDetailsForm from "../OtherDetailsForm";

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

export default function Login() {
  const [data, setData] = useState(initial_data);
  const [signIn, setSignIn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const signInForm = useRef<FormHandle>(null);
  const signUpForm = useRef<FormHandle>(null);

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

  function handleSignIn(data: unknown) {
    const extractedData = data as { email: string; password: string };

    getUserByEmail(extractedData.email)
      .then((user: User) => {
        if (user.password === extractedData.password) {
          dispatch(setUser(user));
          navigate("/");
        } else {
          console.log("The password is incorrect"); // error handler should be created
        }
      })
      .catch((err) => {
        const message: string = err.response.data.msg;
        if (message === "No user found with that Email") {
          console.log(message); //error handler should be created
        }
      });

    signInForm.current?.clear();
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

    signUpForm.current?.clear();
  }

  return (
    <div className="relative p-10">
      {signIn ? (
        <Form
          onSave={handleSignIn}
          ref={signInForm}
          styles={"flex flex-col gap-10"}
        >
          <Input type="email" id="email" label="email" required />
          <Input type="password" id="password" label="password" required />
          <Button text="Sign In" />
        </Form>
      ) : (
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
      )}
      <p
        className="cursor-pointer text-sky-600 hover:text-sky-800 mt-3 font-medium"
        onClick={() => {
          setSignIn(!signIn);
        }}
      >
        {signIn ? (
          <>Don't have an account? Sign up!</>
        ) : (
          <>Already have an account? Sign in!</>
        )}
      </p>
    </div>
  );
}
