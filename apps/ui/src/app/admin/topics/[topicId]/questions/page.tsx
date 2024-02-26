import React from "react";
import ActiveLastBreadcrumb from "../../../../../components/BeadCrumb";
import {
  ITopicQuestion,
  ITopicQuestionOption,
  getAllQuestionsByTopic,
} from "@/api/question";
import { updateAdminQuestions } from "../../../../actions/topicActions";

async function QuestionsAdminPage({ params }: { params: { topicId: string } }) {
  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Topics", href: "/admin" },
    { name: params.topicId, href: `/admin/topics/${params.topicId}` },
    { name: "Questions", href: `/admin/topics/${params.topicId}/questions` },
  ];

  const questions = await getAllQuestionsByTopic(params.topicId, {
    options: true,
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <Questions questions={questions} />
    </div>
  );
}

export default QuestionsAdminPage;

function Questions({ questions }: { questions: ITopicQuestion[] }) {
  return (
    <form action={updateAdminQuestions}>
      {questions.map((question) => {
        return <Question key={question.ID} question={question} />;
      })}
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
      >
        Add Question
      </button>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Update questions
      </button>
    </form>
  );
}

function Question({ question }: { question: ITopicQuestion }) {
  const textAreaClassName =
    "block p-2.5 w-6/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div className="mb-6">
      <div className="mb-4">
        <p className="font-medium">
          Question:
          {question.QuestionNumber}
        </p>
        <label htmlFor="">
          <textarea
            name={`questionid-${question.ID}-question`}
            className={textAreaClassName}
            id={`questionid-${question.ID}`}
            defaultValue={question.Question}
          />
        </label>
      </div>
      <QuestionOptions
        question={question}
        options={question?.QuestionOptions || []}
      />
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
  const inputClassName =
    "disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return options?.map((option) => (
    <div key={option.ID} className="flex items-center mb-4">
      <input
        id={`${question.ID}-${option.OptionCode}`}
        type="radio"
        title={option.Description}
        value={option.OptionCode}
        name={`questionid-${question.ID}-option-radio`}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 disabled:bg-gray-200"
        defaultChecked={option.OptionCode === question.CorrectAnswer}
        // onChange={() => {
        //   updateAnswer(option.OptionCode);
        // }}
      />
      <label
        htmlFor={option.OptionCode}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <div className="flex content-center gap-2">
          <div>({option.OptionCode})</div>
          <input
            name={`questionid-${question.ID}-optionid-${option.ID}`}
            type="text"
            defaultValue={option.Description}
            className={inputClassName}
          />
        </div>
      </label>
    </div>
  ));
}
