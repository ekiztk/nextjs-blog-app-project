"use client";

import Button from "@/components/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2 shadow-2xl">
      <div className="p-6 mt-6 text-left border w-96 rounded-md shadow-xl">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-[30px]">
            Get inside, we got blogs for you !
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="******************"
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <Button text="Login" type="submit" />
            <h3>or</h3>
            <a
              className="inline-block align-baseline font-bold text-sm text-yellow hover:text-primary"
              href="/register"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
