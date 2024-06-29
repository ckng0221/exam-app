import { getQuestionById } from "@/api/topic";
import ActiveLastBreadcrumb from "@/components/BeadCrumb";
import Question from "./Question";

export default async function AdminQuestionPage({
  params,
}: {
  params: { topicId: string; questionId: string };
}) {
  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Topics", href: "/admin/topics" },
    { name: params.topicId, href: `/admin/topics/${params.topicId}` },
    { name: "Questions", href: `/admin/topics/${params.topicId}/questions` },
    {
      name: params.questionId,
      href: `/admin/topics/${params.topicId}/questions/${params.questionId}`,
    },
  ];
  // const { questionDetail } = await getQuestionDetails(
  //   params.topicId,
  //   params.questionNumber
  // );
  const question = await getQuestionById(params.questionId);
  if (question == undefined) throw "Failed to fetch getQuestionById";

  return (
    <>
      <div className="p-4">
        <div className="mb-4">
          <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <Question topicId={params.topicId} defaultQuestion={question} />
      </div>
    </>
  );
}
