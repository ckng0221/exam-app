const BASE_URL = "http://localhost:8000";

export async function login(email: string, password: string) {
  const endpoint = `${BASE_URL}/login`;

  const payload = JSON.stringify({ email, password });
  const res = await fetch(endpoint, {
    method: "POST",
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const login = await res.json();
  return login;
}

export async function validateCookieToken(access_token: string) {
  const endpoint = `${BASE_URL}/validate`;

  const headers = new Headers();
  headers.append("Cookie", `Authorization=${access_token}`);

  const res = await fetch(endpoint, { headers: headers });
  const user = await res.json();
  return user;
}

export async function logout() {
  const endpoint = `${BASE_URL}/logout`;

  const res = await fetch(endpoint, {
    method: "POST",
  });
  const data = await res.json();
  return data;
}

export async function signup(name: string, email: string, password: string) {
  const endpoint = `${BASE_URL}/signup`;

  const payload = JSON.stringify({ name, email, password });
  const res = await fetch(endpoint, {
    method: "POST",
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const signup = await res.json();
  return signup;
}
