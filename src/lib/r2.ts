import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.R2_ACCOUNT_ID || "";
const accessKeyId = process.env.R2_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || "";
const bucketName = process.env.R2_BUCKET_NAME || "kids-food-learning-uploads";
const publicUrl = process.env.R2_PUBLIC_URL || "";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Generate a pre-signed PUT URL for uploading food illustrations / audio clips to Cloudflare R2.
 */
export async function getPresignedUploadUrl(filename: string, contentType: string) {
  const key = `uploads/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  if (!accountId || !accessKeyId) {
    // In local dev without R2 credentials, return simulated upload URL
    return {
      uploadUrl: `/api/upload?mockKey=${encodeURIComponent(key)}`,
      fileUrl: `/uploads/${filename}`,
      key,
    };
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
  const fileUrl = publicUrl ? `${publicUrl}/${key}` : `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${key}`;

  return { uploadUrl, fileUrl, key };
}

