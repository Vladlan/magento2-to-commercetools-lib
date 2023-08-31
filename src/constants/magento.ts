import 'dotenv/config'

const MAGENTO_URL = process.env.MAGENTO_URL || 'https://magento.test'
export const MAGENTO_IMGS_URL = `${MAGENTO_URL}/media/catalog/product`
export const MAGENTO_PRODUCTS_URL = `${MAGENTO_URL}/rest/all/V1/products`
export const MAGENTO_GUEST_CARTS_URL = `${MAGENTO_URL}/rest/default/V1/guest-carts`

export const MAGENTO_CATEGORIES_URL = (rootCategoryId: string | number) =>
  `${MAGENTO_URL}/rest/all/V1/categories?rootCategoryId=${rootCategoryId}`
export const MAGENTO_PRODUCT_ATTRIBUTE_OPTIONS_URL = (
  attrId: string | number
) => `${MAGENTO_URL}/rest/all/V1/products/attributes/${attrId}/options`
export const MAGENTO_CONFIGURABLE_PRODUCT_OPTIONS_URL = (
  sku: string,
  optionId: string | number
) =>
  `${MAGENTO_URL}/rest/all/V1/configurable-products/${sku}/options/${optionId}`
export const MAGENTO_PRODUCT_BY_SKU_URL = (sku: string) =>
  `${MAGENTO_URL}/rest/all/V1/products/${sku}?editMode=false&storeId=1&forceReload=false`

export const MAGENTO_GUEST_CART_URL = (cartId: string | number) =>
  `${MAGENTO_GUEST_CARTS_URL}/${cartId}`
export const MAGENTO_GUEST_CARTS_ITEM_URL = (
  cartId: string | number,
  itemId: string | number
) => `${MAGENTO_URL}/rest/default/V1/guest-carts/${cartId}/items/${itemId}`
export const MAGENTO_GUEST_CART_ADD_ITEM_URL = (cartId: string) =>
  `${MAGENTO_URL}/rest/default/V1/guest-carts/${cartId}/items`
