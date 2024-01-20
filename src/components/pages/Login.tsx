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
import ErrorIcon from "@mui/icons-material/Error";

export default function Login() {
  const [signIn, setSignIn] = useState(true);
  const [error, setError] = useState("");
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
          setError("Incorrect password. Please try again.");
        }
      })
      .catch((err) => {
        const message: string = err.response.data.msg;
        if (message === "No user found with that Email") {
          setError("Invalid email or password. Please try again.");
        }
      });

    signInForm.current?.clear();
  }

  return (
    <div className=" p-10 flex flex-col justify-center items-center">
      {signIn ? (
        <>
          <Form
            onSave={handleSignIn}
            ref={signInForm}
            styles={"flex flex-col justify-center items-center relative w-6/12"}
          >
            <h3 className="text-sky-800 text-center font-semibold text-xl mb-8">
              Sign In
            </h3>
            <Input
              type="email"
              id="email"
              label="email"
              styles={"mb-8"}
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
            <Input
              type="password"
              id="password"
              label="password"
              styles="mb-2"
              required
              onChange={(e) => {
                if (e.target.value.length < 6) {
                  setError("Password must be at least 6 characters long.");
                } else {
                  setError("");
                }
              }}
            />
            {error ? (
              <p className="text-orange-800 mb-4 w-72" role="alert">
                <ErrorIcon /> {error}
              </p>
            ) : null}
            <Button
              text="Sign In"
              disabled={error !== ""}
              styles="w-72"
              cancel={false}
            />
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
