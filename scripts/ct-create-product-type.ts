import { createProductType } from '../src/lib/commerce-tools/create-product-type'
import fs from 'fs'
import path from 'path'

const ctProductType = JSON.parse(
  JSON.stringify(
    fs.readFileSync(
      path.resolve(__dirname, '../example-data/ct-product-type.json'),
      'utf8'
    )
  )
)

;(async () => {
  try {
    const res = await createProductType(ctProductType)
    console.log('createProductType res: ', res)
  } catch (error) {
    console.error('Script error:', error)
  }
})()
