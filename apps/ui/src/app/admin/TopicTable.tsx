"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { ITopic } from "../../api/question";
import { useRouter } from "next/navigation";
import Modal from "../../components/Modal";
import { useState, ReactNode } from "react";
import { deleteTopicAction } from "../actions/topicActions";

interface IProps {
  topics: ITopic[];
}

export function TopicTable({ topics }: IProps) {
  const router = useRouter();
  const [currentTopicId, setCurrentTopicId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState<ReactNode>("");
  function deleteTopicClick(topicId: string, topicName: string) {
    setOpenModal(true);
    setCurrentTopicId(topicId);
    setDescription(() => (
      <>
        Are you sure to delete{" "}
        <b>
          Topic ID: {topicId} - {topicName}{" "}
        </b>
        ?
      </>
    ));
  }
  async function handleConfirmDelete() {
    await deleteTopicAction(currentTopicId);
    setOpenModal(false);
    setCurrentTopicId("");
  }

  return (
    <div className="relative overflow-x-auto">
      <h1 className="mb-2 font-bold">Topics</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
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
                  {topic.Name}
                </th>
                <td className="py-4">{topic.Description}</td>
                <td className="py-4">{topic.PassPercentage}</td>
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
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => {
                      deleteTopicClick(topic.ID, topic.Name);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Delete topic"
        description={description}
        confirmAction={handleConfirmDelete}
      />
    </div>
  );
}
