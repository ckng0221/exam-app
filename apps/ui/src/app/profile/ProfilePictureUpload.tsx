"use client";
import Button from "@mui/material/Button";
import { uploadPicture } from "../actions/userActions";
import { IUser } from "../../api/user";

export default function ProfilePictureUpload({ user }: { user: IUser }) {
  return (
    <div className="my-4">
      {/* TODO: Make it complete user update form */}
      <form action={uploadPicture}>
        <input hidden value={user.ID} name="user-id" type="text" readOnly />
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload Picture
        </label>
        <input
          className="block w-5/12 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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

        <Button variant="outlined" type="submit" className="my-4">
          Submit
        </Button>
      </form>
    </div>
  );
}
