"use client";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
  disabled?: boolean;
  className?: string;
}

export default function FormButton({
  text,
  disabled = false,
}: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || disabled}
      className="primary-btn h-10 bg-orange-500 rounded-3xl disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "Loading ..." : text}
    </button>
  );
}
