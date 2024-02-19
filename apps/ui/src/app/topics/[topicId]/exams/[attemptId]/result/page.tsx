import React from "react";
import { getAttemptById } from "@/api/attempt";
import LocalDatetime from "@/components/LocalDate";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: { topicId: string; attemptId: string };
}) {
  const attempt = await getAttemptById(params.attemptId);

  const reviewPath = `/topics/${params.topicId}/exams/${params.attemptId}/review`;

  return (
    <div className="p-4 px-16">
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
        </p>
      </div>
      <div className="my-4">
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={reviewPath}
        >
          Review
        </Link>
      </div>
    </div>
  );
}
