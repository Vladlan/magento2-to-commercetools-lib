import fs from 'fs'
import path from 'path'

import { createProduct } from '../src/lib/commerce-tools/create-product'

const ctProduct = JSON.parse(
  JSON.stringify(
    fs.readFileSync(
      path.resolve(__dirname, '../example-data/ct-product.json'),
      'utf8'
    )
  )
)

;(async () => {
  try {
    const res = await createProduct(ctProduct)
    console.log('create product res: ', res)
  } catch (error: any) {
    console.log('error: ', error)
    console.error('Error status code: ', error.response?.data?.statusCode)
    console.error('Error message: ', error.response?.data?.message)
  }
})()
