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
              className="w-full px-2 py-1 bg-gray-200 border-b-2 border-black outline-none"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-2 py-1 bg-gray-200 border-b-2 border-black outline-none"
            />
          </div>
        </div>
        <div>
          <button className="circular-btn w-full bg-[#3A64D8] text-white py-2 font-bold my-2">
            Login
          </button>
          <Link href={"/auth/register"} className="underline ">
            Don't have an account?
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
