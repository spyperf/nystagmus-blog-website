"use client"


import {
    EditorContent,
    useEditor
}
from "@tiptap/react";


import StarterKit
from "@tiptap/starter-kit";


import Image
from "@tiptap/extension-image";


import {useRef} from "react";



export default function Editor(
{
onChange
}:{
onChange:(value:string)=>void
}

){


const fileInput =
useRef<HTMLInputElement>(null);




const editor =
useEditor({

extensions:[

    StarterKit,

    Image

],


content:"",



onUpdate({editor}){


    onChange(
        editor.getHTML()
    );


}

});




if(!editor)
return null;





async function uploadImage(
file:File
){


const formData =
new FormData();


formData.append(
"file",
file
);



const response =
await fetch(
"/api/upload",
{

method:"POST",

body:formData

}

);



const data =
await response.json();



editor
.chain()
.focus()
.setImage({
    src:data.url
})
.run();



}






return (

<div>


<input

type="file"

accept="image/*"

hidden

ref={fileInput}


onChange={(e)=>{


    const file =
    e.target.files?.[0];


    if(file){

        uploadImage(file);

    }


}}


/>





<div
className="
flex
gap-3
mb-3
"
>



<button

type="button"

onClick={()=>{

editor.chain()
.focus()
.toggleBold()
.run();

}}

className="
border
px-3
py-1
"

>

Bold

</button>





<button

type="button"

onClick={()=>{

editor.chain()
.focus()
.toggleItalic()
.run();

}}

className="
border
px-3
py-1
"

>

Italic

</button>





<button

type="button"

onClick={()=>{

editor.chain()
.focus()
.toggleCodeBlock()
.run();

}}

className="
border
px-3
py-1
"

>

Code

</button>





<button

type="button"

className="
border
px-3
py-1
"

onClick={()=>{

fileInput.current?.click();

}}

>

Add Image

</button>



</div>







<div

className="
border
rounded
p-4
min-h-[300px]
"

>


<EditorContent

editor={editor}

/>


</div>



</div>

)

}