import { ITopicQuestion, getAllQuestionsByTopic } from "@/api/question";
import ActiveLastBreadcrumb from "../../../../../components/BeadCrumb";
import { updateAdminQuestionsAction } from "../../../../actions/topicActions";
import NextLink from "next/link";
import { Link } from "@mui/material";

async function QuestionsAdminPage({ params }: { params: { topicId: string } }) {
  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Topics", href: "/admin" },
    { name: params.topicId, href: `/admin/topics/${params.topicId}` },
    { name: "Questions", href: `/admin/topics/${params.topicId}/questions` },
  ];

  const questions = await getAllQuestionsByTopic(params.topicId);

  return (
    <div className="p-4">
      <div className="mb-4">
        <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <Questions topicId={params.topicId} questions={questions} />
    </div>
  );
}

export default QuestionsAdminPage;

function Questions({
  topicId,
  questions,
}: {
  topicId: string;
  questions: ITopicQuestion[];
}) {
  return (
    <form action={updateAdminQuestionsAction}>
      {questions.map((question) => {
        return (
          <Question topicId={topicId} key={question.ID} question={question} />
        );
      })}
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
      >
        Add Question
      </button>
    </form>
  );
}

function Question({
  topicId,
  question,
}: {
  topicId: string;
  question: ITopicQuestion;
}) {
  const path = `/admin/topics/${topicId}/questions/${question.QuestionNumber}`;

  return (
    <div className="mb-4">
      <Link href={path} component={NextLink}>
        Question:&nbsp;
        {question.QuestionNumber}
      </Link>
    </div>
  );
}
