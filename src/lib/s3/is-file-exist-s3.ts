import 'dotenv/config'
import { HeadObjectCommand, S3Client } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  endpoint: process.env.S3_URL as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
  region: 'global',
})

export async function isFileExistS3(filePath: string) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: filePath,
  }
  try {
    await s3Client.send(new HeadObjectCommand(params))
    return true
  } catch (err) {
    return false
  }
}
