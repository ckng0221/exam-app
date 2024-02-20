const BASE_URL = "http://localhost:8000";

export interface IAttempt {
  ID: string;
  Score: number;
  UserID: number;
  TopicID: number;
  IsSubmitted: boolean;
}

export interface IAttemptAnswer {
  ID: string;
  AttemptID: string;
  QuestionID: string;
  Answer: string;
}

export async function getAttempts(queryParams?: any) {
  const endpoint = `${BASE_URL}/attempts?`;
  const res = await fetch(endpoint + new URLSearchParams(queryParams), {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function getAttemptById(attemptId: string) {
  const endpoint = `${BASE_URL}/attempts/${attemptId}`;
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
  const endpoint = `${BASE_URL}/attempts/${attemptId}/answers?`;
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
  const endpoint = `${BASE_URL}/attempts/${attemptId}/answers`;
  const res = await fetch(endpoint, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function submitAnswer(attemptId: string) {
  const endpoint = `${BASE_URL}/attempts/${attemptId}/submit`;
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
  const endpoint = `${BASE_URL}/attempt-answers`;
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
