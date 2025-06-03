import { singleImageUploadSchema } from "@/app/schemas/Images.Schema";
import { auth } from "@/auth";
import { MAX_IMAGE_SIZE } from "@/config/constants";
import { uploadToS3 } from "@/lib/s3";
import { forbidden } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// export async function POST(req: NextRequest) {}
export const POST = auth(async (req) => {
  console.log(req.auth);
  if (!req.auth) {
    return forbidden();
  }
  const formdata = req.formData();
  const validated = singleImageUploadSchema.safeParse(formdata);

  if (!validated.success) {
    return NextResponse.json({ message: "Invalid file" }, { status: 400 });
  }

  const { file } = validated.data;
  const uuid = uuidv4();

  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ message: "invalid File size" }, { status: 400 });
  }

  const { default: mimetype } = await import("mime-types");
  const mime = mimetype.lookup(file.name).toString();

  if (mime.match(/image\/(jpeg|jpg|png|webp)/) === null) {
    return NextResponse.json({ message: "File Type Invalid" }, { status: 400 });
  }

  const decodedFileName = decodeURIComponent(decodeURIComponent(file.name));
  const key = `uploads/${uuid}/${decodedFileName}`;

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadToS3({
      bucketName: process.env.S3_BUCKET_NAME || "cardealer",
      file: buffer,
      mimetype: mime,
      path: key,
    });

    const url = `${process.env.S3_URL}/${key}`;
    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    console.log("Error Uploading File", err);
    if (err instanceof Error) {
      return NextResponse.json(
        {
          message: `Error Uploading File ${err.message}`,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: `SomeThing Went Wrong`,
      },
      { status: 400 }
    );
  }
});
