"use client";
import React, { useState } from "react";
import { IUser } from "../../api/user";
import { updateProfile } from "../actions/userActions";
import { Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ProfileForm({
  user,
  imagePath,
}: {
  user: IUser;
  imagePath: string;
}) {
  const [userInput, setUserInput] = useState<IUser>(user);
  const router = useRouter();
  const inputClassName =
    "w-4/12 disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  async function handleUpdate(formData: FormData) {
    const res = await updateProfile(formData);
    if (res.message === "success") {
      toast.success("Profile updated!");
      router.push("/profile");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <form action={handleUpdate}>
      <input hidden value={user.ID} name="user-id" type="text" readOnly />
      <div className="flex">
        <Link href="/profile">
          <Avatar alt="profile picture" src={imagePath} />
        </Link>
      </div>
      <ProfilePictureUpload />
      <div className="mb-5">
        <label
          htmlFor="name"
          className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={userInput.Name}
          className={`${inputClassName}`}
          name="name"
          required
          onChange={(e) => setUserInput({ ...userInput, Name: e.target.value })}
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              "Please enter your name",
            )
          }
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={userInput.Email}
          className={inputClassName}
          name="email"
          required
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              "Please enter your email",
            )
          }
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          onChange={(e) =>
            setUserInput({ ...userInput, Email: e.target.value })
          }
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outlined"
          type="button"
          color="inherit"
          className="my-4"
          onClick={() => router.push("/profile")}
        >
          Cancel
        </Button>
        <Button variant="outlined" type="submit" color="error" className="my-4">
          Update
        </Button>
      </div>
    </form>
  );
}

function ProfilePictureUpload() {
  return (
    <div className="my-4">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Upload Picture
      </label>
      <input
        className="block w-4/12 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        name="profile-picture"
        type="file"
        accept=".svg,.png,.jpg,.gif"
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        SVG, PNG, JPG or GIF.
      </p>
    </div>
  );
}
