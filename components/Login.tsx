"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import Image from "next/image";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <main className="h-screen bg-orange-100 p-4 grid place-items-center">
      <div className=" bg-white p-6 lg:p-0 lg:pr-8 rounded-3xl overflow-hidden grid grid-cols-12 lg:gap-20 xl:gap-28 items-center justify-center w-full lg:w-fit mx-auto">
        <aside className="hidden lg:block lg:col-span-5">
          <Image src={"/login.jpg"} width={350} height={350} alt="signup" />
        </aside>
        <aside className="col-span-12 lg:col-span-7 space-y-4 text-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-center space-y-6"
          >
            <h1 className="font-semibold text-4xl uppercase text-green-700">
              Login
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

            <Button
              className="w-full bg-green-700 hover:bg-green-800 uppercase rounded-xl"
              type="submit"
            >
              Login
            </Button>
          </form>
          <div className="p-2 mx-auto rounded-full bg-gray-100 w-fit">
            <FcGoogle size={25} />
          </div>
          <p className="font-semibold text-sm">
            Don&apos;t Have an account ?{" "}
            <Link
              className="text-green-700 hover:text-green-800 uppercase underline"
              href={"/"}
            >
              Login
            </Link>
          </p>
        </aside>
      </div>
    </main>
  );
};

export default Login;
