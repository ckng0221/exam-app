"use client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import {
  ITopicQuestion,
  ITopicQuestionOption,
} from "../../../../../../api/question";
import {
  createAdminQuestionAction,
  updateAdminQuestionAction,
} from "../../../../../actions/topicActions";
import { useRouter } from "next/navigation";

const inputClassName =
  "disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default function Question({
  topicId,
  defaultQuestion,
  isNew = false,
  setOpenModal,
}: {
  topicId?: string;
  defaultQuestion: ITopicQuestion;
  isNew?: boolean;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}) {
  const [question, setQuestion] = useState(defaultQuestion);
  const [removedOptions, setRemovedOptions] = useState<any>([]);
  const router = useRouter();

  const textAreaClassName = `block p-2.5 ${
    isNew ? "w-full" : "w-6/12"
  } text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;

  async function handleUpdate(formData: FormData) {
    // add removed options
    formData.append("removed-options", JSON.stringify(removedOptions));

    const res = await updateAdminQuestionAction(formData);
    if (res.message === "success") {
      toast.success("Updated question");
    } else {
      toast.error(res.message);
    }
  }

  async function handleCreate(formData: FormData) {
    const res = await createAdminQuestionAction(formData);
    if (res.message === "success") {
      toast.success("Created question");
      if (setOpenModal) {
        setOpenModal(false);
      }
      router.push(`/admin/topics/${topicId}/questions`);
    } else {
      toast.error(res.message);
    }
  }

  function addNewOption() {
    const newIdx = question?.QuestionOptions?.length;

    const questionOptions = [
      ...(question?.QuestionOptions || []),
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
      <form id="question-form" action={isNew ? handleCreate : handleUpdate}>
        <input
          type="text"
          value={question.ID}
          name="question-id"
          hidden
          readOnly
        />
        <input type="text" value={topicId} name="topic-id" hidden readOnly />
        <div className="mb-4">
          {!isNew && (
            <>
              <label
                htmlFor="question-id"
                className="block mb- text-sm font-medium text-gray-900 dark:text-white"
              >
                Question ID:
              </label>
              <input
                type="number"
                id="question-id"
                name="question-id"
                className={` ${
                  isNew ? "w-full" : "w-1/12"
                } mb-4 ${inputClassName}`}
                defaultValue={question?.ID}
                disabled
              />
            </>
          )}
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
        <button
          type="submit"
          className="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {isNew ? "Create" : "Update"}
        </button>
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
    <div key={idx} className="flex items-center mb-4">
      {/* Radio Button */}
      <label
      // htmlFor={`${question.ID}-${option.OptionCode}-${idx}`}
      // className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <input
          // id={`${question.ID}-${option.OptionCode}-${idx}`}
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
        // htmlFor={`optionid-${option.ID}-optioncode-rowidx-${idx}`}
        // className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        ></label>
        <input
          name={`optionid-${option.ID}-optioncode-rowidx-${idx}`}
          type="text"
          maxLength={1}
          defaultValue={option.OptionCode}
          // id={`optionid-${option.ID}-optioncode-rowidx-${idx}`}
          className={`w-2/12 ${inputClassName}`}
        />

        {/* Description */}
        <label
          htmlFor={`optionid-${option.ID}-description-rowidx-${idx}`}
          title="option"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        ></label>
        <input
          name={`optionid-${option.ID}-description-rowidx-${idx}`}
          id={`optionid-${option.ID}-description-rowidx-${idx}`}
          type="text"
          defaultValue={option.Description}
          className={inputClassName}
        />
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
