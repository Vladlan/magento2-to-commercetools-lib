import { deleteProductType } from '../src/lib/commerce-tools/delete-product-type'
;(async () => {
  try {
    const res = await deleteProductType('jackets', 1)
    console.log('deleteProductType res: ', res)
  } catch (error) {
    console.error('Script error:', error)
  }
})()
