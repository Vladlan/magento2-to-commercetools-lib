import 'dotenv/config'
import axios from 'axios'

import { createAuthHeaders } from './utils/create-auth-headers'
import { COMMERCE_TOOLS_PROJECT_URL } from '../../constants'

export async function createProduct(newProductData: any) {
  try {
    const authHeaders = await createAuthHeaders()
    const response = await axios.post(
      `${COMMERCE_TOOLS_PROJECT_URL}/products`,
      newProductData,
      authHeaders
    )
    return response.data
  } catch (err: any) {
    if (
      err.response.data.errors.find((el: any) => el.code === 'DuplicateField')
    )
      return null
    console.error('createProduct error: ', err.response.data)
    throw err
  }
}
