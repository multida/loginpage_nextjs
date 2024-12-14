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
        className="flex flex-col gap-10 max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg h-[calc(100vh-100px)] overflow-y-auto mt-4"
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
