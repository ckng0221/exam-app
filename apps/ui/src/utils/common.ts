import { validateCookieToken } from "@/api/auth";
import { cookies } from "next/headers";

export async function getUserByCookie() {
  const accessToken = cookies().get("Authorization");

  let isLoggedIn = false;

  let user;
  if (accessToken) {
    user = await validateCookieToken(accessToken.value);
    if (user.ID) {
      isLoggedIn = true;
    }
  }
  return user;
}

export async function isAdmin() {
  const user = await getUserByCookie();
  if (!user) return false;
  return user.Role === "admin";
}

export async function getAccessTokenFromCookie() {
  const accessToken = cookies().get("Authorization");
  return accessToken;
}
