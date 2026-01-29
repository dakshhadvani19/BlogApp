import React , {useEffect , useState} from 'react'
import {Container} from "../Components/index";
import {PostForm} from "../Components/index";
import appwriteService from "../appwrite/config_appwrite";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
   const [post , setPosts] = useState(null);
   const {slug} = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      let active = true;
      if(slug){
         appwriteService.getPost(slug).then((post) => {
            if(post && active){
               setPosts(post);
            }
         })
      } else{
         navigate('/');
      }
      return () => { active = false; }
   }, [slug , navigate])
  return post ? (
      <div className='py-8'>
         <Container>
            <PostForm post={post} />
         </Container>
      </div>
  ) : null
}

export default EditPost