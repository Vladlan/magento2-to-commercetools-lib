import 'dotenv/config'
import axios from 'axios'

import { createAuthHeaders } from './utils/create-auth-headers'
import { COMMERCE_TOOLS_PROJECT_URL } from '../../constants'

export async function createCategory(newCategoryData: any) {
  try {
    const authHeaders = await createAuthHeaders()
    const response = await axios.post(
      `${COMMERCE_TOOLS_PROJECT_URL}/categories`,
      newCategoryData,
      authHeaders
    )
    return response.data
  } catch (err: any) {
    if (
      err.response.data.errors.find((el: any) => el.code === 'DuplicateField')
    )
      return null
    console.error('createCategory error: ', err.response.data)
    throw err
  }
}
