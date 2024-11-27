"use client";
import { useFormStatus } from "react-dom";
type ButtonProps = React.ComponentProps<"button"> & {
  text: string;
};

export default function Button({ text, ...props }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending || props.disabled} {...props}>
      {pending ? "로딩 중..." : text}
    </button>
  );
}
