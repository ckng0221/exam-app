"use server";

import {
  createOptions,
  createTopics,
  deleteOptionById,
  deleteTopicById,
  updateOptionById,
  updateQuestionById,
  updateTopicById,
} from "../../api/question";
import { revalidateLayout, revalidatePage } from "./revalidateActions";

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
  const questionNumber = Number(formData.get("question-number")?.toString());
  const question = formData.get("question-input")?.toString();
  const correctAnswer = formData.get("correct-answer")?.toString();
  const questionScore = Number(formData.get("question-score")?.toString());

  console.log(formData);

  const questionPayload = {
    QuestionNumber: questionNumber,
    Question: question,
    CorrectAnswer: correctAnswer,
    QuestionScore: questionScore,
  };
  if (!questionId) return { message: "Question ID not found" };
  const data = await updateQuestionById(questionId, questionPayload);

  let optionData = Array.from(formData.entries());
  optionData = optionData.filter((x) => String(x[0]).startsWith("optionid"));

  // delete options
  const removedOptions = JSON.parse(
    formData.get("removed-options")?.toString() || ""
  );
  removedOptions.map(async (option: { id: string }) => {
    if (!option.id) return;
    await deleteOptionById(option.id);
  });

  // Update options
  const rowArray = optionData.map((option) =>
    Number(option[0].split("-rowidx-")[1])
  );
  const totalRows = Math.max(...rowArray);

  for (let i = 0; i < totalRows + 1; i++) {
    const optionRowData = optionData.filter((x) =>
      String(x[0]).endsWith(`-rowidx-${i}`)
    );

    const key = optionRowData[0];
    // const value = optionRowData[1];
    const optionId = String(key).split("-")[1];

    const optionCode = optionRowData.find((x) =>
      String(x[0]).includes("optioncode")
    )?.[1];
    const description = optionRowData.find((x) =>
      String(x[0]).includes("description")
    )?.[1];

    let payload: any = {
      QuestionID: Number(questionId),
    };
    if (optionCode) {
      payload["OptionCode"] = optionCode;
    }
    if (description) {
      payload["Description"] = description;
    }

    // ID starts with 'new' is new uncreated option
    if (!optionId.startsWith("new")) {
      // update option
      await updateOptionById(optionId, payload);
    } else {
      // create new option
      // console.log(optionId);
      if (optionCode || description) {
        await createOptions([payload]);
      }
    }
  }

  await revalidateLayout();

  if (data.status === 200) {
    return { message: "success" };
  } else {
    return { message: "error" };
  }
}
