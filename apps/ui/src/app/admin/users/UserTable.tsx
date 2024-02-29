"use client";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { IUser } from "../../../api/user";
// import DeleteTopicIconBtn from "./DeleteTopicIconBtn";

interface IProps {
  users: IUser[];
}

export function UserTable({ users }: IProps) {
  const router = useRouter();

  return (
    <div className="relative overflow-x-auto">
      <h1 className="mb-2 font-bold">Users</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3">
              ID
            </th>
            <th scope="col" className="py-3">
              Name
            </th>
            <th scope="col" className="py-3">
              Email
            </th>
            <th scope="col" className="py-3">
              Role
            </th>
            <th scope="col" className="py-3">
              Created At
            </th>
            <th scope="col" className="py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const editPath = `/admin/users/${user.ID}`;

            return (
              <tr
                key={user.ID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.ID}
                </th>
                <th
                  scope="row"
                  className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.Name}
                </th>
                <td className="py-4">{user.Email}</td>
                <td className="py-4">{user.Role}</td>
                <td className="py-4">{user.CreatedAt}</td>

                <td className="py-4">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => {
                      router.push(editPath);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  {/* <DeleteTopicIconBtn
                    topicId={user.ID || ""}
                    topicName={user.Name}
                  /> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
