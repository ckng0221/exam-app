"use client";

import { logoutAction } from "../app/actions/authActions";
import Modal from "./Modal";
import { useState } from "react";

export default function LogoutBtn() {
  const [showModal, setShowModal] = useState(false);
  async function handleConfirm() {
    await logoutAction();
  }

  return (
    <>
      <button
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        onClick={async () => {
          setShowModal(true);
        }}
      >
        Logout
      </button>
      <Modal
        title="Logout"
        description="Are you sure you want to log out?"
        openModal={showModal}
        setOpenModal={setShowModal}
        confirmAction={handleConfirm}
      />
    </>
  );
}
