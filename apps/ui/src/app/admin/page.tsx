import { Forbidden, Unauthorized } from "@/components/error/ErrorComp";
import { getTopics } from "../../api/question";
import { getUserByCookie } from "../../utils/common";
import { TopicTable } from "./TopicTable";

export default async function Admin() {
  const user = await getUserByCookie();
  if (!user) return <Unauthorized />;
  if (user.Role !== "admin") return <Forbidden />;

  const topics = await getTopics();

  return (
    <div className="p-4">
      <div className="mb-4 font-bold">Admin Page</div>
      <TopicTable topics={topics} />
    </div>
  );
}
