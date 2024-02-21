"use client";

import { logoutAction } from "../app/actions/authActions";

export default function LogoutBtn() {
  return (
    <button
      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      onClick={async () => {
        const isConfirm = confirm("Are you sure want to logout?");
        if (isConfirm) {
          await logoutAction();
        }
      }}
    >
      Logout
    </button>
  );
}
