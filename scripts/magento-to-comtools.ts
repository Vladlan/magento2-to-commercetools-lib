import fs from 'fs'

import { createCategory } from '../src/lib/commerce-tools/create-category'
import { createProduct } from '../src/lib/commerce-tools/create-product'
import { createProductType } from '../src/lib/commerce-tools/create-product-type'
import { getActiveCategories } from '../src/lib/magento/get-active-categories'
import { getCategoryProducts } from '../src/lib/magento/get-category-products'
import { saveToFile, saveToFileAsync } from '../src/save-to-file'
import { magentoCategoriesToComtools } from '../src/magento-to-comtools-mappers/magento-categories-to-comtools'
import {
  findLeafCategories,
  mapLeafCategoriesToProductTypes,
} from '../src/magento-to-comtools-mappers/magento-leaf-categories-to-comtools-product-types'
import { magentoProductsToCommercetools } from '../src/magento-to-comtools-mappers/magento-product-to-comtools'

async function main() {
  const activeCategories = await getActiveCategories(1)
  saveToFile(activeCategories, 'migration-script-temp/active-categories.json')
  const ctCategories = magentoCategoriesToComtools(activeCategories)
  saveToFile(ctCategories, 'migration-script-temp/ct-categories.json')

  for (let i = 0; i < ctCategories.length; i++) {
    const ctCategory = ctCategories[i]
    const createdCategory = await createCategoryComtools(ctCategory)
    mutateCategoriesIds(ctCategory.id, createdCategory.id, ctCategories)
  }

  const leafCategories = findLeafCategories(activeCategories)
  const productTypes = await mapLeafCategoriesToProductTypes(leafCategories)
  saveToFile(productTypes, 'migration-script-temp/product-types-comtools.json')

  for (let i = 0; i < leafCategories.length; i++) {
    const leafCategory = leafCategories[i]
    const comtoolProductTypeData = productTypes.find(
      (el: any) => el.name === leafCategory.name
    )
    const comtoolCategory = ctCategories.find(
      (el: any) => el.name['en-US'] === leafCategory.name
    )
    const comtoolProductType = await createProductTypeComtools(
      comtoolProductTypeData
    )

    const magentoProducts = await getCategoryProducts(leafCategory.id, false)
    saveToFile(magentoProducts, 'migration-script-temp/magentoProducts.json')

    if (!comtoolCategory?.id) {
      console.log('Failed to create products for leafCategory: ', leafCategory)
      console.log('comtoolCategory2222: ', comtoolCategory)
      continue
    }
    if (!comtoolProductType?.id) {
      console.log('Failed to create products for category: ', leafCategory)
      console.log('comtoolProductType222222: ', comtoolProductType)
      continue
    }

    const comtoolProducts = await magentoProductsToCommercetools(
      magentoProducts.items,
      comtoolCategory.id,
      comtoolProductType.id
    )
    saveToFile(
      comtoolProducts,
      `migration-script-temp/${leafCategory.name}-products-to-save-in-comtools.json`
    )
    for (const comtoolProduct of comtoolProducts) {
      await createProductComtools(comtoolProduct)
    }
  }
}

main()

async function createCategoryComtools(data: any) {
  const fileName = `migration-script-temp/category_${data.key}.json`
  const cachedValue = getFromCache(fileName)
  if (cachedValue) return cachedValue

  const res = await createCategory(data)
  console.log('createCategory: ', res)
  await saveToFile(res || data, fileName)
  return res
}

async function createProductComtools(data: any) {
  const fileName = `migration-script-temp/product_${data.key}.json`
  const cachedValue = getFromCache(fileName)
  if (cachedValue) return cachedValue

  const res = await createProduct(data)
  console.log('createProduct: ', res)
  await saveToFile(res || data, fileName)
  return res
}
async function createProductTypeComtools(data: any) {
  const fileName = `migration-script-temp/product-type_${data.name}.json`
  const cachedValue = getFromCache(fileName)
  if (cachedValue) return cachedValue

  const res = await createProductType(data)
  console.log('createProductType: ', res)
  if (!res) {
    console.log('Failed to create productType: ', data)
  }
  await saveToFileAsync(res || data, fileName)
  return res
}

function mutateCategoriesIds(
  oldId: string | number,
  newId: string,
  categories: any[]
) {
  for (const category of categories) {
    if (category.id === oldId) {
      category.id = newId
    }
    if (category?.parent?.id === oldId) {
      category.parent.id = newId
    }
  }
}

function getFromCache(fileName: string) {
  const isExist = fs.existsSync(fileName)
  if (isExist) {
    const data = fs.readFileSync(fileName, 'utf8')
    if (!data) return null
    return JSON.parse(data)
  }
  return null
}
