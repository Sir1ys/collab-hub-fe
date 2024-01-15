import { useRef, useState } from "react";
import { useUserDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";
import Form, { type FormHandle } from "../Form";
import Button from "../Button";
import { Input } from "../Input";
import { type User } from "../../types/types";
import { getUserByEmail } from "../../utils/users_api";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../SignUpForm";

export default function Login() {
  const [signIn, setSignIn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const signInForm = useRef<FormHandle>(null);

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
          <SignUpForm />
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
