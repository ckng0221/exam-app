import { getAttemptAnswerByQuestionId, getAttemptById } from "@/api/attempt";
import { getQuestionDetails, getTotalQuestion } from "@/api/question";
import AnswerOption from "./AnswerOption";

export default async function ExamAttempt({
  params,
}: {
  params: { topicId: string; attemptId: string; questionNumber: string };
}) {
  const attempt = await getAttemptById(params.attemptId);
  const isSubmitted = attempt.IsSubmitted ? true : false;
  const { questionId, question, questionDetail } = await getQuestionDetails(
    params.topicId,
    params.questionNumber
  );
  const correctAnswer = isSubmitted ? questionDetail.CorrectAnswer : "";

  const existingAnswer =
    (await getAttemptAnswerByQuestionId(params.attemptId, questionId)) || "";
  const totalQuestions = (await getTotalQuestion(params.topicId)) || 0;

  const btnClass =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

  const prevQuestion = Number(params.questionNumber) - 1;
  const nextQuestion = Number(params.questionNumber) + 1;
  const prevQuestionPath = `/topics/${params.topicId}/exams/${params.attemptId}/questions/${prevQuestion}`;
  const nextQuestionPath = `/topics/${params.topicId}/exams/${params.attemptId}/questions/${nextQuestion}`;
  const reviewPath = `/topics/${params.topicId}/exams/${params.attemptId}/review`;

  function compareByOptionCode(a: any, b: any) {
    return a.OptionCode.localeCompare(b.OptionCode);
  }

  return (
    <div className="p-4 md:pl-16">
      <div className="mb-4">
        <p className="">Question: {params.questionNumber}</p>
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
          <a href={prevQuestionPath} type="button" className={btnClass}>
            Prev
          </a>
        )}

        {nextQuestion <= totalQuestions && (
          <a href={nextQuestionPath} type="button" className={btnClass}>
            Next
          </a>
        )}
      </div>

      <div>
        <a href={reviewPath} type="button" className={btnClass}>
          {!isSubmitted ? "Review Answers" : "View Summary"}
        </a>
      </div>
    </div>
  );
}