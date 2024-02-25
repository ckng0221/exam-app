import { getTopicById } from "../../../../api/question";
import TopicForm from "./TopicForm";

export default async function TopicEditPage({
  params,
}: {
  params: { topicId: string };
}) {
  const topic = await getTopicById(params.topicId);

  return (
    <div className="p-4">
      <TopicForm topic={topic} />
    </div>
  );
}
