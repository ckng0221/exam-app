"use server";

import {
  createTopics,
  deleteTopicById,
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
