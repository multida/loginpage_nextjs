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
          className="flex flex-row items-center bg-gray-100 rounded-2xl p-2 space-x-2"
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="textareaComment"
            rows={2}
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 resize-none focus:outline-none p-2"
            placeholder="댓글을 달아주세요😁"
          />
          <button
            type="submit"
            disabled={comment.length === 0}
            className={`
      rounded-full p-2 transition-all duration-200 ease-in-out
      ${
        comment.length > 0
          ? "text-blue-500 hover:bg-blue-50 border border-blue-500"
          : "text-gray-400 border border-gray-300 cursor-not-allowed"
      }
    `}
          >
            <PaperAirplaneIcon className="size-5" />
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
