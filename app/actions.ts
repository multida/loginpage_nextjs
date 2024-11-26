"use server";
export async function handleForm(prevState: any, formData: FormData) {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const password = formData.get("password") as string;

  // 비밀번호가 12345일 경우에 로그인 처리
  if (password === "12345") {
    return {
      errors: [],
      success: true,
    };
  }

  return {
    errors: ["wrong password"],
  };
}
