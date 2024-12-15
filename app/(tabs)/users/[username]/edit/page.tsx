"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { editProfile } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function EditUser() {
  const [state, dispatch] = useFormState(editProfile, null);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6 h-[calc(100vh-100px)] overflow-y-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          회원정보 수정하기
        </h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors?.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors?.email}
        />
        <Input
          name="bio"
          type="text"
          placeholder="bio"
          errors={state?.fieldErrors?.bio}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors?.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors?.confirm_password}
        />
        <Button text="수정 완료" />
      </form>
    </div>
  );
}
