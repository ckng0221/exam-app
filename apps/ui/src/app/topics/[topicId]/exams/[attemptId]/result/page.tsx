import { IAttempt, getAttemptById } from "@/api/attempt";
import { LocalDatetime } from "@/components/LocalDate";
import { Chip } from "@mui/material";
import Link from "next/link";

function formatElapsedTime(startDateTime: string, endDateTime: string) {
  const start = new Date(startDateTime).getTime();
  const end = new Date(endDateTime).getTime();
  const elapsedSeconds = Math.floor((end - start) / 1000);

  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  if (hours > 0) {
    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  } else if (minutes > 0) {
    return `${minutes} minutes ${seconds} seconds`;
  } else {
    return `${seconds} seconds`;
  }
}

export default async function page({
  params,
}: {
  params: { topicId: string; attemptId: string };
}) {
  const attempt: IAttempt = await getAttemptById(params.attemptId);
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
              Time spent:{" "}
              <b>{formatElapsedTime(attempt.CreatedAt, attempt.SubmitDate)}</b>
            </p>
            <p>
              Final Score: <b>{attempt.Score || 0}</b>
              &nbsp;({attempt?.ScorePercentage?.toFixed(2)}%)
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
