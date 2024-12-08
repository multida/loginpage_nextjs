"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadTweet } from "./actions";
import { useFormState } from "react-dom";

export default function AddTweet() {
  const [preview, setPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];

    // Check image
    if (!file.type.startsWith("image/")) {
      console.log("please upload image");
      return;
    }
    // Check image size
    const maxSizeMB = 3;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      console.log(
        `${file.size} size too big! size should be less than ${maxSizeMB}`
      );
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  const [state, dispatch] = useFormState(uploadTweet, null);

  return (
    <div>
      <form action={dispatch} className="p-5 pb-28 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square  size-60  flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                {state?.fieldErrors.photo}
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
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
