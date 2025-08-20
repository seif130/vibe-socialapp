import React, { useState } from 'react';
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function ChangePassword() {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  function onCloseModal() {
    setOpenModal(false);
  }

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
    }
  });

  async function handleChangePassword(values) {
    try {
      let res = await axios.patch(
        'https://linked-posts.routemisr.com/users/change-password',
        values,
        {
          headers: {
            token: localStorage.getItem('usertoken')
          }
        }
      );

      if (res.data.message === "success") {
        localStorage.setItem('usertoken', res.data.token);
        toast.success('Password changed successfully');
        queryClient.invalidateQueries({ queryKey: ['Profile'] }); 
        reset();
        onCloseModal();
      }
    } catch (err) {
      toast.error('Password didn’t change, try again');
    }
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <i className="fa-solid fa-lock mx-1"></i> Change Password
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit(handleChangePassword)}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Change your Password
              </h3>

              <div>
                <Label htmlFor="password" className="mb-2 block text-center">
                  Your current password
                </Label>
                <TextInput
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  {...register("password", { required: true })}
                />
              </div>

              <div>
                <Label htmlFor="newPassword" className="mb-2 block text-center">
                  Your new password
                </Label>
                <TextInput
                  id="newPassword"
                  type="password"
                  {...register("newPassword", { required: true })}
                />
              </div>

              <div className="w-full flex justify-center">
                <Button type="submit">Update Password</Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
