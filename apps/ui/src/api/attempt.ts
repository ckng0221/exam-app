const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:8000";

export interface IAttempt {
  ID: string;
  Score: number;
  UserID: number;
  TopicID: number;
  IsSubmitted: boolean;
  IsPass: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  SubmitDate: string;
  ScorePercentage: number;
}

export interface IAttemptAnswer {
  ID: string;
  AttemptID: string;
  QuestionID: string;
  Answer: string;
}

export async function getAttempts(
  queryParams?: any,
): Promise<IAttempt[] | undefined> {
  try {
    const endpoint = `${BACKEND_HOST}/attempts?`;
    const res = await fetch(endpoint + new URLSearchParams(queryParams), {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function getAttemptById(
  attemptId: string,
): Promise<IAttempt | undefined> {
  try {
    const endpoint = `${BACKEND_HOST}/attempts/${attemptId}`;
    const res = await fetch(endpoint, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function getAttemptAnswerByQuestionId(
  attemptId: string,
  questionId: string,
) {
  try {
    const endpoint = `${BACKEND_HOST}/attempts/${attemptId}/answers?`;

    const res = await fetch(
      endpoint +
        new URLSearchParams({
          questionid: questionId,
        }),
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      const data: IAttemptAnswer[] = await res.json();
      return data[0]?.Answer;
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function getAttemptAnswers(
  attemptId: string,
): Promise<IAttemptAnswer[] | undefined> {
  try {
    const endpoint = `${BACKEND_HOST}/attempts/${attemptId}/answers`;
    const res = await fetch(endpoint, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function createAttempts(
  topicID: string,
  access_token: string,
): Promise<IAttempt[] | undefined> {
  try {
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
    if (res.ok) {
      const attempts = await res.json();
      return attempts;
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function submitAnswer(
  attemptId: string,
): Promise<IAttemptAnswer | undefined> {
  try {
    const endpoint = `${BACKEND_HOST}/attempts/${attemptId}/submit`;
    const res = await fetch(endpoint, {
      method: "POST",
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function createOrUpdateAnswer(
  attemptId: string,
  questionId: string,
  answer: string,
): Promise<IAttemptAnswer | undefined> {
  try {
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
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}
