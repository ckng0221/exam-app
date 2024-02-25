import { getTopics } from "../api/question";
import TopicCard from "../components/TopicCard";

export default function Home() {
  return (
    <div className="p-4">
      <Topics />
    </div>
  );
}

async function Topics() {
  const topics = await getTopics({ published: true });

  // console.log(topics);

  return (
    <div className="p-4">
      {topics.map((topic: any) => {
        return (
          <div key={topic.ID} className="mb-2">
            <TopicCard
              href={`topics/${topic.ID}`}
              title={topic.Name}
              description={topic.Description}
            />
          </div>
        );
      })}
    </div>
  );
}
