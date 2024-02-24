import { getAttemptById } from "@/api/attempt";
import { LocalDatetime } from "@/components/LocalDate";
import Link from "next/link";
import Badge from "../../../../../../components/Badge";

export default async function page({
  params,
}: {
  params: { topicId: string; attemptId: string };
}) {
  const attempt = await getAttemptById(params.attemptId);
  const reviewPath = `/topics/${params.topicId}/exams/${params.attemptId}/review`;
  const questionPath = `/topics/${params.topicId}/exams/${params.attemptId}/questions/1`;
  const passOrFail = attempt.IsPass ? "Pass" : "Fail";
  const badgeColor = passOrFail === "Pass" ? "green" : "red";

  return (
    <div className="p-4 px-16">
      {attempt.IsSubmitted && (
        <div>
          Your result:
          <div className="mt-4">
            <p>
              Submission date:{" "}
              <b>
                <LocalDatetime utcDatetime={attempt.SubmitDate} />
              </b>
            </p>
            <p>
              Final Score: <b>{attempt.Score}</b>
              &nbsp;({attempt.ScorePercentage}%)
            </p>
            <p>
              Status: <Badge color={badgeColor} content={passOrFail} />
            </p>
          </div>
        </div>
      )}
      <div className="my-4">
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={reviewPath}
        >
          Review Summary
        </Link>
        <br />
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={questionPath}
        >
          Review Questions
        </Link>
      </div>
    </div>
  );
}
