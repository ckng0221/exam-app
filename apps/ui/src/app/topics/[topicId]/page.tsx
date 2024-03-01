import { redirect } from "next/navigation";
import { getTopicById, getTotalQuestion } from "../../../api/topic";
import { createAttempts } from "../../../api/attempt";
import { getAccessTokenFromCookie } from "../../../utils/common";

export default async function Topic({
  params,
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicById(params.topicId);
  const questionCount = await getTotalQuestion(params.topicId);

  // console.log(topic);

  return (
    <div className="p-8">
      <div className="mb-4">
        <p>
          Topic: <b>{topic.Name}</b>
        </p>
        <p>
          Description: <b>{topic.Description}</b>
        </p>
        <p>
          Total Questions: <b>{questionCount}</b>
        </p>
        <p>
          Passing Precentage: <b>{topic.PassPercentage} %</b>
        </p>
      </div>

      <form action={startExam}>
        <input type="hidden" name="topic_id" value={params.topicId} />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Start Exam Now
        </button>
      </form>
    </div>
  );
}

async function startExam(formData: FormData) {
  "use server";

  const topicId = formData.get("topic_id")?.toString() || "";
  const accessToken = await getAccessTokenFromCookie();

  const attempts = await createAttempts(topicId, accessToken?.value || "");

  const attemptId = attempts[0].ID;

  redirect(`/topics/${topicId}/exams/${attemptId}/questions/1`);
}
