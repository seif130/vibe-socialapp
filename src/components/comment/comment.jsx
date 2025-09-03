import React from 'react'
import UpdateComent from './../UpdateComent/UpdateComent';
import DeleteComent from '../DeleteComent/DeleteComent';

export default function Comment({comment , currentUserId}) {
  let{commentCreator , createdAt , content , _id} = comment;
  
  
  return (
    <div className='w-full rounded-md border-2 border-slate-900  text-black p-2 my-1   bg-gray-400  shadow-sm'>

      <div className='flex justify-between items-center'>

<div className=' flex gap-2 items-center'>
  <img src={commentCreator.photo} className='size-[36px]' alt="" />
  <p>{commentCreator.name}</p>
</div>

<div>
  <span>{createdAt}</span>
</div>

      </div>
      <div className='flex justify-between items-center'>

<div className=' my-1'>
        {content}
      </div>

      <div className=' flex gap-3'>
       
          
   {(commentCreator._id === currentUserId || commentCreator.id === currentUserId) && (
  <div className='flex gap-3'>
    <UpdateComent id={_id} oldContent={content} />
    <DeleteComent id={_id} />
  </div>
)}

    

          
      </div>

      </div>

      
    </div>
  )
}
