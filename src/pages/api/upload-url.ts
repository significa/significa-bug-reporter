import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextApiRequest, NextApiResponse } from 'next'

const BUCKET = process.env.S3_BUCKET_NAME || ''
const REGION = process.env.S3_REGION || 'eu-west-1'
const client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
})

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    return res.status(404).end()
  }

  const { type, name, size } = req.query

  if (
    !type ||
    Array.isArray(type) ||
    !name ||
    Array.isArray(name) ||
    !size ||
    Array.isArray(size) ||
    isNaN(Number(size))
  ) {
    return res.status(400).json({ message: 'Invalid payload' })
  }

  try {
    const filename = `${Date.now()}-${name}`
    const asset = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${filename}`
    const url = await getSignedUrl(
      client,
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: filename,
        ContentType: type,
        ACL: 'public-read',
      }),
      { expiresIn: 3600 }
    )

    res.status(200).json({ url, asset })
  } catch (error) {
    return res.status(500).json({
      message: 'Could not request upload URL',
    })
  }
}
