import { MAGENTO_GUEST_CART_URL } from '../../../constants/magento'

export async function getCart(cartId: string | number) {
  try {
    const res = await fetch(MAGENTO_GUEST_CART_URL(cartId))
    if (!res.ok) {
      throw new Error('Failed to fetch cart')
    }
    const dataRaw = await res.json()
    return dataRaw
  } catch (error: any) {
    console.error('Error:', error.message)
  }
}
