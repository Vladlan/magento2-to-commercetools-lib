import 'dotenv/config'
import axios from 'axios'

import { createAuthHeaders } from './utils/create-auth-headers'
import { COMMERCE_TOOLS_PROJECT_URL } from '../../constants'

export async function createProductType(newProductTypeData: any) {
  try {
    const authHeaders = await createAuthHeaders()
    const response = await axios.post(
      `${COMMERCE_TOOLS_PROJECT_URL}/product-types`,
      newProductTypeData,
      authHeaders
    )
    return response.data
  } catch (err: any) {
    if (
      err.response.data.errors.find((el: any) => el.code === 'DuplicateField')
    )
      return null
    console.error('createProductType error: ', err.response.data)
    throw err
  }
}
