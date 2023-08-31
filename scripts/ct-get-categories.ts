import { getCategories } from '../src/lib/commerce-tools/get-categories'
import { saveToFile } from '../src/save-to-file'
;(async () => {
  try {
    const categories = await getCategories()
    saveToFile(categories.results, 'example-data/categories.json')
    console.log('categories: ', categories)
  } catch (error) {
    console.error('Script error:', error)
  }
})()
