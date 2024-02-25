"use server";

import { deleteTopicById, updateTopicById } from "../../api/question";
import { revalidatePage } from "./revalidateActions";

export async function deleteTopicAction(topicId: string) {
  if (!topicId) return;
  await deleteTopicById(topicId);
  revalidatePage("/admin");
}

export async function updateTopicAction(formData: FormData) {
  const topicId = formData.get("topicid")?.toString();
  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const isPublished = formData.get("publish") ? true : false;
  const passPercentage =
    Number(formData.get("pass-percentage")?.toString()) || 0;

  if (!topicId) throw "TopicId required";

  const payload = {
    Name: name,
    Description: description,
    IsPublished: isPublished,
    PassPercentage: passPercentage,
  };

  const res = await updateTopicById(topicId, payload);
  if (res.ok) {
    revalidatePage("/admin");
    return { message: "success" };
  } else {
    return { message: "error" };
  }
}
