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
  try {
    const endpoint = `${BACKEND_HOST}/topics?`;
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

export async function createTopics(body: ITopic[]) {
  try {
    const payload = JSON.stringify(body);

    const endpoint = `${BACKEND_HOST}/topics`;
    const res = await fetch(endpoint, {
      body: payload,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getTopicById(
  topicId: string,
  queryParams?: any,
): Promise<ITopic | undefined> {
  try {
    const endpoint = `${BACKEND_HOST}/topics/${topicId}?`;
    const res = await fetch(endpoint + new URLSearchParams(queryParams), {
      cache: "no-cache",
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

export async function deleteTopicById(topicId: string) {
  try {
    const endpoint = `${BACKEND_HOST}/topics/${topicId}`;
    const res = await fetch(endpoint, { method: "DELETE" });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTopicById(topicId: string, body: ITopic) {
  try {
    const endpoint = `${BACKEND_HOST}/topics/${topicId}`;
    const payload = JSON.stringify(body);
    const res = await fetch(endpoint, {
      method: "PATCH",
      body: payload,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function createQuestions(body: ITopicQuestionCreate[]) {
  try {
    const payload = JSON.stringify(body);

    const endpoint = `${BACKEND_HOST}/topic-questions`;
    const res = await fetch(endpoint, {
      body: payload,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getTotalQuestion(topicId: string) {
  try {
    const endpoint = `${BACKEND_HOST}/topics/${topicId}/questions/count`;
    const res = await fetch(endpoint, { cache: "no-cache" });
    if (res.ok) {
      const totalQuestions = await res.json();
      return totalQuestions;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getAllQuestionsByTopic(
  topicId: string,
  queryParams?: any,
) {
  try {
    const endpoint = `${BACKEND_HOST}/topics/${topicId}/questions?`;
    const res = await fetch(endpoint + new URLSearchParams(queryParams), {
      cache: "no-cache",
    });
    if (res.ok) {
      const questions: ITopicQuestion[] = await res.json();
      return questions;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestionById(questionId: string) {
  try {
    const endpoint = `${BACKEND_HOST}/topic-questions/${questionId}`;
    const res = await fetch(endpoint, { method: "GET" });
    if (res.ok) {
      const data: ITopicQuestion = await res.json();
      return data;
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestionDetails(
  topicId: string,
  questionPage: string,
) {
  const endpoint = `${BACKEND_HOST}/topics/${topicId}/questions?`;

  try {
    const res = await fetch(
      endpoint +
        new URLSearchParams({
          page: questionPage,
          "page-size": "1",
        }),
      { cache: "no-cache" },
    );
    if (res.ok) {
      const questions: ITopicQuestion[] = await res.json();
      const question = questions[0];

      const questionId = question?.ID;

      const questionDetailsEndpoint = `${BACKEND_HOST}/topic-questions/${questionId}`;
      const questRes = await fetch(questionDetailsEndpoint, {
        cache: "no-cache",
      });
      if (questRes.ok) {
        const questionDetail = await questRes.json();
        return { questionId, question, questionDetail };
      }
      console.error("HTTP status failed");
      console.error(questRes.status, questRes.statusText);
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestionDetailsSafe(
  topicId: string,
  questionPage: string,
) {
  try {
    const endpoint = `${BACKEND_HOST}/topics/${topicId}/questions?`;

    const res = await fetch(
      endpoint +
        new URLSearchParams({
          page: questionPage,
          "page-size": "1",
        }),
      { cache: "no-cache" },
    );
    if (res.ok) {
      const questions = await res.json();
      const question = questions[0];
      const questionId = question.ID;

      const questionDetailsEndpoint = `${BACKEND_HOST}/topic-questions-safe/${questionId}`;
      const questRes = await fetch(questionDetailsEndpoint, {
        cache: "no-cache",
      });
      if (questRes.ok) {
        const questionDetail = await questRes.json();

        return { questionId, question, questionDetail };
      }
      console.error("HTTP status failed");
      console.error(questRes.status, questRes.statusText);
    }
    console.error("HTTP status failed");
    console.error(res.status, res.statusText);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteQuestionById(questionId: string) {
  try {
    const endpoint = `${BACKEND_HOST}/topic-questions/${questionId}`;
    const res = await fetch(endpoint, { method: "DELETE" });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function updateQuestionById(
  questionId: string,
  body: Partial<ITopicQuestion>,
) {
  try {
    const endpoint = `${BACKEND_HOST}/topic-questions/${questionId}`;
    const payload = JSON.stringify(body);
    const res = await fetch(endpoint, {
      method: "PATCH",
      body: payload,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function updateOptionById(
  optionId: string,
  body: Partial<ITopicQuestionOption>,
) {
  try {
    const endpoint = `${BACKEND_HOST}/question-options/${optionId}`;
    const payload = JSON.stringify(body);
    const res = await fetch(endpoint, {
      method: "PATCH",
      body: payload,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteOptionById(optionId: string) {
  try {
    const endpoint = `${BACKEND_HOST}/question-options/${optionId}`;
    const res = await fetch(endpoint, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function createOptions(body: Partial<ITopicQuestionOption[]>) {
  try {
    const endpoint = `${BACKEND_HOST}/question-options`;
    const payload = JSON.stringify(body);
    const res = await fetch(endpoint, {
      method: "POST",
      body: payload,
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}
