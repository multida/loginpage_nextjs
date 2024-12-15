"use client";

import "@/lib/db";
import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { logIn } from "./actions";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function LogIn() {
  const [state, dispatch] = useFormState(logIn, null);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6 h-[calc(100vh-10px)] overflow-y-auto flex flex-col gap-4 relative">
      <div className="flex flex-col items-center gap-3 mb-6">
        <span className="text-6xl">🐸</span>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">
          Yeahap's Tweet
        </h1>
        <div className="h-1 w-20 bg-gray-300 rounded-full"></div>
      </div>
      <form action={dispatch} className="flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          Icon={EnvelopeIcon}
          required
          errors={state?.fieldErrors?.email}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          Icon={LockClosedIcon}
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors?.password}
        />
        <Button text="Log in" />

        <Link
          href="/create-account"
          className="font-medium flex justify-center text-sm"
        >
          회원가입
        </Link>
      </form>
    </div>
  );
}
