import Link from "next/link";
import React from "react";
import { AuthLayout } from "../../components/layouts";

const LoginPage = () => {
  return (
    <AuthLayout title="Login">
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
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input"
            />
          </div>
        </div>
        <div>
          <button className="button-secondary">Login</button>
          <Link href={"/auth/register"} className="underline ">
            Don't have an account?
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
