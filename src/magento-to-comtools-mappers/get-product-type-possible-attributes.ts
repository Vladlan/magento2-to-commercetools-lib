import qs from 'qs'

import { MagentoResultType } from '../types/magento-result'
import { ProductType } from '../types/product'

import { createProductAttributesMap } from '../lib/magento/get-category-products/create-product-attributes-map'
import { getConfigurableAttrIds } from '../lib/magento/get-category-products/get-configurable-attr-ids'
import { getProductSearchCriteria } from '../lib/magento/get-category-products/get-product-search-criteria'
import { MAGENTO_PRODUCTS_URL } from '../constants/magento'

export const MAGENTO_PRODUCTS_SEARCH_URL = new URL(MAGENTO_PRODUCTS_URL)

// const leafCategory = {
//   id: 28,
//   parent_id: 22,
//   name: "Shorts",
//   is_active: true,
//   position: 2,
//   level: 4,
//   product_count: 137,
//   children_data: [],
// }

export async function getProductTypePossibleAttributes(leafCategory: any) {
  const productCategoryId = leafCategory.id
  const searchCriteria = getProductSearchCriteria(productCategoryId)
  MAGENTO_PRODUCTS_SEARCH_URL.search = qs.stringify(searchCriteria)

  const attributesMap = await fetch(MAGENTO_PRODUCTS_SEARCH_URL.toString())
    .then(async (r) => {
      if (!r.ok) {
        throw new Error('Failed to fetch data')
      }
      const dataRaw = await r.json()
      const prodAttrIds = getConfigurableAttrIds(dataRaw.items)
      const attrsMap = await createProductAttributesMap(prodAttrIds)
      const newAttrMap: any = {}
      Object.keys(attrsMap).forEach((key) => {
        prodAttrIds.forEach((attr) => {
          if (key === attr.attribute_id) {
            newAttrMap[attr.label] = attrsMap[key]
          }
        })
      })

      return newAttrMap
    })
    .catch((error: any) => {
      console.error(error)
      return {
        items: [],
        total_count: 0,
        search_criteria: {},
      } as unknown as MagentoResultType<ProductType>
    })

  return attributesMap
}
