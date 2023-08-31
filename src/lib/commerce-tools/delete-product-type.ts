import 'dotenv/config'
import axios from 'axios'

import { COMMERCE_TOOLS_PROJECT_URL } from '../../constants'
import { createAuthHeaders } from './utils/create-auth-headers'

export async function deleteProductType(
  key: string,
  version: number,
  type = 'key'
) {
  const id = key
  const authHeaders = await createAuthHeaders()
  const url = `${COMMERCE_TOOLS_PROJECT_URL}/product-types/${
    type === 'id' ? id : `key=${key}`
  }?version=${version}`
  try {
    const response = await axios.delete(url, authHeaders)
    return response.data
  } catch (error: any) {
    console.error('deleteProductType error: ', error.response.data)
    throw error
  }
}
