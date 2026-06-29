"use client"


import {
useState
}
from "react";


import Editor
from "@/components/Editor";



export default function NewPost(){



const [title,setTitle]=useState("");

const [excerpt,setExcerpt]=useState("");

const [content,setContent]=useState("");

const [message,setMessage]=useState("");




async function publish(){


const response =
await fetch(
"/api/posts",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

title,

excerpt,

content

})

}

);



const data =
await response.json();



if(data.success){

setMessage(
"Published successfully!"
);


window.location.href =
`/blog/${data.slug}`;

}

else{

setMessage(
"Error publishing"
);

}



}





return (

<div
className="
max-w-4xl
mx-auto
p-8
"
>


<h1
className="
text-4xl
font-bold
mb-8
"
>

New Blog Post

</h1>




<input

placeholder="Title"

value={title}

onChange={
e=>setTitle(e.target.value)
}

className="
border
p-3
w-full
mb-4
"

/>




<input

placeholder="Short description"

value={excerpt}

onChange={
e=>setExcerpt(e.target.value)
}

className="
border
p-3
w-full
mb-6
"

/>




<Editor
onChange={setContent}
/>




<button

onClick={publish}

className="
mt-6
bg-black
text-white
px-6
py-3
rounded
"

>

Publish

</button>



<p>

{message}

</p>



</div>

)


}