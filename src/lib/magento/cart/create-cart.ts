import { MAGENTO_GUEST_CARTS_URL } from '../../constants'

export async function createCart(): Promise<string> {
  try {
    const res = await fetch(MAGENTO_GUEST_CARTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const dataRaw = await res.json()
    return dataRaw
  } catch (error: any) {
    console.error('Error:', error.message)
    return ''
  }
}
