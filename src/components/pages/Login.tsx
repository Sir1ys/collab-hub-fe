// import { useEffect, useState } from "react";
// import Loader from "../Loader";
import { SignInForm } from "../SignInForm";

export default function Login() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(true);
  // }, []);

  // if (isLoading) return <Loader />;

  return (
    <div>
      <SignInForm />
    </div>
  );
}
