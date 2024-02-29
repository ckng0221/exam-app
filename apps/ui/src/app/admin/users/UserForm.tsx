"use client";
import { updateTopicAction } from "@/app/actions/topicActions";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { IUser } from "../../../api/user";
import { updateUserAction } from "../../actions/userActions";
import DeleteUserIconBtn from "./DeleteUserIconBtn";

export default function UserForm({
  user,
  roles,
}: {
  user: IUser;
  roles: string[];
}) {
  const inputClassName =
    "disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const [userInput, setUserInput] = useState<IUser>(user);
  const router = useRouter();

  async function handleUpdate(e: FormEvent, user: IUser) {
    e.preventDefault();
    const res = await updateUserAction(user);
    if (res.message === "success") {
      toast.success("User updated!");
      router.push("/admin/users");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <form className="mb-4" onSubmit={(e) => handleUpdate(e, userInput)}>
        <div>
          <div className="grid grid-cols-2 mb-4">
            <div>
              <p className="font-bold">Topic</p>
            </div>

            <div className="justify-self-end">
              <DeleteUserIconBtn userId={user.ID || ""} userName={user.Name} />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="topicid"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ID
            </label>
          </div>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={userInput.Name}
              className={inputClassName}
              name="name"
              required
              onChange={(e) =>
                setUserInput({ ...userInput, Name: e.target.value })
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              onChange={(e) =>
                setUserInput({ ...userInput, Email: e.target.value })
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={userInput.Role}
              onChange={(e) =>
                setUserInput({ ...userInput, Role: e.target.value })
              }
            >
              <option disabled value="">
                Select a role
              </option>
              {roles.map((role, idx) => (
                <option key={idx} value={role}>
                  {role}
                </option>
              ))}
              {/* <option selected>Choose a country</option> */}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
