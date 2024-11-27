"use server";
import { z } from "zod";

const passwordRegex = new RegExp(/^(?=.*\d).+$/);

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: "username must be a string!",
      required_error: "Where is my username???",
    })
    .min(5, "Way too short!!!")
    .trim(),
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@zod.com"), {
      message: "Only '@zod.com' emails are allowed!",
    }),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long!")
    .regex(passwordRegex, "Passwords must contain at least one number"),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      success: false,
    };
  } else {
    console.log(result.data);
    return {
      fieldErrors: {},
      success: true,
    };
  }
}
