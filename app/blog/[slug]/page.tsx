import {
    getPostBySlug,
    getAllPosts
} from "@/lib/posts";


import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";



export async function generateStaticParams() {

    const posts = getAllPosts();


    return posts.map((post) => ({
        slug: post.slug
    }));

}



export default async function PostPage(
{
    params
}: {
    params: Promise<{
        slug: string
    }>
}) {


    const {slug} = await params;


    const post =
        getPostBySlug(slug);



    return (

        <article
        className="
        max-w-4xl
        mx-auto
        px-6
        py-12
        "
        >


            <h1
            className="
            text-5xl
            font-bold
            mb-4
            "
            >

                {post.title}

            </h1>



            <p
            className="
            text-gray-500
            mb-10
            "
            >

                {post.date}

            </p>




            <div
            className="
            prose
            prose-lg
            max-w-none
            "
            >

                <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                >

                    {post.content}

                </ReactMarkdown>


            </div>


        </article>

    );

}