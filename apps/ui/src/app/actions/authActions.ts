"use server";
import { login, signup } from "@/api/auth";
import { cookies } from "next/headers";
import { getUsers } from "../../api/user";

export async function loginAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const turnstileToken = formData.get("cf-turnstile-response")?.toString();
  // console.log(formData);

  try {
    if (email == null) throw "Email cannot be null";
    if (password == null) throw "Password cannot be null";

    const res = await login(email, password, turnstileToken);
    //   console.log(res);
    if (res?.access_token) {
      // set cookies
      cookies().set({
        name: "Authorization",
        value: res.access_token,
        httpOnly: true,
        path: "/",
      });
      return { message: "success", name: res.name };
    } else {
      return { message: "Email or password incorrect." };
    }
  } catch (err) {
    console.error(err);
    return { error: "Failed to login" };
  }
}

export async function logoutAction() {
  try {
    cookies().delete("Authorization");

    // revalidatePath("/");
    // redirect("/");
  } catch (err) {
    return {
      error: "Failed to logout",
    };
  }
}

async function verifyEmail(email: string) {
  const users = await getUsers({ email });
  if (!users) throw "Failed to fetch users";
  // console.log(users);

  if (users.length > 0) {
    return false;
  }
  return true;
}

export async function signupAction(formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (name == null) return { message: "Name cannot be null" };
  if (email == null) return { message: "Email cannot be null" };
  if (password == null) return { message: "Password cannot be null" };

  if (!(await verifyEmail(email))) return { message: "Email is already used." };

  const res = await signup(name, email, password);
  // console.log(res);
  if (res?.ok) {
    return { message: "success" };
    // redirect("/login");
  } else {
    return { message: "Failed to sign up" };
  }
}
