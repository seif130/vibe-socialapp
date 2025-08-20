import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Comment from './../comment/comment';
import { Link } from 'react-router-dom';
import CreateComment from './../CreateComment/CreateComment';
import UpdatePost from './../updatePost/updatePost';
import toast from 'react-hot-toast';



export default function UserPosts({id}) {

   let QueryClient = useQueryClient()

 function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?`, {
      headers: {
        token: localStorage.getItem('usertoken'),
      },
    });
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["UserPosts", id],
    queryFn:  getUserData,
    select: (data) => data?.data?.posts,
  });


  if (isError){
  return <h3>{error.message}</h3>
}

if (isLoading){
  return (
    <>
     <div className="p-6 bg-gray-200 rounded-md animate-pulse mx-auto md:w-[80%] lg:w-[60%] my-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
        <div className="h-6 bg-gray-300 rounded w-5/6 mb-3"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
        <div className="h-12 bg-gray-300 rounded w-full"></div>
      </div>
</>
  )
}


  async function deletePost(postid){

    try {
      let res = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${postid}`,
      
        {
          headers: {
            token: localStorage.getItem('usertoken') ,
           
          }
        }
      );
    
      
      if (res.data.message === "success") {
        toast.success('Post deleted successfully');
         QueryClient.invalidateQueries({queryKey : ['UserPosts']})
        
        
      }
    } catch (err) {
      toast.error('post didnt delete try again');
    }
  }

  return (
    <>


   
{data?.map((post) => (


 
      <div  className='w-full p-5 my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-400 mx-auto ' key={post.id}>
         <Link to={`/postdetails/${post?.id}`} >

    <div className='flex justify-between mb-4 items-center '>
      <div className='flex items-center gap-4'>
        <img src={post?.user.photo} alt="" className=' size-[36px]' />
        <p>{post?.user.name}</p>
        </div>
      <div className='text-xs text-slate-500'>
        {post?.createdAt}
      </div>
    </div>
  {post?.body &&  <h2 className='mb-4'>{post?.body}</h2>}
  {post?.image && <img src={post?.image} alt={post.body} className='w-full rounded-md' />}

  
     </Link>

 <div className="flex  w-full justify-between  items-center">

  <div className="flex-1">
    <CreateComment postid={post.id} />
  </div>

 
  <div className="flex   items-end gap-2  justify-center ">
    <UpdatePost id={post?.id}  />
    <button
      onClick={() => deletePost(post.id)}
      className="bg-red-600 text-white rounded-md p-3 text-sm hover:bg-red-700 transition cursor-pointer " >
          <i className="fa-solid fa-trash mx-1"></i> 
      Delete post
    </button>
  </div>
</div>

   
   {post?.comments?.length > 0 && <Comment comment={post.comments[0]} />}

    
  </div>
    
   
  ))}

   </>
  )
}

