import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { volksApi } from "../../api";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { BiErrorCircle } from "react-icons/bi";
import { useState } from "react";
type FormData = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    try {
      const { data } = await volksApi.post("/user/login", { email, password });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      setShowError(true);
      console.log(error);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };
  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <div className="w-[350px] px-10 py-5">
          <h1 className="text-3xl md:text-4xl">Sign In</h1>
          {showError && (
            <div className="flex items-center px-4 py-2 my-2 space-x-4 text-white bg-red-500 rounded-3xl">
              <BiErrorCircle size={18} />
              <p className="text-md">Wrong email or password</p>
            </div>
          )}
          <div className="my-4 space-y-4">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className={!!errors.email ? "input-error" : "input"}
                {...register("email", {
                  required: "Field is required",
                  validate: validations.isEmail,
                })}
              />
              <p className="px-4 text-sm text-red-500">
                {errors.email?.message}
              </p>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className={!!errors.password ? "input-error" : "input"}
                {...register("password", {
                  required: "Field is required",
                  minLength: {
                    value: 6,
                    message: "Should be have at least 6 characters",
                  },
                })}
              />
              <p className="px-4 text-sm text-red-500">
                {errors.password?.message}
              </p>
            </div>
          </div>
          <div>
            <button type="submit" className="button-secondary">
              Login
            </button>
            <Link href={"/auth/register"} className="underline ">
              Don't have an account?
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
