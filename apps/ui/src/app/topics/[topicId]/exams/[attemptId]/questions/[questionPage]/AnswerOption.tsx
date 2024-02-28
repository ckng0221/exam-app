"use client";
import { createOrUpdateAnswer } from "@/api/attempt";
import { revalidateLayout } from "@/app/actions/revalidateActions";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { ITopicQuestionOption } from "@/api/question";
// import { revalidateLayout } from "@/app/actions/revalidateActions";

export default function Options({
  isSubmitted,
  attemptId,
  questionId,
  options,
  existingAnswer,
  radioDisabled,
  correctAnswer,
}: {
  isSubmitted: boolean;
  attemptId: string;
  questionId: string;
  options: ITopicQuestionOption[];
  existingAnswer: string;
  radioDisabled: boolean;
  correctAnswer?: string;
}) {
  const [answer, setAnswer] = useState(existingAnswer);
  async function updateAnswer(answer: string) {
    if (radioDisabled) return;
    setAnswer(answer);
    // console.log(answer);

    // update db
    await createOrUpdateAnswer(attemptId, questionId, answer);
    await revalidateLayout();
  }

  return options?.map((option) => (
    <div key={option.ID} className="flex items-center mb-4">
      <input
        id={option.OptionCode}
        type="radio"
        title={option.Description}
        value={option.OptionCode}
        name="option-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 disabled:bg-gray-200"
        onChange={() => {
          updateAnswer(option.OptionCode);
        }}
        checked={option.OptionCode === answer}
        disabled={radioDisabled}
      />
      <label
        htmlFor={option.OptionCode}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {option.Description}
        &nbsp;
        <AnswerSymbol
          isSubmitted={isSubmitted}
          optionCode={option.OptionCode}
          correctAnswer={correctAnswer}
          userAnswer={answer}
        />
      </label>
    </div>
  ));
}

function AnswerSymbol({
  isSubmitted,
  optionCode,
  correctAnswer,
  userAnswer,
}: {
  isSubmitted: boolean;
  optionCode: string;
  correctAnswer: string | undefined;
  userAnswer: string;
}) {
  if (!isSubmitted) return <></>;

  if (optionCode === correctAnswer) {
    return <DoneIcon color="success" />;
  }
  if (optionCode === userAnswer && userAnswer !== correctAnswer) {
    return <CloseIcon color="error" />;
  }
  return <></>;
}
