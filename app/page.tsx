"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function LogIn() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="flex flex-col m-auto gap-10 py-8 px-6 max-w-screen-md">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-5xl text-center">🔥</h1>
      </div>
      <form action={action} className="flex flex-col gap-5">
        <FormInput
          name="Email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
          Icon={EnvelopeIcon}
        />
        <FormInput
          name="Username"
          type="text"
          placeholder="Username"
          required
          errors={[]}
          Icon={UserIcon}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
          Icon={LockClosedIcon}
        />
        <FormButton
          text="Log in"
          disabled={state?.success}
          className={`${
            state?.success
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        />
        {state?.success && (
          <button className="relative p-4 px-12 text-left rounded-2xl bg-green-800">
            <svg
              className="absolute left-2 top-4 w-6"
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              ></path>
            </svg>
            Welcome back!
          </button>
        )}
      </form>
    </div>
  );
}
