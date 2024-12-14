"use server";

import { z } from "zod";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";

export type LoginState = {
  fieldErrors?: {
    email?: string[];
    password?: string[];
  } | null;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export async function logIn(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState | null> {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    return {
      fieldErrors: {
        email: ["존재하지 않는 이메일입니다."],
      },
    };
  }

  const isCorrect = await bcrypt.compare(result.data.password, user.password!);

  if (!isCorrect) {
    return {
      fieldErrors: {
        password: ["잘못된 비밀번호입니다."],
      },
    };
  }

  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect("/tweets");
}
