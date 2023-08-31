import { getToken } from '../get-token'

export const createAuthHeaders = async () => {
  const token = await getToken()
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}
