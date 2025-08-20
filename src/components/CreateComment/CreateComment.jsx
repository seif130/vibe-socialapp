import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { TextInput, Button } from "flowbite-react";

export default function CreateComment({ postid }) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: '',
      post: postid,
    }
  });

  async function addComment(value) {
    try {
      let res = await axios.post(
        'https://linked-posts.routemisr.com/comments',
        value,
        {
          headers: {
            token: localStorage.getItem('usertoken'),
          }
        }
      );

      if (res.data.message === "success") {
        toast.success('Comment added successfully');
        queryClient.invalidateQueries({ queryKey: ['UserPosts'] });
        reset();
      }
    } catch (err) {
      toast.error('Failed to add comment');
    }
  }

  return (
    <form onSubmit={handleSubmit(addComment)} className="relative w-full my-3">
      <TextInput
        {...register('content', { required: true })}
        placeholder="Write a comment..."
       
      />
      <input type="hidden" value={postid} {...register('post')} />

   <button
    type="submit"
    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
  >
    <i className="fa-solid fa-paper-plane cursor-pointer"></i>
  </button>
    </form>
  );
}
