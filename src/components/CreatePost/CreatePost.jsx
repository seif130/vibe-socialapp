import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';


export default function CreatePost() {
  const [openModal, setOpenModal] = useState(false);


   function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem('usertoken'),
      },
    })
  }

  let { data} = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getUserData,
    select: (res) => res?.data?.user,
  })


  function onCloseModal() {
    setOpenModal(false);
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      body: '',
      image: '',
    }
  });

  async function handleAddPost(values) {
    let myData = new FormData();
    myData.append('body', values.body);
    myData.append('image', values.image[0]);

    try {
      let res = await axios.post(
        'https://linked-posts.routemisr.com/posts', myData,
        {
          headers: {
            token: localStorage.getItem('usertoken'),
          }
        }
      );

      if (res.data.message === "success") {
        toast.success('Post add successfully');
        reset();
        onCloseModal();
      }
    } catch (err) {
      toast.error('post failed try again');
    }
  }

  return (
    <>
    
      <div className="flex justify-center my-5">
        <div className="bg-white dark:bg-gray-800 md:w-[60%] w-full rounded-2xl shadow border border-gray-300 p-3">
          <div
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={data?.photo || "/default-avatar.png"}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full text-gray-600 dark:text-gray-300">
              What's on your mind?
            </div>
          </div>

          <div className="flex justify-around items-center border-t mt-3 pt-3 text-gray-600 text-sm font-medium">
            <label
              htmlFor="photo"
              className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
            >
              <i className="fa-solid fa-video text-red-500"></i> Live Video
            </label>
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <i className="fa-solid fa-image text-green-500"></i> Photo
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <i className="fa-regular fa-face-smile text-yellow-500"></i> Feeling/Activity
            </div>
          </div>
        </div>
      </div>


      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader>
          <div className="text-lg font-semibold text-center w-full">Create Post</div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleAddPost)}>
            <div className="space-y-6">

            
              <div className="flex items-center gap-3">
                <img
                  src={data?.photo || "/default-avatar.png"}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <TextInput
                  placeholder="What's on your mind?"
                  type="text"
                  {...register("body", { required: true })}
                  className="flex-1 border-0 focus:ring-0 text-lg"
                />
              </div>

           
              <div className="flex flex-col">
              <input
           id="photo"
              type="file"
               accept="image/*"
                 className="hidden"
                      {...register("image", { required: "Image is required" })}/>


         <label htmlFor="photo" className="cursor-pointer flex items-center gap-2 mt-2">
        <i className="fa-solid fa-image fa-2xl text-green-600 hover:text-green-800"></i>
             <span className="text-gray-600 text-sm">Add Photo</span>
            </label>


          {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                 )}
              </div>

            
              <div className="w-full">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  Post
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}
