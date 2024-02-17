"use client";

import React from "react";
import Modal from "@/components/Modal";
import { submitAnswer } from "@/api/attempt";
import { useRouter } from "next/navigation";

export default function SubmitBtn({ attemptId }: { attemptId: string }) {
  const [openModal, setOpenModal] = React.useState(false);

  const router = useRouter();

  async function handleSubmit(attemptId: string) {
    const data = await submitAnswer(attemptId);
    setOpenModal(false);
    router.push("/topics/8/exams/8/result");
  }

  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Submit Exam
      </button>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Submit Exam"
        description="Are you sure to submit exam?"
        confirmAction={() => {
          handleSubmit(attemptId);
        }}
      />
    </>
  );
}
