import fs from "fs";
import path from "path";
import matter from "gray-matter";


const postsDirectory = path.join(
    process.cwd(),
    "content/blog"
);



export type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
    content: string;
};



export function getAllPosts(): Post[] {

    const files = fs.readdirSync(postsDirectory);


    const posts = files.map((filename) => {

        const slug = filename.replace(".md", "");


        const filePath = path.join(
            postsDirectory,
            filename
        );


        const fileContents =
            fs.readFileSync(
                filePath,
                "utf8"
            );


        const {data, content} =
            matter(fileContents);


        return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            content
        };

    });


    return posts.sort(
        (a,b) =>
            new Date(b.date).getTime()
            -
            new Date(a.date).getTime()
    );

}




export function getPostBySlug(
    slug:string
):Post {

    if(!slug){
        throw new Error(
            "No slug provided"
        );
    }


    const filePath =
        path.join(
            postsDirectory,
            `${slug}.md`
        );


    const fileContents =
        fs.readFileSync(
            filePath,
            "utf8"
        );


    const {data,content} =
        matter(fileContents);



    return {

        slug,

        title:data.title,

        date:data.date,

        excerpt:data.excerpt,

        content

    };

}