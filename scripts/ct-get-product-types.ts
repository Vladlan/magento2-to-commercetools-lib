import { getProductTypes } from '../src/lib/commerce-tools/get-product-types'
;(async () => {
  try {
    const productTypes = await getProductTypes()
    console.log('product-types: ', productTypes)
  } catch (error) {
    console.error('Script error:', error)
  }
})()
