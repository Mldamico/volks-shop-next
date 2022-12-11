import Link from "next/link";
import React from "react";
import { AuthLayout } from "../../components/layouts";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { volksApi } from "../../api";
import { BiErrorCircle } from "react-icons/bi";
import { validations } from "../../utils";
import { AuthContext } from "../../context/auth/AuthContext";
import { useRouter } from "next/router";

type FormData = {
  name: string;
  email: string;
  password: string;
};
const RegisterPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    const destination = router.query.p?.toString() || "/";
    router.replace(destination);
  };
  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <div className="w-[350px] px-10 py-5">
          <h1 className="text-3xl md:text-4xl">Sign Up</h1>
          {showError && (
            <div className="flex items-center px-4 py-2 my-2 space-x-4 text-white bg-red-500 rounded-3xl">
              <BiErrorCircle size={18} />
              <p className="text-md">Email Already In Use</p>
            </div>
          )}
          <div className="my-4 space-y-4">
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className={!!errors.email ? "input-error" : "input"}
                {...register("name", {
                  required: "Field is required",
                  minLength: {
                    value: 2,
                    message: "Should be have at least 2 characters",
                  },
                })}
              />
            </div>
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
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className={!!errors.email ? "input-error" : "input"}
                {...register("password", {
                  required: "Field is required",
                  minLength: {
                    value: 6,
                    message: "Should be have at least 6 characters",
                  },
                })}
              />
            </div>
          </div>
          <div>
            <button className="button-secondary">Register</button>
            <Link
              href={
                router.query.p
                  ? `/auth/login?p=${router.query.p}`
                  : "/auth/login"
              }
              className="underline "
            >
              Have an account?
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
