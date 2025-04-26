import React, { useState, useDeferredValue } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const useActionState = (action) => {
  const [status, setStatus] = useState("idle");

  const triggerAction = async (data) => {
    setStatus("loading");
    try {
      await action(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return { status, triggerAction };
};

const useFormStatus = () => {
  const [formStatus, setFormStatus] = useState("notSubmitted");

  const updateFormStatus = (status) => {
    setFormStatus(status);
  };

  return { formStatus, updateFormStatus };
};

const useOptimistic = (optimisticValue) => {
  const [optimisticData, setOptimisticData] = useState(optimisticValue);
  
  return {
    optimisticData,
    setOptimisticData: (newData) => setOptimisticData(newData),
    rollback: () => setOptimisticData(optimisticValue),
  };
};

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const { status, triggerAction } = useActionState(async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("logindata", JSON.stringify(data));
        setUser(data);
        resolve();
      }, 2000);
    });
  });

  const { formStatus, updateFormStatus } = useFormStatus();
  const emailValue = watch("email", ""); 
  const deferredEmail = useDeferredValue(emailValue);

  const { optimisticData, setOptimisticData, rollback } = useOptimistic(emailValue, emailValue);

  const onSubmit = async (data) => {
    updateFormStatus("submitted");
    setOptimisticData(data.email);
    await triggerAction(data);
    reset();
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com|io|edu|org)$/i,
                message: "Email is invalid, must end with .com, .edu, .org, or .io"
              }
            })}
            onChange={(e) => setOptimisticData(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-left text-black font-medium mb-2">Password</label>
          <input
            type="password"
            className="p-2 border-2 border-violet-900 rounded-md bg-transparent text-black outline-none"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long"
              }
            })}
          />

            {errors.password && <p className="text-red-500 text-sm"> {errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="p-2 bg-violet-900 text-amber-50 rounded-xl"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="p-6">
        <h3 className="text-lg text-black font-semibold">Status:</h3>
        <p className="text-black">Form Status: {formStatus}</p>
        <p className="text-black">Submission Status: {status}</p>
        <p className="text-black">Optimistic Email: {optimisticData}</p>
        <p className="text-black">Deferred Email: {deferredEmail}</p>

        <button
          className="mt-4 p-2 bg-gray-500 text-white rounded-xl"
          onClick={rollback}
        >
          Rollback Optimistic Update
        </button>

      </div>
    </div>
  );
};

export default Login;
