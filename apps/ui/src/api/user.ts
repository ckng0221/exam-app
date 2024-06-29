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
} = {}): Promise<IUser[] | undefined> {
  const endpoint = `${BACKEND_HOST}/users?`;

  const queryParam: any = {};
  if (email) queryParam["email"] = email;
  if (page) queryParam["page"] = page;
  if (pageSize) queryParam["page-size"] = pageSize;

  try {
    const res = await fetch(endpoint + new URLSearchParams(queryParam), {
      cache: "no-store",
    });
    if (res.ok) {
      const users = await res.json();
      return users;
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(userId: string): Promise<IUser | undefined> {
  try {
    const endpoint = `${BACKEND_HOST}/users/${userId}`;
    const res = await fetch(endpoint, { cache: "no-cache" });
    if (res.ok) {
      const user = await res.json();
      return user;
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserRoles(): Promise<string[] | undefined> {
  try {
    const endpoint = `${BACKEND_HOST}/roles`;
    const res = await fetch(endpoint, { cache: "no-cache" });
    if (res.ok) {
      const roles = await res.json();
      return roles;
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserById(userId: string, body: Partial<IUser>) {
  try {
    const endpoint = `${BACKEND_HOST}/users/${userId}`;
    const payload = JSON.stringify(body);
    const res = await fetch(endpoint, {
      method: "PATCH",
      body: payload,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUserById(userId: string) {
  try {
    const endpoint = `${BACKEND_HOST}/users/${userId}`;
    const res = await fetch(endpoint, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadProfilePicture(
  userId: string,
  file: any,
  filename: string,
) {
  try {
    const endpoint = `${BACKEND_HOST}/users/${userId}/profile-picture`;

    const formdata = new FormData();
    formdata.append("file", file, filename);

    const res = await fetch(endpoint, {
      method: "POST",
      body: formdata,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}
