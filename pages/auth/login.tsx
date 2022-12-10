import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layouts";

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

  const onLoginUser = (data: FormData) => {
    console.log(data);
  };
  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)}>
        <div className="w-[350px] px-10 py-5">
          <h1 className="text-3xl md:text-4xl">Sign In</h1>
          <div className="my-4 space-y-4">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="input"
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="input"
                {...register("password")}
              />
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
