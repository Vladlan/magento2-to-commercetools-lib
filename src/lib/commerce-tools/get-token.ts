import 'dotenv/config'
import axios, { isAxiosError } from 'axios'

const COMMERCETOOLS_AUTH_URL = process.env.COMMERCETOOLS_AUTH_URL

export async function getToken() {
  try {
    const response = await axios.post(
      `${COMMERCETOOLS_AUTH_URL}/oauth/token`,
      null,
      {
        params: {
          grant_type: 'client_credentials',
          scope: `manage_project:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
        },
        auth: {
          username: process.env.COMMERCETOOLS_CLIENT_ID as string,
          password: process.env.COMMERCETOOLS_CLIENT_SECRET as string,
        },
      }
    )

    return response.data.access_token
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Error getting access token:')
      console.error(error.response?.status)
      console.error(error.response?.statusText)
    } else {
      console.error(error)
    }
    throw error
  }
}
