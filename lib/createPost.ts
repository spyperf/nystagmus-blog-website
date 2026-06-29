import fs from "fs";
import path from "path";
import TurndownService from "turndown";


const postsDirectory =
path.join(
    process.cwd(),
    "content/blog"
);



export async function createPost(
{

title,
excerpt,
html

}:{
title:string;
excerpt:string;
html:string;
}){


const turndown =
new TurndownService();


turndown.addRule(
"images",
{

filter:"img",

replacement(
content,
node
){

const src =
(node as HTMLImageElement)
.src;


return `![](${src})`;

}

});



const markdown =
turndown.turndown(html);



const date =
new Date()
.toISOString()
.split("T")[0];



const slug =
title
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/(^-|-$)/g,"");



const file = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
---

${markdown}
`;



fs.writeFileSync(

path.join(
postsDirectory,
`${slug}.md`
),

file

);



return slug;

}