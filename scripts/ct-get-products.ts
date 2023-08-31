import { getProducts } from '../src/lib/commerce-tools/get-products'
import { saveToFile } from '../src/save-to-file'
;(async () => {
  try {
    const products = await getProducts()
    console.log('products results:', products)
    saveToFile(products.results, 'example-data/products.json')
  } catch (error) {
    console.error('Script error:', error)
  }
})()
