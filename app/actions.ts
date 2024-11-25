"use server";
export async function handleForm(prevState: any, formData: FormData) {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 5000));

  //redirect("/home")

  return {
    errors: ["wrong password"],
  };
}
