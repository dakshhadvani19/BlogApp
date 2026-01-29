import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config_appwrite';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../Store/postSlice_store';
// import  authService  from '../../appwrite/auth';
// import Alert from '../Alert';

function PostForm({ post }) {
   const { register, handleSubmit, watch, setValue
      , control, getValues
   } = useForm({
      defaultValues: {
         title: post?.title || '',
         slug: post?.$id || '',
         content: post?.content || '',
         status: post?.status || 'active',
      }
   });
   // const user = authService.getCurrentUser();
   const navigate = useNavigate();
   const userData = useSelector((state) => state.auth.userData);
   const dispatch = useDispatch();

   // if(!userData){
   //    <p className='text-xl'>Please Log in to create a post </p>
   // }
   // const submit = async (data) => {
   //    if(post){
   //       const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

   //       if(file){
   //          appwriteService.deleteFile(post.featuredImage);
   //       } 
   //       const updatedPost = await appwriteService.updatePost
   //       (post.$id, {
   //          ...data,
   //          featuredImage: file ? file.$id : undefined ,
   //       })
   //       if(updatedPost){
   //          navigate(`/post/${updatedPost.$id}`)
   //       }
   //    }
   //    else{
   //       const file =  await appwriteService.uploadFile(data.image[0]);
   //       // here i can also add if else in above line
   //       if(file){
   //          const fileId = file.$id;
   //          data.featuredImage = fileId;
   //          const updatedPost = await appwriteService.createPost({
   //             ...data , 
   //             userId: userData.$id,
   //          })
   //          if(updatedPost){
   //             navigate(`/post/${updatedPost.$id}`);
   //          }
   //       }
   //    }
   // }

   // Old code which

   const submit = async (data) => {
      try {
         if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
               appwriteService.deleteFile(post.featuredImage);
            }
            // delete data.image;
            const updatedPost = await appwriteService.updatePost(post.$id,{
               ...data,
               featuredImage: file ? file.$id : post.featuredImage
            });

            if (updatedPost) {
               dispatch(updatePost(updatedPost));
               navigate(`/post/${updatedPost.$id}`);
            }
         } 
         else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
               const fileId = file.$id;
               data.featuredImage = fileId;
               delete data.image;
               const updatedPost = await appwriteService.createPost({
                  ...data,
                  userId: userData?.$id || userData?.$id ,
                  // slug: post.slug ? post.slug : null,
               });
               if (updatedPost) {
                  dispatch(createPost(updatedPost));
                  navigate(`/post/${updatedPost.$id}`);
               }
            }
         }
      } catch (error) {
         console.error("PostForm Error:", error);
         alert("An error occurred while saving the post.");
         // <Alert />
      }
   };

   const imageUrl = post?.featuredImage ? appwriteService.getFileview(post.featuredImage) : "default-placeholder.jpg";
   const slugTransform = useCallback((value) => {
      if (value && typeof value === "string") {
         return value.
            trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g, '-').replace(/\s/g, "-");
         // this replace will "replace" all of the charecters with "space" excluding given in the array "[]"
      }
      return "";
   }, [])

   useEffect(() => {
      const subscription = watch((value, { name }) => {
         if (name === 'title') {
            // here "name === 'title' " is just for that form chekc where set an input as 
            // "title" so only change there 
            setValue('slug', slugTransform(value.title),
               { shouldValidate: true });
            // here "slugTransform" is used as which value to fill and "slug" is for where to fill
         }
      });
      return () => {
         subscription.unsubscribe();
      }
      // "unsubscribe" is for optimization so it doesn't get into infine loop
   }, [watch, slugTransform, setValue])
   return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
         {/* Left Side form */}
         <div className="w-2/3 px-2">
            <Input
               label="Title :"
               placeholder="Title"
               className="mb-4"
               {...register("title", { required: true })}
            />
            <Input
               label="Slug :"
               placeholder="Slug"
               className="mb-4"
               {...register("slug", { required: true })}
               onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
               }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
         </div>
         {/* Right Side form */}
         <div className="w-1/3 px-2">
            <Input
               label="Featured Image :"
               type="file"
               className="mb-4 cursor-pointer"
               accept="image/png, image/jpg, image/jpeg, image/gif"
               {...register("image", { required: !post })}
            // here "!post" means that post shouldn't be available without it. 
            />
            {post && (
               <div className="w-full mb-4">
                  <img
                     src={imageUrl}
                     alt={post.title}
                     className="rounded-lg"
                  />
               </div>
            )}
            <Select
               options={["active", "inactive"]}
               label="Status"
               className="mb-4 cursor-pointer"
               {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
               {post ? "Update" : "Submit"}
            </Button>
         </div>
      </form>
   )
}

export default PostForm