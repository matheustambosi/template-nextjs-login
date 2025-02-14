"use client";

import React, { useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/");
  }

  const email = useRef("");
  const password = useRef("");

  const onSubmit = async () => {
    const res = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
    });

    if (res?.ok) {
      toast("Login sucessful.", {
        type: "success",
        autoClose: 2000,
      });
      router.push("/");
    } else toast(res?.error, { type: "error", autoClose: 2000 });
  };

  return (
    <div className="w-screen h-screen bg-gray-800 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 bg-white rounded-md py-4 px-4 w-[400px]">
        <h1 className="text-center text-2xl font-bold">NextJs - Login</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="email"
            className="bg-gray-100 rounded py-2 px-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (email.current = e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            className="bg-gray-100 rounded py-2 px-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (password.current = e.target.value)
            }
          />
        </div>
        <button
          onClick={onSubmit}
          className="bg-gray-800 rounded mx-auto py-2 px-4 text-white mt-4"
        >
          Login
        </button>
      </div>
    </div>
  );
}
