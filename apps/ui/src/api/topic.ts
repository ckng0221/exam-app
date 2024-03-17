const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:8000";

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
  CorrectAnswer: string;
  QuestionScore: number;
  TopicID: string;
  QuestionOptions: ITopicQuestionOption[];
}

export interface ITopicQuestionCreate {
  Question: string;
  CorrectAnswer: string;
  QuestionScore: number;
  TopicID: number;
}

export interface ITopicQuestionOption {
  ID: string;
  OptionCode: string;
  Description: string;
}

export async function getTopics(queryParams?: any) {
  const endpoint = `${BACKEND_HOST}/topics?`;
  const res = await fetch(endpoint + new URLSearchParams(queryParams), {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function createTopics(body: ITopic[]) {
  const payload = JSON.stringify(body);

  const endpoint = `${BACKEND_HOST}/topics`;
  const res = await fetch(endpoint, {
    body: payload,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-cache",
  });
  return res;
}

export async function getTopicById(topicId: string, queryParams?: any) {
  const endpoint = `${BACKEND_HOST}/topics/${topicId}?`;
  const res = await fetch(endpoint + new URLSearchParams(queryParams), {
    cache: "no-cache",
  });
  const topic = await res.json();
  return topic;
}

export async function deleteTopicById(topicId: string) {
  const endpoint = `${BACKEND_HOST}/topics/${topicId}`;
  const res = await fetch(endpoint, { method: "DELETE" });
  return res;
}

export async function updateTopicById(topicId: string, body: ITopic) {
  const endpoint = `${BACKEND_HOST}/topics/${topicId}`;
  const payload = JSON.stringify(body);
  const res = await fetch(endpoint, {
    method: "PATCH",
    body: payload,
    headers: { "Content-Type": "application/json" },
  });
  return res;
}

export async function createQuestions(body: ITopicQuestionCreate[]) {
  const payload = JSON.stringify(body);

  const endpoint = `${BACKEND_HOST}/topic-questions`;
  const res = await fetch(endpoint, {
    body: payload,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-cache",
  });
  return res;
}

export async function getTotalQuestion(topicId: string) {
  const endpoint = `${BACKEND_HOST}/topics/${topicId}/questions/count`;
  const res = await fetch(endpoint, { cache: "no-cache" });
  const totalQuestions = await res.json();
  return totalQuestions;
}

export async function getAllQuestionsByTopic(
  topicId: string,
  queryParams?: any,
) {
  const endpoint = `${BACKEND_HOST}/topics/${topicId}/questions?`;
  const res = await fetch(endpoint + new URLSearchParams(queryParams), {
    cache: "no-cache",
  });
  const questions = await res.json();
  return questions;
}

export async function getQuestionById(questionId: string) {
  const endpoint = `${BACKEND_HOST}/topic-questions/${questionId}`;
  const res = await fetch(endpoint, { method: "GET" });
  const data = await res.json();
  return data;
}

export async function getQuestionDetails(
  topicId: string,
  questionPage: string,
) {
  const endpoint = `${BACKEND_HOST}/topics/${topicId}/questions?`;

  const res = await fetch(
    endpoint +
      new URLSearchParams({
        page: questionPage,
        "page-size": "1",
      }),
    { cache: "no-cache" },
  );
  const questions = await res.json();
  const question = questions[0];

  const questionId = question?.ID;

  const questionDetailsEndpoint = `${BACKEND_HOST}/topic-questions/${questionId}`;
  const questRes = await fetch(questionDetailsEndpoint, {
    cache: "no-cache",
  });
  const questionDetail = await questRes.json();

  return { questionId, question, questionDetail };
}

export async function getQuestionDetailsSafe(
  topicId: string,
  questionPage: string,
) {
  const endpoint = `${BACKEND_HOST}/topics/${topicId}/questions?`;

  const res = await fetch(
    endpoint +
      new URLSearchParams({
        page: questionPage,
        "page-size": "1",
      }),
    { cache: "no-cache" },
  );
  const questions = await res.json();
  const question = questions[0];
  const questionId = question.ID;

  const questionDetailsEndpoint = `${BACKEND_HOST}/topic-questions-safe/${questionId}`;
  const questRes = await fetch(questionDetailsEndpoint, {
    cache: "no-cache",
  });
  const questionDetail = await questRes.json();

  return { questionId, question, questionDetail };
}

export async function deleteQuestionById(questionId: string) {
  const endpoint = `${BACKEND_HOST}/topic-questions/${questionId}`;
  const res = await fetch(endpoint, { method: "DELETE" });
  return res;
}

export async function updateQuestionById(
  questionId: string,
  body: Partial<ITopicQuestion>,
) {
  const endpoint = `${BACKEND_HOST}/topic-questions/${questionId}`;
  const payload = JSON.stringify(body);
  const res = await fetch(endpoint, {
    method: "PATCH",
    body: payload,
    headers: { "Content-Type": "application/json" },
  });
  return res;
}

export async function updateOptionById(
  optionId: string,
  body: Partial<ITopicQuestionOption>,
) {
  const endpoint = `${BACKEND_HOST}/question-options/${optionId}`;
  const payload = JSON.stringify(body);
  const res = await fetch(endpoint, {
    method: "PATCH",
    body: payload,
    headers: { "Content-Type": "application/json" },
  });
  return res;
}

export async function deleteOptionById(optionId: string) {
  const endpoint = `${BACKEND_HOST}/question-options/${optionId}`;
  const res = await fetch(endpoint, {
    method: "DELETE",
  });
  return res;
}

export async function createOptions(body: Partial<ITopicQuestionOption[]>) {
  const endpoint = `${BACKEND_HOST}/question-options`;
  const payload = JSON.stringify(body);
  const res = await fetch(endpoint, {
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json" },
  });
  return res;
}
