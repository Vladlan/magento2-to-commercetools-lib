import 'dotenv/config'
import axios from 'axios'

import { createAuthHeaders } from './utils/create-auth-headers'
import { COMMERCE_TOOLS_PROJECT_URL } from '../../constants'

export async function getCategories() {
  try {
    const authHeaders = await createAuthHeaders()
    const response = await axios.get(
      `${COMMERCE_TOOLS_PROJECT_URL}/categories`,
      authHeaders
    )
    return response.data
  } catch (error: any) {
    console.error('getCategories error: ', error.response.data)
    throw error
  }
}
