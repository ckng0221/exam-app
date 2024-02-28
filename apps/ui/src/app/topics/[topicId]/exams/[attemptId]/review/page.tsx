import {
  IAttemptAnswer,
  getAttemptAnswers,
  getAttemptById,
} from "@/api/attempt";
import { ITopicQuestion, getAllQuestionsByTopic } from "@/api/topic";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import SubmitBtn from "./SubmitBtn";

interface IProps {
  topicId: string;
  attemptId: string;
  isSubmitted: boolean;
}

export default async function page({ params }: { params: IProps }) {
  const attempt = await getAttemptById(params.attemptId);

  const isSubmitted = attempt.IsSubmitted;

  return (
    <div className="p-4 pl-16">
      <ReviewTable
        topicId={params.topicId}
        attemptId={params.attemptId}
        isSubmitted={isSubmitted}
      />

      {isSubmitted ? (
        <Link
          href={`/topics/${params.topicId}/exams/${params.attemptId}/result`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Check Result
        </Link>
      ) : (
        <SubmitBtn topicId={params.topicId} attemptId={params.attemptId} />
      )}
    </div>
  );
}

async function ReviewTable({ topicId, attemptId, isSubmitted }: IProps) {
  const questions: ITopicQuestion[] = await getAllQuestionsByTopic(topicId);
  const attemptAnswers: IAttemptAnswer[] = await getAttemptAnswers(attemptId);

  const questionPath = `/topics/${topicId}/exams/${attemptId}/questions`;

  return (
    <div className="mb-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Questions
              </th>
              <th scope="col" className="px-6 py-3">
                Answers
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, idx) => {
              const questionAnswer = attemptAnswers.find(
                (x: any) => x.QuestionID === question.ID
              );
              const questionPage = idx + 1;

              return (
                <tr
                  key={question.ID}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    <Link href={`${questionPath}/${questionPage}`}>
                      {questionPage}
                    </Link>
                  </th>
                  <td className="px-6 py-4">
                    <Link href={`${questionPath}/${questionPage}`}>
                      {questionAnswer?.Answer || "_"}
                    </Link>
                    &nbsp;
                    {isSubmitted ? (
                      question.CorrectAnswer === questionAnswer?.Answer ? (
                        <DoneIcon color="success" />
                      ) : (
                        <>
                          <CloseIcon color="error" />
                          &nbsp;{" "}
                          <span className="text-red-500 font-medium text-md">
                            {question.CorrectAnswer}
                          </span>
                        </>
                      )
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
