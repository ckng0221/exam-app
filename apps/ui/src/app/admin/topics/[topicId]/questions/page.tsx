import { ITopicQuestion, getAllQuestionsByTopic } from "@/api/topic";
import { Link } from "@mui/material";
import NextLink from "next/link";
import ActiveLastBreadcrumb from "../../../../../components/BeadCrumb";
import AddQuestionBtn from "./AddQuestionBtn";

async function QuestionsAdminPage({ params }: { params: { topicId: string } }) {
  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Topics", href: "/admin/topics" },
    { name: params.topicId, href: `/admin/topics/${params.topicId}` },
    { name: "Questions", href: `/admin/topics/${params.topicId}/questions` },
  ];

  const questions = await getAllQuestionsByTopic(params.topicId);
  if (questions == undefined) throw "Failed to fetch getAllQuestionsByTopic";

  return (
    <div className="p-4">
      <div className="mb-4">
        <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <QuestionLinks topicId={params.topicId} questions={questions} />
    </div>
  );
}

export default QuestionsAdminPage;

function QuestionLinks({
  topicId,
  questions,
}: {
  topicId: string;
  questions: ITopicQuestion[];
}) {
  return (
    <>
      {questions.map((question, idx) => {
        return (
          <QuestionLink
            idx={idx}
            topicId={topicId}
            key={question.ID}
            question={question}
          />
        );
      })}
      <AddQuestionBtn topicId={topicId} />
    </>
  );
}

function QuestionLink({
  idx,
  topicId,
  question,
}: {
  idx: number;
  topicId: string;
  question: ITopicQuestion;
}) {
  const path = `/admin/topics/${topicId}/questions/${question.ID}`;

  return (
    <div className="mb-4">
      <Link href={path} component={NextLink}>
        {idx + 1}) Question ID:&nbsp;
        {question.ID}
      </Link>
    </div>
  );
}
