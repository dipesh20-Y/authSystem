import useAuthForm from "../hooks/AuthForm";
import { FormInput } from "../components/FormInput";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, errors } = useAuthForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (formData) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const response = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    console.log("Response: ", response)

    const {data, error} = response

    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log(data)
      setSuccessMessage("You have successfully signed in");
      setTimeout(()=>{
        navigate("/dashboard")
      },2000)

    }
    setLoading(false);
  };
  return (
    <div className="h-auto   w-5xl mx-auto mt-24 border p-4 shadow-2xl">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">Sing In</h1>
        <div>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
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
