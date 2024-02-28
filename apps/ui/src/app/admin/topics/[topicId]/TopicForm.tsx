"use client";
import { ITopic } from "@/api/topic";
import {
  createTopicAction,
  updateTopicAction,
} from "@/app/actions/topicActions";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DeleteTopicIconBtn from "../DeleteTopicIconBtn";

export default function TopicForm({
  topic,
  isNew = false,
}: {
  topic: ITopic;
  isNew: boolean;
}) {
  const inputClassName =
    "disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const [topicInput, setTopicInput] = useState<ITopic>(topic);
  const router = useRouter();

  async function handleUpdate(formData: FormData) {
    const res = await updateTopicAction(formData);
    if (res.message === "success") {
      toast.success("Topic updated!");
      router.push("/admin");
    } else {
      toast.error(res.message);
    }
  }
  async function handleCreate(formData: FormData) {
    const res = await createTopicAction(formData);
    if (res.message === "success") {
      toast.success("Topic Created!");
      router.push("/admin");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <form className="mb-4" action={isNew ? handleCreate : handleUpdate}>
        <div>
          <div className="grid grid-cols-2 mb-4">
            <div>
              <p className="font-bold">Topic</p>
            </div>
            {!isNew && (
              <div className="justify-self-end">
                <DeleteTopicIconBtn
                  topicId={topic.ID || ""}
                  topicName={topic.Name}
                />
              </div>
            )}
          </div>

          {!isNew && (
            <div className="mb-5">
              <label
                htmlFor="topicid"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ID
              </label>
              <input
                type="text"
                id="topicid"
                value={topicInput.ID}
                className={inputClassName}
                disabled
                readOnly
              />
              <input
                type="text"
                value={topicInput.ID}
                name="topicid"
                hidden
                readOnly
              />
            </div>
          )}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={topicInput.Name}
              className={inputClassName}
              name="name"
              onChange={(e) =>
                setTopicInput({ ...topicInput, Name: e.target.value })
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              className={`${inputClassName}`}
              value={topicInput.Description}
              name="description"
              onChange={(e) =>
                setTopicInput({ ...topicInput, Description: e.target.value })
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="pass-percentage"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Passing Percentage (%)
            </label>
            <input
              type="number"
              id="pass-percentage"
              value={topicInput.PassPercentage}
              className={inputClassName}
              name="pass-percentage"
              onChange={(e) =>
                setTopicInput({
                  ...topicInput,
                  PassPercentage: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="mb-5">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={topicInput.IsPublished}
                    name="publish"
                    onChange={(e) =>
                      setTopicInput({
                        ...topicInput,
                        IsPublished: e.target.checked,
                      })
                    }
                  />
                }
                label="Publish"
              />
            </FormGroup>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {isNew ? "Create" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
