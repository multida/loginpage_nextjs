import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
interface SessionContent {
  id?: number;
}
export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!,
    // 느낌표는 null, undefined가 아니라고 알려주는 역할
  });
}
