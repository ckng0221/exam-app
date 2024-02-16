export default async function Topic({
  params,
}: {
  params: { topicId: string };
}) {
  const BASE_URL = "http://localhost:8000";
  const endpoint = `${BASE_URL}/topics/${params.topicId}`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const topic = await res.json();

  const questionCount = topic.TopicQuestions?.length || 0;

  return (
    <div className="p-4">
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
      </div>

      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Start Exam Now
      </button>
    </div>
  );
}
