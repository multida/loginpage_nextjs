"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { uploadTweet } from "./actions";
import { useFormState } from "react-dom";

export default function AddTweet() {
  const [state, dispatch] = useFormState(uploadTweet, null);

  return (
    <div>
      <form
        action={dispatch}
        className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl p-6 h-[calc(100vh-100px)] overflow-y-auto flex flex-col gap-4"
      >
        <Input
          name="tweet"
          type="text"
          required
          placeholder="트윗 내용"
          errors={state?.fieldErrors?.tweet}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
