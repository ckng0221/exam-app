import { getTopics } from "../../api/question";
import { TopicTable } from "./TopicTable";

export default async function Admin() {
  const topics = await getTopics();

  return (
    <div className="p-4">
      <div className="mb-4 font-bold">Admin Page</div>
      <TopicTable topics={topics} />
    </div>
  );
}
