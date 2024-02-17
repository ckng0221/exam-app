import React from "react";
import { getAttemptById } from "@/api/attempt";
import LocalDatetime from "@/components/LocalDate";

export default async function page({
  params,
}: {
  params: { attemptId: string };
}) {
  const attempt = await getAttemptById(params.attemptId);

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
    </div>
  );
}
