import { useRef, useState } from "react";
import { useUserDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";
import Form, { type FormHandle } from "../Form";
import Button from "../Button";
import { Input } from "../Input";
import { type User } from "../../types/types";
import { loginWithEmailAndPassword } from "../../utils/users_api";
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

    loginWithEmailAndPassword(extractedData.email, extractedData.password)
      .then((user: User) => {
        dispatch(setUser(user));
        navigate("/");
      })
      .catch((err: any) => {
        setError(err.response.data.msg);
      });

    signInForm.current?.clear();
  }

  return (
    <div className="p-10 flex flex-col justify-center items-center relative">
      {signIn ? (
        <>
          <Form
            onSave={handleSignIn}
            ref={signInForm}
            styles={"flex flex-col justify-center items-center relative w-full"}
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
