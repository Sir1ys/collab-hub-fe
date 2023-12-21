import { useRef, useState } from "react";
import { useUserDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";
import Form, { type FormHandle } from "../Form";
import Button from "../Button";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { type User } from "../../types/types";
import { createUser, getUserByEmail } from "../../utils/users_api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   setIsLoading(true);
  // }, []);
  // if (isLoading) return <Loader />;
  const [signIn, setSignIn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useUserDispatch();

  const signInForm = useRef<FormHandle>(null);
  const signUpForm = useRef<FormHandle>(null);

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

  function handleSignUp(data: unknown) {
    const extractedData = data as {
      email: string;
      password: string;
      name: string;
      username: string;
      avatar_url: string;
      bio: string;
    };

    createUser({
      user: extractedData,
    }).then((user: User) => {
      dispatch(setUser(user));
      navigate("/");
    });

    signUpForm.current?.clear();
  }

  return (
    <div>
      {signIn ? (
        <Form onSave={handleSignIn} ref={signInForm} signUp={false}>
          <Input type="email" id="email" label="email" required />
          <Input type="password" id="password" label="password" required />
          <Button text="Sign In" />
        </Form>
      ) : (
        <Form onSave={handleSignUp} ref={signUpForm} signUp={true}>
          <Input type="email" id="email" label="email" required />
          <Input type="text" id="username" label="username" required />
          <Input type="text" id="name" label="name" required />
          <Input type="password" id="password" label="password" required />
          <TextArea
            id="bio"
            label="bio"
            placeholder="Tell us about yourself"
            required
          />
          <Input type="text" id="avatar_url" label="avatar" required />
          <Button text="Sign Up" />
        </Form>
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
