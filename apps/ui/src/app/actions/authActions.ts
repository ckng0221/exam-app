"use server";
import { login } from "@/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (email == null) throw "Email cannot be null";
  if (password == null) throw "Password cannot be null";
  const res = await login(email, password);
  //   console.log(res);
  if (res.access_token) {
    // set cookies
    cookies().set({
      name: "Authorization",
      value: res.access_token,
      httpOnly: true,
      path: "/",
    });

    redirect("/");
  } else {
    return { message: "Please enter a valid email or password" };
  }
}
export async function logoutAction() {
  try {
    cookies().delete("Authorization");

    redirect("/");
  } catch (err) {}
}
