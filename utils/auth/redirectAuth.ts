import { redirect } from "next/navigation"
import isLoggedIn from "./isLoggedIn"

type AuthStatus = "loggedIn" | "notLoggedIn";

export default async function redirectAuth(type: AuthStatus) {
  const loggedIn = await isLoggedIn();

  if (loggedIn && type === "loggedIn") redirect("/auth/sign-up");
  if (!loggedIn && type === "notLoggedIn") redirect("/auth/sign-up");
}