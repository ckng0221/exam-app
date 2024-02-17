import Link from "next/link";
import AnswerOption from "./AnswerOption";

export default async function ExamAttempt({
  params,
}: {
  params: { topicId: string; attemptId: string; questionNumber: string };
}) {
  async function getQuestionDetails() {
    const BASE_URL = "http://localhost:8000";
    const endpoint = `${BASE_URL}/topics/${params.topicId}/questions?`;

    const res = await fetch(
      endpoint +
        new URLSearchParams({
          number: params.questionNumber,
        }),
      { cache: "no-cache" }
    );
    const questions = await res.json();
    const question = questions[0];
    const questionId = question.ID;

    const questionDetailsEndpoint = `${BASE_URL}/topic-questions/${questionId}`;
    const questRes = await fetch(questionDetailsEndpoint, {
      cache: "no-cache",
    });
    const questionDetail = await questRes.json();

    return { questionId, question, questionDetail };
  }

  async function getTotalQuestion() {
    // Total question
    const BASE_URL = "http://localhost:8000";
    const endpoint = `${BASE_URL}/topics/${params.topicId}/questions/count`;
    const res = await fetch(endpoint, { cache: "no-cache" });
    const totalQuestions = await res.json();
    return totalQuestions;
  }

  async function getAttemptAnswer() {
    const BASE_URL = "http://localhost:8000";
    const endpoint = `${BASE_URL}/attempts/${params.attemptId}/answers?`;
    const res = await fetch(
      endpoint +
        new URLSearchParams({
          questionid: questionId,
        })
    );
    const data = await res.json();
    return data[0]?.Answer;
  }

  const { questionId, question, questionDetail } = await getQuestionDetails();
  const existingAnswer = (await getAttemptAnswer()) || "";
  const totalQuestions = (await getTotalQuestion()) || 0;

  const btnClass =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

  const prevQuestion = Number(params.questionNumber) - 1;
  const nextQuestion = Number(params.questionNumber) + 1;
  const prevQuestionPath = `/topics/${params.topicId}/exams/${params.attemptId}/questions/${prevQuestion}`;
  const nextQuestionPath = `/topics/${params.topicId}/exams/${params.attemptId}/questions/${nextQuestion}`;

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
        attemptId={params.attemptId}
        questionId={questionId}
        options={questionDetail.QuestionOptions?.sort(compareByOptionCode)}
        existingAnswer={existingAnswer}
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
    </div>
  );
}
