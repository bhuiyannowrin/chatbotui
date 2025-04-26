import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("logindata", JSON.stringify(data));
    setUser(data);
    reset()
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg flex flex-col h-auto border">
      <h2 className="w-full text-center p-4 bg-purple-800 text-white h-[50px] rounded-t-lg font-bold">
        Login Page
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="flex flex-col">
          <label className="text-left text-black font-medium mb-2">Email</label>
          <input
            type="email"
            className="p-2 border-2 border-violet-900 rounded-md bg-transparent text-black outline-none"
            {...register("email", 
              { required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com|io|edu|org)$/i,
                  message: "Email is invalid, must be ends with .com or edu or org or io"
                }

              })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-left text-black font-medium mb-2">Password</label>
          <input
            type="password"
            className="p-2 border-2 border-violet-900 rounded-md bg-transparent text-black outline-none"
            {...register("password", 
              { required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="p-2 bg-violet-900 text-amber-50 rounded-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;