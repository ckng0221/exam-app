"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import React from "react";
import Modal from "./Modal";

interface IProps {
  handleDeleteClick: (...props: any) => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: any;
  handleConfirmDelete: () => void;
}

export default function DeleteIconBtn({
  handleDeleteClick,
  openModal,
  setOpenModal,
  title,
  description,
  handleConfirmDelete,
}: IProps) {
  return (
    <>
      <IconButton aria-label="delete" color="error" onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={title}
        description={description}
        confirmAction={handleConfirmDelete}
      />
    </>
  );
}
