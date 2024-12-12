"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { uploadTweet } from "./actions";
import { useFormState } from "react-dom";

export default function AddTweet() {
  const [state, dispatch] = useFormState(uploadTweet, null);

  return (
    <div>
      <form action={dispatch} className="p-5 pb-28 flex flex-col gap-5">
        <Input
          name="tweet"
          type="text"
          required
          placeholder="트윗 내용"
          errors={state?.fieldErrors.tweet}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
