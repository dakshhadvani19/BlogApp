import React from 'react'
import {Editor} from '@tinymce/tinymce-react';
import {Controller} from "react-hook-form";

export default function RTE({name , control , label ,
defaultValue=""}) {
   // "control" is used pull everything of this form and all states to the file where 
   // it is imported 
  return (
      <div className='w-full'>
         {label && <label className='inline-block mb-1 pl-1'>
            {label}</label>}
         <Controller 
            name={name || "content"}
            control = {control}
            render={({field: {onChange}}) => (
               // here "field: {onChange}" works like if there is any change in this inform me
               <Editor
               apiKey='y5z722m9uhea51xubf6935jyhbgdoole8j0hf6q5ca9ixfzl'
                initialValue={defaultValue}
                init={{
                    height: 500,
                    menubar: true,
                     plugins: [
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                     ],
                     toolbar: 'undo redo | formatselect | ' +
                     'bold italic backcolor | alignleft aligncenter ' +
                     'alignright alignjustify | bullist numlist outdent indent | ' ,
                     content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }" ,
                  }}
                  onEditorChange={onChange}
                />

            )}
            />

      </div>
  )
}
