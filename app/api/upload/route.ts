import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";


export async function POST(
    req: Request
) {

    try {


        const formData =
            await req.formData();



        const uploadedFile =
            formData.get("file");



        if (
            !uploadedFile ||
            !(uploadedFile instanceof File)
        ) {

            return NextResponse.json(
                {
                    error: "No valid file uploaded"
                },
                {
                    status: 400
                }
            );

        }



        const bytes =
            await uploadedFile.arrayBuffer();



        const buffer =
            Buffer.from(bytes);



        const extension =
            uploadedFile.name
            .split(".")
            .pop();



        const filename =
            `${randomUUID()}.${extension}`;



        const uploadDir =
            path.join(
                process.cwd(),
                "public",
                "uploads"
            );



        if (!fs.existsSync(uploadDir)) {

            fs.mkdirSync(
                uploadDir,
                {
                    recursive: true
                }
            );

        }



        fs.writeFileSync(
            path.join(
                uploadDir,
                filename
            ),
            buffer
        );



        return NextResponse.json(
            {
                url:
                `/uploads/${filename}`
            }
        );


    } catch(error) {


        console.error(error);


        return NextResponse.json(
            {
                error:
                "Image upload failed"
            },
            {
                status:500
            }
        );


    }

}