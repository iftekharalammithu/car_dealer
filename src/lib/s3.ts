import { Credentials } from "aws-sdk/lib/core";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

const accessKeyId = process.env.BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.S3_BUCKET_SECRET_KEY;

if (!accessKeyId || !secretAccessKey) {
  throw new Error("Missing AWS S3 credentials in environment variables.");
}

const s3Credentials = new Credentials({
  accessKeyId,
  secretAccessKey,
});

export const s3 = new S3Client({
  region: "eu-west-2",
  credentials: s3Credentials,
});

interface UploadToS3Args {
  bucketName: string;
  path: string;
  file: Buffer;
  mimetype: string;
}

export async function uploadToS3({
  bucketName,
  path,
  file,
  mimetype,
}: UploadToS3Args) {
  const params = {
    Bucket: bucketName,
    Key: path,
    Body: file,
    ContentType: mimetype,
    CacheControl: "no-store",
  } satisfies PutObjectCommandInput;

  try {
    const command = new PutObjectCommand(params);
    return s3.send(command);
  } catch (error) {
    throw new Error(`Failed to upload file: ${path} , Error: ${error}`);
  }
}
