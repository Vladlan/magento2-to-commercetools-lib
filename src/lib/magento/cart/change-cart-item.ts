import { MAGENTO_GUEST_CARTS_ITEM_URL } from '../../../constants'

export async function changeCartItem(
  cartId: string | number,
  itemId: string | number,
  qty: string | number
) {
  try {
    const res = await fetch(MAGENTO_GUEST_CARTS_ITEM_URL(cartId, itemId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartItem: {
          qty,
        },
      }),
    })
    if (!res.ok) {
      throw new Error('Failed to change cart item')
    }
    const dataRaw = await res.json()
    return dataRaw
  } catch (error: any) {
    console.error('Error:', error.message)
  }
}
