import fs from 'fs'
import { magentoProductsToCommercetools } from '../src/magento-to-comtools-mappers/magento-product-to-comtools'

const category23Products = JSON.parse(
  fs.readFileSync('example-data/magento-category-23-products.json', 'utf8')
)

const ctCategory23 = {
  id: '2779ec58-4e39-4b16-bdb9-b079dcaac0aa',
  key: 'jackets',
  name: {
    'en-US': 'Jackets',
  },
  slug: {
    'en-US': 'jackets',
  },
  orderHint: '0.590',
  parent: {
    typeId: 'category',
    id: '36178946-0117-4f9d-b69c-470f03fa8f70',
  },
}

const ctProductType = {
  id: '00f34fbc-38e3-479c-875b-06449be4e416',
  name: 'Jackets',
  description: 'Jackets',
  classifier: 'Complex',
  key: 'jackets',
}

const transformedOutput = magentoProductsToCommercetools(
  category23Products.items,
  ctCategory23.id,
  ctProductType.id
)

const OUTPUT_FILE_NAME = 'mapped-magento-category-23-products.json'
fs.writeFileSync(OUTPUT_FILE_NAME, JSON.stringify(transformedOutput, null, 2))
console.log(`Mapping completed and saved to ${OUTPUT_FILE_NAME}`)
