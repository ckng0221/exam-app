const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:8000";

export interface IUser {
  ID: string;
  Name: string;
  Email: string;
  Role: string;
  CreatedAt: string;
  UpdatedAt: string;
  ProfilePic: string;
}

export async function getUsers({
  email,
  page,
  pageSize,
}: {
  email?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const endpoint = `${BACKEND_HOST}/users?`;

  const queryParam: any = {};
  if (email) queryParam["email"] = email;
  if (page) queryParam["page"] = page;
  if (pageSize) queryParam["page-size"] = pageSize;

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

export async function getUserRoles() {
  const endpoint = `${BACKEND_HOST}/roles`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const roles = await res.json();
  return roles;
}

export async function updateUserById(userId: string, body: Partial<IUser>) {
  const endpoint = `${BACKEND_HOST}/users/${userId}`;
  const payload = JSON.stringify(body);
  const res = await fetch(endpoint, {
    method: "PATCH",
    body: payload,
    headers: { "Content-Type": "application/json" },
  });
  return res;
}

export async function deleteUserById(userId: string) {
  const endpoint = `${BACKEND_HOST}/users/${userId}`;
  const res = await fetch(endpoint, {
    method: "DELETE",
  });
  return res;
}

export async function uploadProfilePicture(
  userId: string,
  file: any,
  filename: string,
) {
  const endpoint = `${BACKEND_HOST}/users/${userId}/profile-picture`;

  const formdata = new FormData();
  formdata.append("file", file, filename);

  const res = await fetch(endpoint, {
    method: "POST",
    body: formdata,
  });
  return res;
}
