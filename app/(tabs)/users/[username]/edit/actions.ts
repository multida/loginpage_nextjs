"use server";

import { z } from "zod";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export type EditProfileState = {
  fieldErrors?: {
    username?: string[];
    email?: string[];
    bio?: string[];
    password?: string[];
    confirm_password?: string[];
  } | null;
};

const checkUsername = (username: string) => !username.includes("potato");

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const profileSchema = z
  .object({
    username: z.string().trim().refine(checkUsername, "No potatoes allowed!"),
    email: z.string().email().toLowerCase(),
    bio: z.string().optional(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function editProfile(
  prevState: EditProfileState | null,
  formData: FormData
): Promise<EditProfileState | null> {
  const session = await getSession();

  if (!session.id) {
    return {
      fieldErrors: {
        username: ["로그인이 필요합니다."],
      },
    };
  }

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await profileSchema.spa(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const existingUserByUsername = await db.user.findUnique({
    where: { username: result.data.username },
    select: { id: true },
  });

  if (existingUserByUsername && existingUserByUsername.id !== session.id) {
    return {
      fieldErrors: {
        username: ["이미 사용 중인 사용자 이름입니다."],
      },
    };
  }

  const existingUserByEmail = await db.user.findUnique({
    where: { email: result.data.email },
    select: { id: true },
  });

  if (existingUserByEmail && existingUserByEmail.id !== session.id) {
    return {
      fieldErrors: {
        email: ["이미 사용 중인 이메일입니다."],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);

  await db.user.update({
    where: { id: session.id },
    data: {
      username: result.data.username,
      email: result.data.email,
      bio: result.data.bio,
      password: hashedPassword,
    },
  });

  redirect("/users");
}
