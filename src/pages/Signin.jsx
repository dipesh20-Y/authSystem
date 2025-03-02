import useAuthForm from "../hooks/AuthForm";
import { FormInput } from "../components/FormInput";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signin = () => {
  const { register, handleSubmit, errors } = useAuthForm();
  const [errorMessage, setErrorMessage] = useState("");
  const {signin, signInWithGithub, loading} = useContext(AuthContext)

  const onSubmit = async (formData) => {
    try {
      setErrorMessage("")
      await signin(formData.email, formData.password)
    } catch (error) {
      setErrorMessage(error.message)
    }

  };

  const  githubSignIn = async () => {
    try {
      signInWithGithub()
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  return (
    <div className="h-auto   w-5xl mx-auto mt-24 border p-4 shadow-2xl">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Sing In</h1>
        <div>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Email"
              placeholder="Enter your email"
              register={register}
              name="email"
              validation={{ required: true }}
              error={errors.email}
              type="text"
            />
            <FormInput
              label="Password"
              placeholder="Enter your password"
              register={register}
              name="password"
              validation={{ required: true }}
              error={errors.password}
              type="text"
            />
            <button
              className="border shadow-2xl p-2 hover:cursor-pointer w-80  "
              type="submit"
            >
              {loading ? "Signing in...." : "Sign In"}
            </button>
          </form>
          <div className="mt-4">
            <p className="text-md">Or sign up with</p>

            <button
              className="border shadow-2xl p-2 hover:cursor-pointer w-80 "
              type="submit"
              onClick={githubSignIn}
            >
              {loading ? "Signing up...." : "Github"}
            </button>
          </div>
          <p className="text-md my-4 ">
            Don`&apos;`t have an account?{" "}
            <Link className="text-blue-700" to="/signup">
              {" "}
              Sign up!!
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
