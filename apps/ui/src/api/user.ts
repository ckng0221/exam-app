const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:8000";

export async function getUsers({ email }: { email?: string }) {
  const endpoint = `${BACKEND_HOST}/users?`;

  const queryParam: any = {};
  if (email) queryParam["email"] = email;

  const res = await fetch(endpoint + new URLSearchParams(queryParam), {
    cache: "no-store",
  });

  const users = await res.json();
  return users;
}

export async function getUserById(userId: string) {
  const endpoint = `${BACKEND_HOST}/users/${userId}`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const user = await res.json();
  return user;
}
