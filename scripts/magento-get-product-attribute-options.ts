import { getProductAttributeOptions } from '../src/lib/magento/get-product-attributes-options'
import { saveToFile } from '../src/save-to-file'
;(async () => {
  try {
    const res = await getProductAttributeOptions('size')
    console.log('getProductAttributeOptions results:', res)
    saveToFile(res, 'example-data/getProductAttributeOptions.json')
  } catch (error) {
    console.error('Script error:', error)
  }
})()
