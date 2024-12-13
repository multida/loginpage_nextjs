"use client";
import { createComment } from "@/app/(tabs)/tweets/[id]/actions";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function Comment({ id }: { id: number }) {
  const [comment, setComment] = useState("");
  const [state, dispatch] = useFormState(createComment, {
    fieldErrors: {},
    id: id,
  });

  const handleSubmit = (formData: FormData) => {
    dispatch(formData);
    setComment("");
  };

  return (
    <>
      <div>
        <form
          action={handleSubmit}
          className="flex flex-row justify-start items-center gap-4 mt-6"
        >
          <input type="hidden" name="id" value={id} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="textareaComment"
            className="ring-1 ring-neutral-300 w-5/6 h-20 focus:outline-none resize-none p-2 text-neutral-800 text-sm"
            placeholder="댓글을 달아주세요."
          />
          <button className="w-1/6 flex items-center justify-center shadow-md rounded-lg h-20">
            <PaperAirplaneIcon className="size-6" />
          </button>
        </form>

        {state?.fieldErrors?.textareaComment && (
          <span className="text-red-600 text-xs">
            {state.fieldErrors.textareaComment[0]}
          </span>
        )}
      </div>
    </>
  );
}
