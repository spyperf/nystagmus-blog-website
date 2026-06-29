import Link from "next/link";
import {Post} from "@/lib/posts";


export default function BlogCard(
{
    post
}:{
    post:Post
}){


return (

<Link
href={`/blog/${post.slug}`}
>


<div
className="
border
rounded-xl
p-6
hover:shadow-lg
transition
cursor-pointer
"
>


<h2
className="
text-2xl
font-bold
mb-2
"
>

{post.title}

</h2>



<p
className="
text-sm
text-gray-500
mb-4
"
>

{post.date}

</p>



<p
className="
text-gray-700
"
>

{post.excerpt}

</p>



</div>


</Link>

);


}