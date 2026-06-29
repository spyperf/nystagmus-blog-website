import {
    getAllPosts
}
from "@/lib/posts";


import BlogCard
from "@/components/BlogCard";



export default function BlogPage(){


const posts =
    getAllPosts();



return (

<main
className="
max-w-5xl
mx-auto
px-6
py-12
"
>


<h1
className="
text-5xl
font-bold
mb-10
"
>

Eye Tracking Project Blog

</h1>



<div
className="
space-y-6
"
>


{
posts.map(post=>(

<BlogCard
key={post.slug}
post={post}
/>

))
}



</div>


</main>

)

}