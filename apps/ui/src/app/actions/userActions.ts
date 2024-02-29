"use server";
import { IUser, deleteUserById, updateUserById } from "../../api/user";
import { revalidatePage } from "./revalidateActions";

export async function updateUserAction(user: IUser) {
  if (!user.ID) {
    return { message: "User ID cannot be null" };
  }
  if (!user.Name) {
    return { message: "Name cannot be null" };
  }
  if (!user.Email) {
    return { message: "Email cannot be null" };
  }

  const payload = {
    Name: user.Name,
    Email: user.Email,
    Role: user.Role,
  };

  const res = await updateUserById(user.ID, payload);
  console.log(res);

  if (res.ok) {
    revalidatePage("/admin/users");
    return { message: "success" };
  } else {
    return { message: "error" };
  }
}

export async function deleteUserAction(userId: string) {
  if (!userId) return;
  try {
    const res = await deleteUserById(userId);
    revalidatePage("/admin/users");
    if (res.ok) {
      return { message: "success" };
    } else {
      console.error(await res.json());

      return { message: `${res.status} Failed to delete user` };
    }
  } catch (err) {
    console.error(err);
    // return { message: JSON.stringify(String(err)) };
    return { message: "Failed to delete user" };
  }
}
