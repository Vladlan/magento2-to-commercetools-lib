import fs from 'fs'
import axios from 'axios'

export async function downloadImgByUrl(url: string, imagePath: string) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })

  const writer = fs.createWriteStream(imagePath)

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}
