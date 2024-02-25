"use client";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useState } from "react";
import { ITopic } from "../../../../api/question";
import { updateTopicAction } from "../../../actions/topicActions";
import { toast } from "react-hot-toast";

export default function TopicForm({ topic }: { topic: ITopic }) {
  const inputClassName =
    "disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const [topicInput, setTopicInput] = useState<ITopic>(topic);
  async function handleUpdate(formData: FormData) {
    const res = await updateTopicAction(formData);
    if (res.message === "success") {
      toast.success("Form updated!");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <form className="mb-4" action={handleUpdate}>
        <div>
          <p className="mb-4 font-bold">Topic</p>
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
            />
            <input type="text" value={topicInput.ID} name="topicid" hidden />
          </div>
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
              defaultValue={70}
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
            Update
          </button>
        </div>
      </form>
      <div>
        <p className="mb-4 font-bold">Edit Questions</p>
      </div>
    </div>
  );
}
