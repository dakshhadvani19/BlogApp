import React , {useState , useEffect}  from 'react'
import appwriteService from "../appwrite/config_appwrite";
import { Container , PostCard } from '../Components';

function AllPost() {
   const [posts, setPosts] = useState([]);
   useEffect(() => {}, [])
   appwriteService.getPosts([]).then((posts) => {
      if(posts){
         setPosts(posts.documents);
      } 
   })
   .catch()
  return (
    <div className='py-8 w-full'>
      <Container>
         <div className='flex flex-wrap'>
            {posts.map((post) => (
               <div key={post.$id}
               className='p-2 w-1/4' >
                  <PostCard {...post} />
               </div>
            ))}
         </div>
      </Container>
    </div> 
      // : 
      // <div className='py-8 w-full'>
      //    <Container>
      //       <div className='text-xl text-center justify-center'>
      //          No Post Available
      //       </div>
      //    </Container>
      // </div>
  )
}

export default AllPost