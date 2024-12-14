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
    <div className="flex flex-col gap-10 max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg h-[calc(100vh-100px)] overflow-y-auto mt-4">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-5xl text-center">🔥</h1>
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
