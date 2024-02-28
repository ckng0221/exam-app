const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:8000";

export interface IAttempt {
  ID: string;
  Score: number;
  UserID: number;
  TopicID: number;
  IsSubmitted: boolean;
  IsPass: boolean;
}

export interface IAttemptAnswer {
  ID: string;
  AttemptID: string;
  QuestionID: string;
  Answer: string;
}

export async function getAttempts(queryParams?: any) {
  const endpoint = `${BACKEND_HOST}/attempts?`;
  const res = await fetch(endpoint + new URLSearchParams(queryParams), {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function getAttemptById(attemptId: string) {
  const endpoint = `${BACKEND_HOST}/attempts/${attemptId}`;
  const res = await fetch(endpoint, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function getAttemptAnswerByQuestionId(
  attemptId: string,
  questionId: string
) {
  const endpoint = `${BACKEND_HOST}/attempts/${attemptId}/answers?`;
  const res = await fetch(
    endpoint +
      new URLSearchParams({
        questionid: questionId,
      }),
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data[0]?.Answer;
}

export async function getAttemptAnswers(attemptId: string) {
  const endpoint = `${BACKEND_HOST}/attempts/${attemptId}/answers`;
  const res = await fetch(endpoint, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function createAttempts(topicID: string, access_token: string) {
  if (!topicID) throw "TopicID cannot be null";

  const headers = new Headers();
  headers.append("Cookie", `Authorization=${access_token}`);
  headers.append("Content-Type", "application/json");

  const endpoint = `${BACKEND_HOST}/attempts`;

  const res = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify([
      {
        TopicId: Number(topicID),
      },
    ]),
    headers,
  });
  const attempts = await res.json();
  return attempts;
}

export async function submitAnswer(attemptId: string) {
  const endpoint = `${BACKEND_HOST}/attempts/${attemptId}/submit`;
  const res = await fetch(endpoint, {
    method: "POST",
  });
  const data = await res.json();
  return data;
}

export async function createOrUpdateAnswer(
  attemptId: string,
  questionId: string,
  answer: string
) {
  const endpoint = `${BACKEND_HOST}/attempt-answers`;
  const payload = JSON.stringify({
    AttemptID: Number(attemptId),
    QuestionID: Number(questionId),
    Answer: answer,
  });
  const res = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  const data = await res.json();
  return data;
}
