import { ITopicQuestion, getAllQuestionsByTopic } from "@/api/question";
import { Link } from "@mui/material";
import NextLink from "next/link";
import ActiveLastBreadcrumb from "../../../../../components/BeadCrumb";
import AddQuestionBtn from "./AddQuestionBtn";

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
      {questions.map((question) => {
        return (
          <QuestionLink
            topicId={topicId}
            key={question.ID}
            question={question}
          />
        );
      })}
      <AddQuestionBtn />
    </>
  );
}

function QuestionLink({
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
