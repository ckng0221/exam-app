"use client";

import { toast } from "react-hot-toast";
import {
  ITopicQuestion,
  ITopicQuestionOption,
} from "../../../../../../api/question";
import { updateAdminQuestionsAction } from "../../../../../actions/topicActions";

const inputClassName =
  "disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default function Question({ question }: { question: ITopicQuestion }) {
  const textAreaClassName =
    "block p-2.5 w-6/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  async function handleUpdate(formData: FormData) {
    const res = await updateAdminQuestionsAction(formData);
    if (res.message === "success") {
      toast.success("Updated question");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="mb-4">
      <form action={handleUpdate}>
        <input
          type="text"
          value={question.ID}
          name="question-id"
          hidden
          readOnly
        />
        <div className="mb-4">
          <label
            htmlFor="question-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Question:&nbsp;
            {question.QuestionNumber}
          </label>
          <textarea
            id="question-input"
            name="question-input"
            className={textAreaClassName}
            defaultValue={question.Question}
          ></textarea>
          <div className="mt-4 mb-8 w-1/12">
            <label
              htmlFor="question-score"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Question Score
            </label>
            <input
              type="number"
              id="question-score"
              name="question-score"
              className={inputClassName}
              defaultValue={question.QuestionScore}
            />
          </div>
        </div>
        <QuestionOptions
          question={question}
          options={question?.QuestionOptions || []}
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Update
        </button>
      </form>
    </div>
  );
}

function QuestionOptions({
  question,
  options,
}: {
  question: any;
  options: ITopicQuestionOption[] | any[];
}) {
  return options?.map((option) => (
    <div key={option.ID} className="flex items-center mb-4">
      <input
        id={`${question.ID}-${option.OptionCode}`}
        type="radio"
        title={option.Description}
        value={option.OptionCode}
        name={`correct-answer`}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 disabled:bg-gray-200"
        defaultChecked={option.OptionCode === question.CorrectAnswer}
      />
      <label
        htmlFor={option.OptionCode}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <div className="flex content-center gap-2">
          <div>({option.OptionCode})</div>
          <input
            name={`optionid-${option.ID}`}
            type="text"
            defaultValue={option.Description}
            className={inputClassName}
          />
        </div>
      </label>
    </div>
  ));
}
