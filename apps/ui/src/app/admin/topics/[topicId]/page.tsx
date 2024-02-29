import { getTopicById } from "../../../../api/topic";
import TopicForm from "./TopicForm";
import ActiveLastBreadcrumb from "../../../../components/BeadCrumb";
import { getUserByCookie } from "../../../../utils/common";
import {
  Forbidden,
  Unauthorized,
} from "../../../../components/error/ErrorComp";
import { Link } from "@mui/material";
import nextLink from "next/link";

export default async function TopicEditPage({
  params,
}: {
  params: { topicId: string };
}) {
  // Admin check
  const user = await getUserByCookie();
  if (!user) return <Unauthorized />;
  if (user.Role !== "admin") return <Forbidden />;

  const topic = await getTopicById(params.topicId);
  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Topics", href: "/admin/topics" },
    { name: params.topicId, href: `/admin/topics/${params.topicId}` },
  ];

  return (
    <div className="p-4">
      <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
      <TopicForm isNew={false} topic={topic} />
      <UpdateQuestions topicId={params.topicId} />
    </div>
  );
}

function UpdateQuestions({ topicId }: { topicId: string }) {
  const path = `/admin/topics/${topicId}/questions`;
  return (
    <div className="max-w-sm mx-auto">
      <Link href={path} component={nextLink}>
        Update Questions
      </Link>
    </div>
  );
}
