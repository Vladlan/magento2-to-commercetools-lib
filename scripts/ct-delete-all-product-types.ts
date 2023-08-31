import { getProductTypes } from '../src/lib/commerce-tools/get-product-types'
import { deleteProductType } from '../src/lib/commerce-tools/delete-product-type'
;(async () => {
  try {
    const productTypes = await getProductTypes()
    console.log('productTypes: ', productTypes)
    const productTypesData = productTypes.results.map((productType: any) => [
      productType.id,
      productType.version,
    ])
    await Promise.all(
      productTypesData.map((el: any) => deleteProductType(el[0], el[1], 'id'))
    )
    console.log('deleteProductType done')
  } catch (error) {
    console.error('Script error:', error)
  }
})()
