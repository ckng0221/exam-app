import { IUser } from "./user";

const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:8000";

const MODULE = "auth";

export async function login(
  email: string,
  password: string,
  turnstileToken?: string,
) {
  const endpoint = `${BACKEND_HOST}/${MODULE}/login`;

  const payload = JSON.stringify({
    email,
    password,
    turnstile_token: turnstileToken,
  });
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const login = await res.json();
      return login;
    }
    throw res.status;
  } catch (error) {
    throw error;
  }
}

export async function validateCookieToken(
  access_token: string,
): Promise<IUser | undefined> {
  try {
    const endpoint = `${BACKEND_HOST}/${MODULE}/validate`;

    const headers = new Headers();
    headers.append("Cookie", `Authorization=${access_token}`);

    const res = await fetch(endpoint, { headers: headers });
    if (res.ok) {
      const user = await res.json();
      return user;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const endpoint = `${BACKEND_HOST}/${MODULE}/logout`;

    const res = await fetch(endpoint, {
      method: "POST",
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function signup(name: string, email: string, password: string) {
  const endpoint = `${BACKEND_HOST}/${MODULE}/signup`;
  try {
    const payload = JSON.stringify({ name, email, password });
    const res = await fetch(endpoint, {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error("error", err);
  }
}
