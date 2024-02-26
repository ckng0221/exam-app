import React from "react";
import DeleteIconBtn from "../../../components/DeleteIconBtn";

import { useRouter } from "next/navigation";
import { deleteTopicAction } from "../../actions/topicActions";

interface IProps {
  topicId: string;
  topicName: string;
}

export default function DeleteTopicIconBtn({ topicId, topicName }: IProps) {
  const router = useRouter();
  async function handleConfirmDelete() {
    await deleteTopicAction(topicId);
    router.push("/admin");
    setOpenModal(false);
  }
  const [openModal, setOpenModal] = React.useState(false);

  const description = () => (
    <>
      Are you sure to delete{" "}
      <b>
        Topic ID: {topicId} - {topicName}{" "}
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
        title="Delete Topic"
        description={description()}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
