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
  const [error, setError] = useState("")
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
          setError("Incorrect password. Please try again.")
        }
      })
      .catch((err) => {
        const message: string = err.response.data.msg;
        if (message === "No user found with that Email") {
          setError("Invalid email or password. Please try again.")
        }
      });

    signInForm.current?.clear();
  }

  return (
    <div className="relative p-10">
      {signIn ? (
        <>
          <Form
            onSave={handleSignIn}
            ref={signInForm}
            styles={"flex flex-col gap-10"}
          >
            <h3 className="text-sky-800 text-center font-semibold text-xl">
              Sign In
            </h3>
            <Input
              type="email"
              id="email"
              label="email"
              required
              onChange={(e) => {
                if (
                  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value) ===
                  false
                ) {
                  setError("Please enter a valid email.");
                } else {
                  setError("");
                }
              }}
            />
            <Input type="password" id="password" label="password" required 
            onChange={(e) => { 
              if (e.target.value.length < 6) {
                setError("Password must be at least 6 characters long.")
              } else {
                setError("")
              }
          }}
            />
            {error ? (
              <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 w-72"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            ) : null}
            <Button text="Sign In" disabled={error !== ""}/>
          </Form>
        </>
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
