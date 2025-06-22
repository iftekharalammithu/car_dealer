import { FinaliseMultiparUploadSchema } from "@/app/schemas/Images.Schema";
import { auth } from "@/auth";
import { s3 } from "@/lib/s3";
import { CompleteMultipartUploadCommandInput } from "@aws-sdk/client-s3";
import { forbidden } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = auth(async (req) => {
  try {
    if (!req.auth) {
      forbidden();
    }
    const data = await req.json();
    const validate = FinaliseMultiparUploadSchema.safeParse(data);

    if (!validate.success) {
      return NextResponse.error();
    }

    const { fileId, fileKey, parts } = validate.data;
    const { default: mimetype } = await import("mime-types");
    const mime = mimetype.lookup(fileKey);

    const { default: orderby } = await import("lodash.orderby");
    const multipartparams: CompleteMultipartUploadCommandInput = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      UploadId: fileId,
      MultipartUpload: {
        Parts: orderby(parts, ["PartNumber"], ["asc"]),
      },
      ...(mime && { ContentType: mime }),
    };

    const { CompleteMultipartUploadCommand } = await import(
      "@aws-sdk/client-s3"
    );
    const command = new CompleteMultipartUploadCommand(multipartparams);
    const payload = await s3.send(command);

    return NextResponse.json(
      {
        url: payload.Location,
        key: payload.Key,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Finalising multipart upload:", error);
    return NextResponse.error();
  }
});
