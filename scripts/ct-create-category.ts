import fs from 'fs'
import path from 'path'

import { createCategory } from '../src/lib/commerce-tools/create-category'

const ctCategory = fs.readFileSync(
  path.resolve(__dirname, '../example-data/ct-category.json'),
  'utf8'
)

;(async () => {
  try {
    const res = await createCategory(ctCategory)
    console.log('createCateg res: ', res)
  } catch (error) {
    console.error('Script error:', error)
  }
})()
