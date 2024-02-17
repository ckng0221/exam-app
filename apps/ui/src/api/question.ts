const BASE_URL = "http://localhost:8000";

export async function getTotalQuestion(topicId: string) {
  const endpoint = `${BASE_URL}/topics/${topicId}/questions/count`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const totalQuestions = await res.json();
  return totalQuestions;
}

export async function getAllQuestionsByTopic(topicId: string) {
  const endpoint = `${BASE_URL}/topics/${topicId}/questions`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const questions = await res.json();
  return questions;
}
