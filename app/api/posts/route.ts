import {
    NextResponse
}
from "next/server";


import {
    createPost
}
from "@/lib/createPost";



export async function POST(
req:Request
){


try{


const body =
await req.json();



const slug =
await createPost({

title:body.title,

excerpt:body.excerpt,

html:body.content

});



return NextResponse.json({

success:true,

slug

});


}

catch(error){


return NextResponse.json(

{
error:
"Failed to create post"
},

{
status:500
}

);


}


}