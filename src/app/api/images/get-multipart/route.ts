import { GetMultiparUploadSchema } from "@/app/schemas/Images.Schema";
import { auth } from "@/auth";
import { s3 } from "@/lib/s3";
import { UploadPartCommandInput } from "@aws-sdk/client-s3";
import { forbidden } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = auth(async (req) => {
  try {
    if (!req.auth) {
      forbidden();
    }

    const data = await req.json();
    const validated = GetMultiparUploadSchema.safeParse(data);

    if (!validated.success) {
      return NextResponse.error();
    }

    const { fileId, fileKey, parts } = validated.data;

    const multipartParams: Omit<UploadPartCommandInput, "PartNumber"> = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      UploadId: fileId,
    };

    const promises: Promise<string>[] = [];

    const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
    const { UploadPartCommand } = await import("@aws-sdk/client-s3");

    for (let index = 0; index < parts; index += 1) {
      const command = new UploadPartCommand({
        ...multipartParams,
        PartNumber: index + 1,
      });
      promises.push(getSignedUrl(s3, command));
    }

    const signUrls = await Promise.all(promises);

    const partsignedurlList = signUrls.map((signedurl, i) => ({
      signedurl,
      PardNumber: i + 1,
    }));

    return NextResponse.json(
      {
        parts: partsignedurlList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Getting multipart upload:", error);
    return NextResponse.error();
  }
});
