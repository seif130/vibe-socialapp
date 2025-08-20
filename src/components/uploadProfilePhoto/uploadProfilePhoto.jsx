import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export default function UploadProfilePhoto() {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(null);
   const queryClient = useQueryClient();

  function onCloseModal() {
    setOpenModal(false);
    setPreview(null);
  }

  let { register, handleSubmit, reset } = useForm({
    defaultValues: {
      photo: '',
    }
  });

  async function handlePhoto(values) {
    let myData = new FormData();
    myData.append('photo', values.photo[0]);

    try {
      let res = await axios.put(
        'https://linked-posts.routemisr.com/users/upload-photo',
        myData,
        {
          headers: {
            token: localStorage.getItem('usertoken'),
          
          }
        }
      );

      if (res.data.message === "success") {
        toast.success('Photo changed successfully');
         queryClient.invalidateQueries({ queryKey: ['Profile'] }); 
        reset();
        onCloseModal();
      }
    } catch (err) {
      toast.error('Upload failed. Maximum file size limit is 4MB');
    }
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} >
        <i className="fa-solid fa-pen-to-square mx-1"></i> Update photo
      </Button>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit(handlePhoto)}>
            <div className="space-y-6">
              <div className="text-xl font-medium text-gray-900 dark:text-white text-center">
                Upload photo
              </div>

              <div className="flex flex-col items-center gap-3">
          
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                  />
                )}


                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("photo", {
                    required: true,
                    onChange: (e) => {
                      if (e.target.files && e.target.files[0]) {
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }
                  })}
                />

                <label htmlFor="photo" className="cursor-pointer text-blue-600 hover:text-blue-800">
                  <i className="fa-solid fa-image fa-2xl"></i>
                  <span className="ml-2">Choose photo</span>
                </label>
              </div>

              <div className="w-full flex justify-center">
                <Button type="submit">Update photo</Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
