import 'dotenv'
import { getS3Client } from '$lib/aws.server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { error, text } from '@sveltejs/kit';

const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts[parts.length - 1];
};

export const GET = async ({ url } :any) => {
  const type = url.searchParams.get('type');
  const name = url.searchParams.get('name');
  const size = url.searchParams.get('size');

  if (!type || !name || !size) {
    throw error(400, 'Missing required query params');
  }
 const s3Client = getS3Client();

  try {
    const uuid = crypto.randomUUID();
    const url = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${uuid}.${getFileExtension(name)}`,
        ContentType: type
      })
    );

    return text(url);
  } catch (err) {
    console.error('Could not generate signed URL', err)
    throw error(500, 'Could not get signed URL');
  }
};
