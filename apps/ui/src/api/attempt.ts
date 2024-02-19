const BASE_URL = "http://localhost:8000";

export interface IAttempt {
  ID: string;
  Score: number;
  UserID: number;
  TopicID: number;
  IsSubmitted: boolean;
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
