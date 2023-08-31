import axios from 'axios'

export async function downloadImgByUrlToBuffer(url: string) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer',
  })

  const buffer = Buffer.from(response.data, 'binary')
  return buffer
}
