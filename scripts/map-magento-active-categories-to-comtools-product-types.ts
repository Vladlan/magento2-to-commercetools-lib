import fs from 'fs'
import {
  findLeafCategories,
  mapLeafCategoriesToProductTypes,
} from '../src/magento-to-comtools-mappers/magento-leaf-categories-to-comtools-product-types'

// Read JSON files
async function main() {
  const activeCategoriesData = JSON.parse(
    fs.readFileSync('example-data/magento-active-categories.json', 'utf8')
  )
  const leafCategories = findLeafCategories(activeCategoriesData)
  const productTypes = await mapLeafCategoriesToProductTypes(leafCategories)
  fs.writeFileSync(
    'example-data/mapped-product-types.json',
    JSON.stringify(productTypes, null, 2)
  )
}
main()
