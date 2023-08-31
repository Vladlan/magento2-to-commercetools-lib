import 'dotenv/config'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

import { isFileExistS3 } from './is-file-exist-s3'
import { downloadImgByUrlToBuffer } from './download-img-by-url-to-buffer'

// Create an S3 service client object.
const s3Config = {
  endpoint: process.env.S3_URL as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
  region: 'global',
}

export async function uploadFileToS3ByUrl(url: string, imagePath: string) {
  if (
    !s3Config.endpoint ||
    !s3Config.credentials.accessKeyId ||
    !s3Config.credentials.secretAccessKey
  ) {
    console.warn(
      `[WARNING]: S3 credentials are not set. Skipping upload of ${url} to S3.`
    )
    return Promise.resolve(null)
  }
  const s3Client = new S3Client(s3Config)
  const isFileThere = await isFileExistS3(imagePath)
  if (isFileThere) return
  const blob = await downloadImgByUrlToBuffer(url)
  const upload_data = await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: imagePath,
      Body: blob,
    })
  )
}
