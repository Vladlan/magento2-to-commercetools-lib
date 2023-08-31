import fs from 'fs'
import { magentoCategoriesToComtools } from '../src/magento-to-comtools-mappers/magento-categories-to-comtools'

const activeCategoriesData = JSON.parse(
  fs.readFileSync('example-data/magento-active-categories.json', 'utf8')
)
const transformedOutput = magentoCategoriesToComtools(activeCategoriesData)
fs.writeFileSync(
  'mapped-categories.json',
  JSON.stringify(transformedOutput, null, 2)
)
console.log('Mapping completed and saved to mapped-categories.json')
