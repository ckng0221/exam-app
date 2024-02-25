const BASE_URL = "http://localhost:8000";

export interface ITopic {
  ID?: string;
  Name: string;
  Description: string;
  PassPercentage: number;
  IsPublished: boolean;
}
export interface ITopicQuestion {
  ID: string;
  Question: string;
  QuestionNumber: string;
  CorrectAnswer: string;
  QuestionScore: number;
  TopicID: string;
}

export async function getTopics() {
  const endpoint = `${BASE_URL}/topics/`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const topics = await res.json();
  return topics;
}

export async function getTopicById(topicId: string) {
  const endpoint = `${BASE_URL}/topics/${topicId}`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const topic = await res.json();
  return topic;
}

export async function deleteTopicById(topicId: string) {
  const endpoint = `${BASE_URL}/topics/${topicId}`;
  const res = await fetch(endpoint, { method: "DELETE" });
  return res;
}

export async function updateTopicById(topicId: string, body: ITopic) {
  const endpoint = `${BASE_URL}/topics/${topicId}`;
  const payload = JSON.stringify(body);
  const res = await fetch(endpoint, {
    method: "PATCH",
    body: payload,
    headers: { "Content-Type": "application/json" },
  });
  return res;
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

export async function getQuestionDetailsSafe(
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

  const questionDetailsEndpoint = `${BASE_URL}/topic-questions-safe/${questionId}`;
  const questRes = await fetch(questionDetailsEndpoint, {
    cache: "no-cache",
  });
  const questionDetail = await questRes.json();

  return { questionId, question, questionDetail };
}
