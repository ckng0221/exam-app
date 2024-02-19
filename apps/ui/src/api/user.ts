const BASE_URL = "http://localhost:8000";

export async function getUsers() {
  const endpoint = `${BASE_URL}/users`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const users = await res.json();
  return users;
}

export async function getUserById(userId: string) {
  const endpoint = `${BASE_URL}/users/${userId}`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const user = await res.json();
  return user;
}
