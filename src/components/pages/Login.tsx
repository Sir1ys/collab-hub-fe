// import { useEffect, useState } from "react";
// import Loader from "../Loader";
import { useRef } from "react";
import Form, { type FormHandle } from "../Form";
import Button from "../Button";
import { Input } from "../Input";

export default function Login() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(true);
  // }, []);

  // if (isLoading) return <Loader />;

  const signInForm = useRef<FormHandle>(null);

  function handleSignIn(data: unknown) {
    const extractedData = data as { email: string; password: string };

    console.log(extractedData);
    signInForm.current?.clear();
  }

  return (
    <div>
      <Form onSave={handleSignIn} ref={signInForm}>
        <Input type="email" id="email" label="email" required />
        <Input type="password" id="password" label="password" required />
        <Button text="Sign In" />
      </Form>
    </div>
  );
}
