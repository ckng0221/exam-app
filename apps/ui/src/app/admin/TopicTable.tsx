"use client";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ITopic } from "../../api/question";
import Badge from "../../components/Badge";
import DeleteTopicIconBtn from "./topic/DeleteTopicIconBtn";

interface IProps {
  topics: ITopic[];
}

export function TopicTable({ topics }: IProps) {
  const router = useRouter();

  return (
    <div className="relative overflow-x-auto">
      <h1 className="mb-2 font-bold">Topics</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3">
              ID
            </th>
            <th scope="col" className="py-3">
              Topic Name
            </th>
            <th scope="col" className="py-3">
              Description
            </th>
            <th scope="col" className="py-3">
              Passing Percentage (%)
            </th>
            <th scope="col" className="py-3">
              Published
            </th>
            <th scope="col" className="py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => {
            const editPath = `/admin/topic/${topic.ID}`;

            return (
              <tr
                key={topic.ID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {topic.ID}
                </th>
                <th
                  scope="row"
                  className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {topic.Name}
                </th>
                <td className="py-4">{topic.Description}</td>
                <td className="py-4">{topic.PassPercentage}</td>
                <td className="py-4">
                  {topic.IsPublished ? (
                    <Badge content="True" color="green" />
                  ) : (
                    <Badge content="False" color="red" />
                  )}
                </td>
                <td className="py-4">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => {
                      router.push(editPath);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <DeleteTopicIconBtn
                    topicId={topic.ID || ""}
                    topicName={topic.Name}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        onClick={() => {
          router.push("/admin/topic/create");
        }}
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Create Topic
      </button>
    </div>
  );
}
