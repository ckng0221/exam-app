import {
  IAttempt,
  getAttemptAnswerByQuestionId,
  getAttemptById,
} from "@/api/attempt";
import {
  getQuestionDetails,
  getQuestionDetailsSafe,
  getTotalQuestion,
} from "@/api/topic";
import AnswerOption from "./AnswerOption";
import Link from "next/link";
import Timer from "../../../../../../../components/Timer";

export default async function ExamAttempt({
  params,
}: {
  params: { topicId: string; attemptId: string; questionPage: string };
}) {
  const attempt: IAttempt = await getAttemptById(params.attemptId);
  const isSubmitted = attempt.IsSubmitted ? true : false;
  let questionId, question, questionDetail;
  let fetchResult;
  if (isSubmitted) {
    fetchResult = await getQuestionDetails(params.topicId, params.questionPage);
  } else {
    fetchResult = await getQuestionDetailsSafe(
      params.topicId,
      params.questionPage,
    );
  }
  questionId = fetchResult.questionId;
  question = fetchResult.question;
  questionDetail = fetchResult.questionDetail;
  const correctAnswer = isSubmitted ? questionDetail?.CorrectAnswer : "";

  const existingAnswer =
    (await getAttemptAnswerByQuestionId(params.attemptId, questionId)) || "";
  const totalQuestions = (await getTotalQuestion(params.topicId)) || 0;

  const btnClass =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

  const prevQuestion = Number(params.questionPage) - 1;
  const nextQuestion = Number(params.questionPage) + 1;
  const prevQuestionPath = `/topics/${params.topicId}/exams/${params.attemptId}/questions/${prevQuestion}`;
  const nextQuestionPath = `/topics/${params.topicId}/exams/${params.attemptId}/questions/${nextQuestion}`;
  const reviewPath = `/topics/${params.topicId}/exams/${params.attemptId}/review`;

  function compareByOptionCode(a: any, b: any) {
    return a.OptionCode.localeCompare(b.OptionCode);
  }

  return (
    <div className="p-4 md:pl-16">
      <div className="grid grid-cols-2">
        <div></div>
        <div>
          Time:{" "}
          <Timer
            startTimestamp={attempt.CreatedAt}
            endTimestamp={attempt.SubmitDate}
          />
        </div>
      </div>
      <div className="mb-4">
        <p className="">Question: {params.questionPage}</p>
        <p>{question.Question}</p>
      </div>

      <AnswerOption
        isSubmitted={isSubmitted}
        attemptId={params.attemptId}
        questionId={questionId}
        options={questionDetail.QuestionOptions?.sort(compareByOptionCode)}
        existingAnswer={existingAnswer}
        radioDisabled={isSubmitted}
        correctAnswer={correctAnswer}
      />

      <div className="flex">
        {prevQuestion > 0 && (
          <Link href={prevQuestionPath} type="button" className={btnClass}>
            Prev
          </Link>
        )}

        {nextQuestion <= totalQuestions && (
          <Link href={nextQuestionPath} type="button" className={btnClass}>
            Next
          </Link>
        )}
      </div>

      <div>
        <Link href={reviewPath} type="button" className={btnClass}>
          {!isSubmitted ? "Review Answers" : "View Summary"}
        </Link>
        <br />
      </div>
    </div>
  );
}
