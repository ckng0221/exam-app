const BASE_URL = "http://localhost:8000";

export interface ITopicQuestion {
  ID: string;
  Question: string;
  QuestionNumber: string;
  CorrectAnswer: string;
  QuestionScore: number;
  TopicID: string;
}

export async function getTopicById(topicId: string) {
  const endpoint = `${BASE_URL}/topics/${topicId}`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const topic = await res.json();
  return topic;
}

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

export async function getQuestionDetails(
  topicId: string,
  questionNumber: string
) {
  const endpoint = `${BASE_URL}/topics/${topicId}/questions?`;

  const res = await fetch(
    endpoint +
      new URLSearchParams({
        number: questionNumber,
      }),
    { cache: "no-cache" }
  );
  const questions = await res.json();
  const question = questions[0];
  const questionId = question.ID;

  const questionDetailsEndpoint = `${BASE_URL}/topic-questions/${questionId}`;
  const questRes = await fetch(questionDetailsEndpoint, {
    cache: "no-cache",
  });
  const questionDetail = await questRes.json();

  return { questionId, question, questionDetail };
}
