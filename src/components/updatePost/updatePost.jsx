import React, { useState } from 'react';
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';




export default function UpdatePost({id}) {
  const [openModal, setOpenModal] = useState(false);

  let QueryClient = useQueryClient()
  
    function onCloseModal() {
      setOpenModal(false);
    }
  
    const { register, handleSubmit, reset } = useForm({
      defaultValues: {
        body: '',
        image: '',
      }
    });


 async function handleAddPost(values){
  let myData = new FormData();
    myData.append('body', values.body);
     myData.append('image', values.image[0]);


try {
      let res = await axios.put(
        `https://linked-posts.routemisr.com/posts/${id}`, myData,
        {
          headers: {
            token: localStorage.getItem('usertoken') ,
           
          }
        }
      );
    
      
      if (res.data.message === "success") {
        toast.success('Post updated successfully');
        QueryClient.invalidateQueries({queryKey : ['UserPosts']})
        reset();
        onCloseModal();
      }
    } catch (err) {
      toast.error('post failed to update please try again');
    }

}


  return (
  <>
  <div className='flex justify-center mx-1 '>
 <button onClick={() => setOpenModal(true)} className=' text-white rounded-md p-3 text-sm cursor-pointer bg-emerald-600 hover:bg-emerald-700 transition' > <i className="fa-solid fa-pen "></i> update post</button>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup >
          <ModalHeader />
          <ModalBody>
            <form onSubmit={handleSubmit(handleAddPost)}>
              <div className="space-y-6">
               
  
                <div>
                 
                  <TextInput
                    placeholder="post details"
                    type="text"
                    {...register("body", { required: true })}
                  />
                </div>
  
                <div className='flex justify-center items-center gap-2 cursor-pointer'>
                               <TextInput
                                 id="photo"
                                 type="file"
                                 className="hidden"
                                 {...register("image", { required: true })}
                               />
                               <label htmlFor="photo" className='cursor-pointer'>
                                 <i className='fa-solid fa-image fa-2xl'></i>
                               </label>
                             </div>
  
                <div className="w-full flex justify-center">
                  <Button type="submit">add post</Button>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>

  </div>
   
  </>
  )
}
