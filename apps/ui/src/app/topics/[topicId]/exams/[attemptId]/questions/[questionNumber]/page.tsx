export default async function ExamAttempt({
  params,
}: {
  params: { topicId: string; questionNumber: string };
}) {
  const BASE_URL = "http://localhost:8000";
  console.log(params);

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
  const questRes = await fetch(questionDetailsEndpoint, { cache: "no-cache" });
  const questionDetail = await questRes.json();
  console.log(questionDetail);

  const btnClass =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

  return (
    <div className="p-4">
      <div className="mb-4">
        <p className="">Question: {params.questionNumber}</p>
        <p>{question.Question}</p>
      </div>

      <Options options={questionDetail.QuestionOptions} />

      <div className="flex">
        <button type="button" className={btnClass}>
          Prev
        </button>
        <button type="button" className={btnClass}>
          Next
        </button>
      </div>
    </div>
  );
}

interface IOption {
  QuestionCode: string;
  Description: string;
}

function Options({ options }: { options: IOption[] }) {
  return options.map((option) => (
    <div key={option.QuestionCode} className="flex items-center mb-4">
      <input
        id={option.QuestionCode}
        type="radio"
        title={option.Description}
        value={option.QuestionCode}
        name="option-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={option.QuestionCode}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {option.Description}
      </label>
    </div>
  ));
}
