import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div>
      <h1 className="h-20 flex justify-center items-center text-center">
        Welcome! <br />
        😄 {user?.username} 😄
      </h1>
      <form action={logOut}>
        <button className="flex justify-end -mx-5 w-full text-right text-gray-400">
          Log out
        </button>
      </form>
    </div>
  );
}
