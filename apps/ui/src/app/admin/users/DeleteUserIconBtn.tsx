import React from "react";
import DeleteIconBtn from "../../../components/DeleteIconBtn";

import { useRouter } from "next/navigation";
import { deleteUserAction } from "../../actions/userActions";
import { toast } from "react-hot-toast";

interface IProps {
  userId: string;
  userName: string;
}

export default function DeleteUserIconBtn({ userId, userName }: IProps) {
  const router = useRouter();
  async function handleConfirmDelete() {
    const res = await deleteUserAction(userId);
    if (res?.message === "success") {
      toast.success(`Deleted user ID ${userId}: ${userName} `);
      router.push("/admin/users");
    } else {
      toast.error(res?.message || "");
    }
    setOpenModal(false);
  }
  const [openModal, setOpenModal] = React.useState(false);

  const description = () => (
    <>
      Are you sure to delete{" "}
      <b>
        User ID: {userId} - {userName}{" "}
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
        title="Delete User"
        description={description()}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
