import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Comment from './../comment/comment';
import { Helmet } from 'react-helmet';
import CreateComment from '../CreateComment/CreateComment';


export default function PostDetails() {
  let { id } = useParams();

  function getSignlePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem('usertoken'),
      },
    });
  }

  let { data: post, isError, isLoading, error } = useQuery({
    queryKey: ['getSignlePost', id],
    queryFn:  getSignlePost,
    select: (data) => data?.data?.post,
  });


if (isError){
  return <h3 className='bg-red-600 text-white'>{error.message}</h3>
}

if (isLoading){
  return (
    <>
     <div className="p-6 bg-gray-200 rounded-md animate-pulse mx-auto md:w-[80%] lg:w-[60%] my-5  ">
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


  return <>
    <Helmet>
        <title>vibe - postdetails</title>
        <meta name="description" content="vibe is your community to connect and share." />
      </Helmet>

    <div className="w-full p-5 my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-400 mx-auto">
      <div className="flex justify-between mb-4 items-center">
        <div className="flex items-center gap-4">
          <img src={post?.user?.photo} alt="" className="size-[36px] rounded-2xl" />
          <p>{post?.user?.name}</p>
        </div>
        <div className="text-xs text-slate-500">{post?.createdAt}</div>
      </div>
      {post?.body && <h2 className="mb-4">{post.body}</h2>}
      {post?.image && (
        <img src={post.image} alt={post.body} className="w-full rounded-md" />
      )}
        <div className="flex justify-around items-center border-t border-gray-300 mt-4 pt-2 text-gray-800 text-sm mb-4">
  
  <button className="flex items-center gap-2 hover:text-blue-700 transition cursor-pointer">
    <i className="fas fa-thumbs-up"></i>
    <span>Like</span>
  </button>


  <button className="flex items-center gap-2 hover:text-green-500 transition cursor-pointer">
    <i className="fas fa-comment"></i>
    <span>Comment</span>
  </button>

  <button className="flex items-center gap-2 hover:text-purple-600 transition cursor-pointer">
    <i className="fas fa-share"></i>
    <span>Share</span>
  </button>
</div>
<CreateComment postid={post.id}/>
      {post?.comments?.map ((comment) => <Comment key={comment.id} comment={comment} />) }
    </div>
  
  </>

    

}
