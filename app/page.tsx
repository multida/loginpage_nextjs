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
        <FormButton text="Log in" />
      </form>
    </div>
  );
}
