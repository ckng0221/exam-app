import { useRouter } from "next/navigation";
import React from "react";
import DeleteIconBtn from "../../../../../components/DeleteIconBtn";
import { deleteQuestionAction } from "../../../../actions/topicActions";

interface IProps {
  topicId: string;
  questionId: string;
  question: string;
}

export default function DeleteQuestionIconBtn({
  topicId,
  questionId,
  question,
}: IProps) {
  const router = useRouter();
  async function handleConfirmDelete() {
    await deleteQuestionAction(topicId, questionId);
    router.push(`/admin/topics/${topicId}/questions`);
    setOpenModal(false);
  }
  const [openModal, setOpenModal] = React.useState(false);

  const description = () => (
    <>
      Are you sure to delete{" "}
      <b>
        Question ID: {questionId} - {question}{" "}
      </b>
      ?
    </>
  );

  return (
    <>
      <DeleteIconBtn
        handleDeleteClick={() => setOpenModal(true)}
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Delete Question"
        description={description()}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
