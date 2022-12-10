import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { volksApi } from "../../api";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";

type FormData = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    try {
      const { data } = await volksApi.post("/user/login", { email, password });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <div className="w-[350px] px-10 py-5">
          <h1 className="text-3xl md:text-4xl">Sign In</h1>
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
