import { getTopicById } from "../../../../api/question";
import TopicForm from "./TopicForm";
import ActiveLastBreadcrumb from "../../../../components/BeadCrumb";

export default async function TopicEditPage({
  params,
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicById(params.topicId);
  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Topic", href: "/admin" },
    { name: params.topicId, href: `/admin/topic/${params.topicId}` },
  ];

  return (
    <div className="p-4">
      <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
      <TopicForm isNew={false} topic={topic} />
    </div>
  );
}
