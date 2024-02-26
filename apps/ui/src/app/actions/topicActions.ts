"use server";

import {
  createTopics,
  deleteTopicById,
  updateOptionById,
  updateQuestionById,
  updateTopicById,
} from "../../api/question";
import { revalidatePage } from "./revalidateActions";

export async function deleteTopicAction(topicId: string) {
  if (!topicId) return;
  await deleteTopicById(topicId);
  revalidatePage("/admin");
}

function getTopicFormInputs(formData: FormData) {
  const topicId = formData.get("topicid")?.toString();
  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const isPublished = formData.get("publish") ? true : false;
  const passPercentage =
    Number(formData.get("pass-percentage")?.toString()) || 0;

  const payload = {
    Name: name,
    Description: description,
    IsPublished: isPublished,
    PassPercentage: passPercentage,
  };

  return { topicId, payload };
}

export async function updateTopicAction(formData: FormData) {
  const { topicId, payload } = getTopicFormInputs(formData);

  if (!topicId) throw "TopicId required";

  const res = await updateTopicById(topicId, payload);
  if (res.ok) {
    revalidatePage("/admin");
    return { message: "success" };
  } else {
    return { message: "error" };
  }
}

export async function createTopicAction(formData: FormData) {
  const { payload } = getTopicFormInputs(formData);

  const res = await createTopics([payload]);
  if (res.ok) {
    revalidatePage("/admin");
    return { message: "success" };
  } else {
    return { message: "error" };
  }
}

export async function updateAdminQuestionsAction(formData: FormData) {
  const questionId = formData.get("question-id")?.toString();
  const question = formData.get("question-input")?.toString();
  const correctAnswer = formData.get("correct-answer")?.toString();
  const questionScore = Number(formData.get("question-score")?.toString());

  console.log(formData);

  const questionPayload = {
    Question: question,
    CorrectAnswer: correctAnswer,
    QuestionScore: questionScore,
  };
  if (!questionId) return { message: "Question ID not found" };
  const data = await updateQuestionById(questionId, questionPayload);

  for (const [key, value] of formData.entries()) {
    if (String(key).startsWith("optionid")) {
      const optionId = String(key).split("optionid-")[1];
      const payload = {
        Description: value.toString(),
      };
      await updateOptionById(optionId, payload);
    }
  }

  if (data.status === 200) {
    return { message: "success" };
  } else {
    return { message: "error" };
  }
}
