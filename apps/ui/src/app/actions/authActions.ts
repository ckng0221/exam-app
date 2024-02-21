"use server";
import { login, signup } from "@/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUsers } from "../../api/user";

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

async function verifyEmail(email: string) {
  const users = await getUsers({ email });
  console.log(users);

  if (users.length > 0) {
    return false;
  }
  return true;
}

export async function signupAction(prevState: any, formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (name == null) return { message: "Name cannot be null" };
  if (email == null) return { message: "Email cannot be null" };
  if (password == null) return { message: "Password cannot be null" };

  if (!(await verifyEmail(email))) return { message: "Email is already used." };

  const res = await signup(name, email, password);
  // console.log(res);
  if (res.ID) {
    redirect("/login");
  } else {
    return { message: "Failed to sign up" };
  }
}
