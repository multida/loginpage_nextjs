"use client";
import { useFormStatus } from "react-dom";
type ButtonProps = React.ComponentProps<"button"> & {
  text: string;
};

export default function Button({ text, ...props }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      disabled={pending}
      className="primary-btn h-10 flex items-center justify-center bg-orange-400  text-white font-bold rounded-2xl disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
