"use client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  ITopicQuestion,
  ITopicQuestionOption,
} from "../../../../../../api/question";
import { updateAdminQuestionsAction } from "../../../../../actions/topicActions";

const inputClassName =
  "disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default function Question({
  question: defaultQuestion,
  isNew = false,
}: {
  question: ITopicQuestion;
  isNew?: boolean;
}) {
  const [question, setQuestion] = useState(defaultQuestion);
  const [removedOptions, setRemovedOptions] = useState<any>([]);

  const textAreaClassName = `block p-2.5 ${
    isNew ? "w-full" : "w-6/12"
  } text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;

  async function handleUpdate(formData: FormData) {
    // add removed options
    formData.append("removed-options", JSON.stringify(removedOptions));

    const res = await updateAdminQuestionsAction(formData);
    if (res.message === "success") {
      toast.success("Updated question");
    } else {
      toast.error(res.message);
    }
  }

  function addNewOption() {
    const newIdx = question.QuestionOptions.length;

    const questionOptions = [
      ...question.QuestionOptions,
      {
        ID: `new${newIdx}`,
        Description: "",
        OptionCode: "",
        QuestionID: question.ID,
        rowIdx: newIdx,
      },
    ];
    setQuestion({ ...question, QuestionOptions: questionOptions });
  }

  function handleRemove(ID: string) {
    let questionOptions;
    questionOptions = question.QuestionOptions.filter((x) => x.ID !== ID);

    setQuestion({ ...question, QuestionOptions: questionOptions });
    if (!String(ID).startsWith("new")) {
      setRemovedOptions((prev: any) => [...prev, { id: ID }]);
    }
  }

  return (
    <div className="mb-4">
      <form id="question-form" action={handleUpdate}>
        <input
          type="text"
          value={question.ID}
          name="question-id"
          hidden
          readOnly
        />
        <div className="mb-4">
          <label
            htmlFor="question-number"
            className="block mb- text-sm font-medium text-gray-900 dark:text-white"
          >
            Question Number:
          </label>
          <input
            type="number"
            id="question-number"
            name="question-number"
            className={` ${isNew ? "w-full" : "w-1/12"} mb-4 ${inputClassName}`}
            defaultValue={question.QuestionNumber}
          />
          <label
            htmlFor="question-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Question:
          </label>
          <textarea
            id="question-input"
            name="question-input"
            className={textAreaClassName}
            defaultValue={question.Question}
          ></textarea>

          <div className={`mt-4 mb-8 ${isNew ? "w-full" : "w-1/12"}`}>
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
        <IconButton
          aria-label="Add Question"
          color="primary"
          className="mb-4"
          onClick={addNewOption}
        >
          <AddCircleIcon />
        </IconButton>
        <QuestionOptions
          question={question}
          handleRemove={handleRemove}
          options={question?.QuestionOptions || []}
        />

        {!isNew && (
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
}

function QuestionOptions({
  question,
  options,
  handleRemove,
}: {
  question: any;
  options: ITopicQuestionOption[] | any[];
  handleRemove: (id: string) => void;
}) {
  return options?.map((option, idx) => (
    <div key={option.ID} className="flex items-center mb-4">
      {/* Radio Button */}
      <label
        htmlFor={`${question.ID}-${option.OptionCode}-${idx}`}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <input
          id={`${question.ID}-${option.OptionCode}-${idx}`}
          type="radio"
          title={option.Description}
          value={option.OptionCode}
          name={`correct-answer`}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 disabled:bg-gray-200"
          defaultChecked={option.OptionCode === question.CorrectAnswer}
        />
      </label>

      <div className="flex content-center gap-2">
        {/* OptionCode */}
        <label
          htmlFor={`optionid-${option.ID}-optioncode-rowidx-${idx}`}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        ></label>
        <input
          name={`optionid-${option.ID}-optioncode-rowidx-${idx}`}
          type="text"
          defaultValue={option.OptionCode}
          id={`optionid-${option.ID}-optioncode-rowidx-${idx}`}
          className={`w-2/12 ${inputClassName}`}
        />

        {/* Description */}
        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          <input
            name={`optionid-${option.ID}-description-rowidx-${idx}`}
            id={`optionid-${option.ID}-description-rowidx-${idx}`}
            type="text"
            defaultValue={option.Description}
            className={inputClassName}
          />
        </label>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleRemove(option.ID)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  ));
}
