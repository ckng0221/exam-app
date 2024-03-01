"use server";
import {
  IUser,
  deleteUserById,
  updateUserById,
  uploadProfilePicture,
} from "../../api/user";
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

export async function updateProfile(formData: FormData) {
  const userId = formData.get("user-id")?.toString() || "";
  const file = formData.get("profile-picture") as File | null;
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;

  if (!userId)
    return {
      message: "user ID cannot be null",
    };

  // Update Porifle picture
  let res: Response;
  let payload: Partial<IUser> = {};
  if (file && file.size > 0) {
    // upload photo
    res = await uploadProfilePicture(userId, file, file.name);
    const data = await res?.json();
    const filepath = data.filepath;
    payload["ProfilePic"] = String(filepath);
  }
  if (name) payload["Name"] = name;
  if (email) payload["Email"] = email;

  res = await updateUserById(userId, payload);
  if (res.ok) {
    revalidatePage("/profile");
    return { message: "success" };
  } else {
    return { message: "Failed to upload photo" };
  }
}
