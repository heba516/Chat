"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "./ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IFormLog } from "@/interfaces";
import { signin } from "@/app/actions/auth";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormLog>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const { setRegInfo } = useAuth();

  const onSubmit: SubmitHandler<IFormLog> = async (data) => {
    setIsLoading(true);
    try {
      setErrorMessage(null);
      const res = await signin(data);

      localStorage.setItem("regID", res.data.user._id);

      console.log(res.data.user);

      setRegInfo(res.data.user);
      router.push("/");
    } catch (error) {
      setErrorMessage("Invalid email or password, please try again.");
      console.error("Error during signin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen bg-orange-100 p-4 grid place-items-center">
      <div className=" bg-white p-6 lg:p-0 lg:pr-8 rounded-3xl overflow-hidden grid grid-cols-12 lg:gap-20 xl:gap-28 items-center justify-center w-full lg:w-fit mx-auto">
        <aside className="hidden lg:block lg:col-span-5">
          <Image
            src={"/login.jpg"}
            width={350}
            height={350}
            alt="signup"
            priority
          />
        </aside>

        <aside className="col-span-12 lg:col-span-7 space-y-4 text-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-center space-y-6"
          >
            <h1 className="font-semibold text-4xl uppercase text-green-700">
              Sign in
            </h1>

            <div>
              <Input
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
                })}
              />
              {errors.password && (
                <p className="text-red-700 mt-2 text-sm text-start">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}

            <Button
              disabled={isLoading}
              className="w-full bg-green-700 hover:bg-green-800 uppercase rounded-xl"
              type="submit"
            >
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="font-semibold text-sm">
            Don&apos;t Have an account ?{" "}
            <Link
              className="text-green-700 hover:text-green-800 uppercase underline"
              href={"/register"}
            >
              Sign Up
            </Link>
          </p>
        </aside>
      </div>
    </main>
  );
};

export default Login;
