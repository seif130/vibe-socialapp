import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import UserPosts from './../userposts/userposts'
import ChangePassword from './../ChangePassword/ChangePassword'
import UploadProfilePhoto from '../uploadProfilePhoto/uploadProfilePhoto'
import { Helmet } from 'react-helmet'
import CreatePost from '../CreatePost/CreatePost'

export default function Profile() {
  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem('usertoken'),
      },
    })
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getUserData,
    select: (res) => res?.data?.user,
  })

  if (isLoading) {
    return (
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
    )
  }

  if (isError) return <p className="text-red-500 text-center">Error: {error.message}</p>

  return (
    <>
      <Helmet>
        <title>vibe - profile</title>
        <meta name="description" content="vibe is your community to connect and share." />
      </Helmet>

      <div className="w-full md:w-[60%] mx-auto border border-slate-200 shadow-lg rounded-2xl p-6 my-6 bg-[#00dad6b5]">

        <div className="flex flex-col items-center">
          <img
            src={data?.photo || "/default-avatar.png"}
            className="w-24 h-24 rounded-full border-2 border-slate-300 shadow-sm object-cover"
            alt="profile"
          />
          <h2 className="text-xl font-semibold mt-3">{data?.name}</h2>
          <p className="text-white text-sm">{data?.email}</p>
          <p><span className="font-medium">Gender:</span> {data?.gender}</p>
          <p><span className="font-medium">Birthday:</span> {data?.dateOfBirth}</p>
        </div>

        
          
        

  
        <div className="flex justify-center gap-4 mt-6">
          <ChangePassword />
          <UploadProfilePhoto />
        </div>
      </div>

      <CreatePost/>

      {data?._id && <UserPosts id={data._id} />}
    </>
  )
}
