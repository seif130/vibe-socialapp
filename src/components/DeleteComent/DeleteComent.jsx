import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function DeleteComent({id}) {

   const queryClient = useQueryClient();

   async function handleDeleteComment(){
  


try {
      let res = await axios.delete(
        `https://linked-posts.routemisr.com/comments/${id}`, 
        {
          headers: {
            
            token: localStorage.getItem('usertoken') ,
           
          }
        }
      );
    
      
      if (res.data.message === "success") {
        toast.success('comment deleted successfully');

         queryClient.invalidateQueries({queryKey : ['UserPosts']});
          queryClient.invalidateQueries({ queryKey: ["PostDetails"] });
        
        
      
      }
    } catch (err) {
      toast.error('comment failed to delete please try again');
    }

}

  return (
   <>
   
   
 <button
      onClick={handleDeleteComment}
      className=" w-10 h-10 flex items-center justify-center  cursor-pointer text-red-600 rounded-full shadow-md transition" title="delete Comment">
      <i className="fa-solid fa-trash "></i> </button>
   </>
  )
}
