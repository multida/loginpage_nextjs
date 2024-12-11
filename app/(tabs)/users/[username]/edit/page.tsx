"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { editProfile } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import {
  EnvelopeIcon,
  UserIcon,
  BriefcaseIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function EditUser() {
  const [state, dispatch] = useFormState(editProfile, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="bio"
          type="text"
          placeholder="bio"
          errors={state?.fieldErrors.bio}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="Create account" />
      </form>
    </div>
  );
}
