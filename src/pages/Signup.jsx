import useAuthForm from "../hooks/AuthForm";
import { FormInput } from "../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Signup = () => {
  const { signup, signinWithGithub, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useAuthForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (formData) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
  
      await signup(formData.email, formData.password, {
        fullName: formData.fullName,
        username: formData.username,
      });

      setSuccessMessage("Account created successfully")

      setTimeout(()=>{
        navigate('/signin')
      }, 1500)
    } catch (error) {
      setErrorMessage(error.message)
      
    }
  };
  const githubSignIn = async () => {
    try {
      setErrorMessage("")
      signinWithGithub()
    } catch (error) {
      setErrorMessage(error.message)
      
    }
  };
  return (
    <div className="h-auto w-5xl mx-auto mt-24 border p-4 shadow-2xl">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
        <div>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Full Name"
              placeholder="Full Name"
              register={register}
              s
              name="fullName"
              validation={{ required: true }}
              error={errors.fullName}
              type="text"
            />
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
              label="Username"
              placeholder="Enter your username"
              register={register}
              name="username"
              validation={{
                required: true,
                minLength: {
                  value: 4,
                  message: "Must be atleast 4 characters",
                },
              }}
              error={errors.username}
              type="text"
            />
            <FormInput
              label="Password"
              placeholder="Enter your password"
              register={register}
              name="password"
              validation={{
                required: true,
                minLength: {
                  value: 6,
                  message: "Must be atleast 6 characters",
                },
              }}
              error={errors.password}
              type="password"
            />
            <button
              className="border shadow-2xl p-2 hover:cursor-pointer w-80 "
              type="submit"
            >
              {loading ? "Signing up...." : "Sign up"}
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
            Already have an account?{" "}
            <Link className="text-blue-700" to="/signin">
              {" "}
              Sign in!!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
