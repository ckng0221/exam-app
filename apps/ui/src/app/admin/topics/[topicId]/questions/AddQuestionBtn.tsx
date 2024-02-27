"use client";
import { useState } from "react";
import Modal from "../../../../../components/Modal";
import Question from "./[questionNumber]/Question";

export default function AddQuestionBtn({
  topicId,
  defaultQuestionNumber,
}: {
  topicId: string;
  defaultQuestionNumber: number;
}) {
  const [openModal, setOpenModal] = useState(false);
  const question = {
    ID: "new",
    Question: "",
    QuestionNumber: defaultQuestionNumber,
    CorrectAnswer: "",
    QuestionScore: 1,
    TopicID: topicId,
    QuestionOptions: [{ ID: "new0", Description: "", OptionCode: "" }],
  };

  return (
    <div>
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        onClick={() => setOpenModal(true)}
      >
        Add Question
      </button>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="New Question"
        confirmText="Create"
        hideConfirm
        description={
          <Question
            topicId={topicId}
            defaultQuestion={question}
            isNew
            setOpenModal={setOpenModal}
          />
        }
      />
    </div>
  );
}
