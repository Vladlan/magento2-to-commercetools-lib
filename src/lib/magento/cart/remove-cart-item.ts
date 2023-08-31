import { MAGENTO_GUEST_CARTS_ITEM_URL } from '../../../constants/magento'

export async function removeCartItem(
  cartId: string | number,
  itemId: string | number
) {
  try {
    const res = await fetch(MAGENTO_GUEST_CARTS_ITEM_URL(cartId, itemId), {
      method: 'DELETE',
    })
    if (!res.ok) {
      throw new Error('Failed to remove cart item')
    }
    const dataRaw = await res.json()
    return dataRaw
  } catch (error: any) {
    console.error('Error:', error.message)
  }
}
