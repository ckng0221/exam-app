import { getAttemptById } from "@/api/attempt";
import { LocalDatetime } from "@/components/LocalDate";
import Link from "next/link";
import Badge from "../../../../../../components/Badge";
import { Chip } from "@mui/material";

export default async function page({
  params,
}: {
  params: { topicId: string; attemptId: string };
}) {
  const attempt = await getAttemptById(params.attemptId);
  const reviewPath = `/topics/${params.topicId}/exams/${params.attemptId}/review`;
  const questionPath = `/topics/${params.topicId}/exams/${params.attemptId}/questions/1`;
  const passOrFail = attempt.IsPass ? "Passed" : "Failed";
  const badgeColor = passOrFail === "Passed" ? "success" : "error";

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
              Final Score: <b>{attempt.Score || 0}</b>
              &nbsp;({attempt.ScorePercentage}%)
            </p>
            <span>
              Status:{" "}
              <Chip color={badgeColor} label={passOrFail} size="small" />
            </span>
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
