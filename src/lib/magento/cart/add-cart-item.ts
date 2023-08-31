import { MAGENTO_GUEST_CART_ADD_ITEM_URL } from '../../../constants/magento'

export async function addCartItem(cartId: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  }
  try {
    const res = await fetch(
      MAGENTO_GUEST_CART_ADD_ITEM_URL(cartId),
      requestOptions
    )
    if (!res.ok) {
      throw new Error('Failed to add cart item')
    }
    const dataRaw = await res.json()
    return dataRaw
  } catch (error: any) {
    console.error('Error:', error.message)
  }
}
