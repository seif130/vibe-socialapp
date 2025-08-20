import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, TextInput, Spinner } from "flowbite-react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function UpdateComent({ id, oldContent }) { 
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); 
  let queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: '', 
    }
  });

  function onCloseModal() {
    setOpenModal(false);
  }

  

  async function handleUpdateComment(values) {
    try {
      setLoading(true); 
      let res = await axios.put(
        `https://linked-posts.routemisr.com/comments/${id}`,
        { content: values.content },
        {
          headers: {
            token: localStorage.getItem("usertoken"),
          },
        }
      );

      if (res.data.message === "success") {
        toast.success("Comment updated successfully");
        queryClient.invalidateQueries({ queryKey: ["UserPosts"] });
         queryClient.invalidateQueries({ queryKey: ["PostDetails"] });
      
        reset({ content: "" });
        onCloseModal();
      }
    } catch (err) {
      toast.error("Comment failed to update, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={() => {
          reset({ content: oldContent }); 
          setOpenModal(true);
        }}
        className="w-10 h-10 flex items-center justify-center cursor-pointer text-green-600 rounded-full shadow-md transition"
        title="Update Comment"
      >
        <i className="fa-solid fa-pen"></i>
      </button>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit(handleUpdateComment)}>
            <div className="space-y-6">
              <div>
                <TextInput
                  placeholder="Put your updated comment"
                  type="text"
                  {...register("content", { required: true })}
                />
              </div>
              <div className="w-full flex justify-center">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" light={true} /> Updating...
                    </div>
                  ) : (
                    "Update Comment"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
