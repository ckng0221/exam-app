"use client";
import { useState } from "react";

interface IOption {
  ID: string;
  OptionCode: string;
  Description: string;
}

export default function Options({
  attemptId,
  questionId,
  options,
  existingAnswer,
}: {
  attemptId: string;
  questionId: string;
  options: IOption[];
  existingAnswer: string;
}) {
  const [answer, setAnswer] = useState(existingAnswer);
  async function updateAnswer(answer: string) {
    setAnswer(answer);
    // console.log(answer);

    // update db
    const BASE_URL = "http://localhost:8000";
    const endpoint = `${BASE_URL}/attempt-answers`;
    const payload = JSON.stringify({
      AttemptID: Number(attemptId),
      QuestionID: Number(questionId),
      Answer: answer,
    });
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });
    const data = await res.json();
  }

  return options?.map((option) => (
    <div key={option.ID} className="flex items-center mb-4">
      <input
        id={option.OptionCode}
        type="radio"
        title={option.Description}
        value={option.OptionCode}
        name="option-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={() => {
          updateAnswer(option.OptionCode);
        }}
        checked={option.OptionCode === answer}
      />
      <label
        htmlFor={option.OptionCode}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {option.Description}
      </label>
    </div>
  ));
}
