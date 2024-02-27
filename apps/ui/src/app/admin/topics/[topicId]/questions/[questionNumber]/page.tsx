import { getQuestionDetails } from "@/api/question";
import ActiveLastBreadcrumb from "@/components/BeadCrumb";
import Question from "./Question";

export default async function AdminQuestionPage({
  params,
}: {
  params: { topicId: string; questionNumber: string };
}) {
  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Topics", href: "/admin" },
    { name: params.topicId, href: `/admin/topics/${params.topicId}` },
    { name: "Questions", href: `/admin/topics/${params.topicId}/questions` },
    {
      name: params.questionNumber,
      href: `/admin/topics/${params.topicId}/questions/${params.questionNumber}`,
    },
  ];
  const { questionDetail } = await getQuestionDetails(
    params.topicId,
    params.questionNumber
  );

  return (
    <>
      <div className="p-4">
        <div className="mb-4">
          <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <Question question={questionDetail} />
      </div>
    </>
  );
}
