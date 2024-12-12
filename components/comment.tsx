"use client";
import { createComment } from "@/app/(tabs)/tweets/[id]/actions";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import { useRef } from "react";

interface FormState {
  fieldErrors?: {
    textareaComment?: string[];
  };
  id?: string;
}

export default function Comment({ id }: { id: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [state, formAction] = useFormState<FormState, FormData>(createComment, {
    fieldErrors: {},
    id,
  });

  const handleSubmit = async (formData: FormData) => {
    formAction(formData);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
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
            ref={textareaRef}
            name="textareaComment"
            className="ring-1 ring-neutral-300 w-5/6 h-20 focus:outline-none resize-none p-2 text-neutral-800 text-sm"
            placeholder="text"
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
