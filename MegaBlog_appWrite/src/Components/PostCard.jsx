import React from 'react'
import appwriteService from "../appwrite/config_appwrite";
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  // const imageUrl = post?.featuredImage ? appwriteService.getFileview(post.featuredImage) : "default-placeholder.jpg";
  return (
    <>
      <h2 className='text-xl font-bold'>{title}</h2>
      <Link to={`/post/${$id}`}>
        {/* here "$id" is an var. name */}
        <div className='w-full bg-gray-100 rounded-xl
        p-4'>
          <div className='w-full justify-center
        mb-4'>
            <img src={appwriteService.getFileview(featuredImage)}
              className='rounded-xl' />
          </div>
        </div>
        
      </Link>
    </>
  )
}

export default PostCard