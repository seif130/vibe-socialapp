import React, { useContext, useEffect, useState } from 'react'

import { PostContext } from '../../Context/PostContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Comment from './../comment/comment';
import { Link } from 'react-router-dom';
import CreateComment from './../CreateComment/CreateComment';
import CreatePost from './../CreatePost/CreatePost';
import { Helmet } from 'react-helmet'



export default function Home() {

  // let {getallposts} = useContext(PostContext);
  // const [posts, setposts] = useState([]);

  // async function getposts() {
  //   let res = await getallposts();

  //   if(res.length){
  //     setposts(res);
  //   }
    
  // }

//   useEffect(()=> {
// getposts()
//   }, [])


function getallposts(){

   return   axios.get('https://linked-posts.routemisr.com/posts?limit=50' , {
              headers : {
                token : localStorage.getItem('usertoken')
            }
        }
          
        )
}



let {data , isError , isLoading , error  } = useQuery({
  queryKey : ['getPosts'],
  queryFn : getallposts,
  select : (data) => data?.data?.posts

})



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


  return (
   <>

     <Helmet>
        <title>vibe - home</title>
        <meta name="description" content="vibe is your community to connect and share." />
      </Helmet>

   <CreatePost/>
   
  {data.map((post) => (


 
      <div  className='w-full p-5 my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-500 mx-auto' key={post.id} >
         <Link to={`/postdetails/${post.id}`} >

    <div className='flex justify-between mb-4 items-center '>
      <div className='flex items-center gap-4'>
        <img src={post.user.photo} alt="" className=' size-[36px]' />
        <p>{post.user.name}</p>
        </div>
      <div className='text-xs text-slate-500'>
        {post.createdAt}
      </div>
    </div>
  {post.body &&  <h2 className='mb-4'>{post.body}</h2>}
  {post.image && <img src={post.image} alt={post.body} className='w-full rounded-md' />}

    <Comment comment={post.comments[0]}  />

     </Link>
   <CreateComment postid={post.id}/>
    
  </div>
    
   
  ))}
  </>
  );
}

