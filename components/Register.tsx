"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/app/actions/auth";
import { IFormReg } from "@/interfaces";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormReg>();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<IFormReg> = async (data) => {
    try {
      setIsLoading(true);

      const res = await signup(data);
      localStorage.setItem("token", res.data);
      console.log(localStorage.getItem("token"));

      router.push("/VerificationCode");
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="h-screen bg-orange-100 p-4 grid place-items-center">
      <div className=" bg-white p-8 lg:pr-0 rounded-3xl overflow-hidden grid grid-cols-12 lg:gap-20 items-center justify-center w-full lg:w-fit mx-auto">
        <aside className="col-span-12 lg:col-span-7 text-center space-y-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-center space-y-6"
          >
            <h1 className="font-semibold text-4xl uppercase text-green-700">
              sign up
            </h1>
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                {...register("fullName", {
                  required: "Name Is Required",
                  minLength: {
                    value: 2,
                    message: "Must be More than 2",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-red-700 mt-2 text-sm text-start">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "Email Is Required",
                  pattern: {
                    value: /^[a-zA-Z\d]+@gmail.com$/g,
                    message: "Not Valid Email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-700 mt-2 text-sm text-start">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: "Password Is Required",
                  minLength: {
                    value: 8,
                    message: "Must be more than 8 charater",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d).+$/g,
                    message: "Not Valid Password",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-700 mt-2 text-sm text-start">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              className="w-full bg-green-700 hover:bg-green-800 uppercase rounded-xl"
              type="submit"
            >
              {isLoading ? "loading..." : "Register"}
            </Button>
          </form>
          <div className="p-2 mx-auto rounded-full bg-gray-100 w-fit">
            <FcGoogle size={25} />
          </div>
          <p className="font-semibold text-sm">
            Have an account ?{" "}
            <Link
              className="text-green-700 hover:text-green-800 uppercase underline"
              href={"/login"}
            >
              Login
            </Link>
          </p>
        </aside>
        <aside className="hidden lg:block lg:col-span-5">
          <Image src={"/signup.jpg"} width={450} height={450} alt="signup" />
        </aside>
      </div>
    </main>
  );
};

export default Register;
