import { MagentoResultType } from '../../../types/magento-result'
import { ProductType } from '../../../types/product'
import qs from 'qs'
import { addSizesColorsToProducts } from './add-sizes-colors-to-products'
import { getConfigurableAttrIds } from './get-configurable-attr-ids'
import { createProductAttributesMap } from './create-product-attributes-map'
import { getProductSearchCriteria } from './get-product-search-criteria'
import { MAGENTO_PRODUCTS_URL } from '../../../constants/magento'

export const MAGENTO_PRODUCTS_SEARCH_URL = new URL(MAGENTO_PRODUCTS_URL)

export async function getCategoryProducts(
  id: number | string,
  configurableOnly = true
) {
  const defaultProducts = {
    items: [],
    total_count: 0,
    search_criteria: {
      page_size: 0,
      current_page: 0,
    },
  } as unknown as MagentoResultType<ProductType>
  if (!id) return defaultProducts

  const searchCriteria = getProductSearchCriteria(id, configurableOnly)
  MAGENTO_PRODUCTS_SEARCH_URL.search = qs.stringify(searchCriteria)
  const products = await fetch(MAGENTO_PRODUCTS_SEARCH_URL.toString())
    .then(async (r) => {
      if (!r.ok) {
        throw new Error(`Failed to get category ${id} products`)
      }
      const dataRaw = await r.json()
      const prodAttrIds = getConfigurableAttrIds(dataRaw.items)
      const attrsMap = await createProductAttributesMap(prodAttrIds)
      const mapped = addSizesColorsToProducts(dataRaw.items, attrsMap)
      return {
        items: mapped,
        total_count: dataRaw.total_count,
        search_criteria: dataRaw.search_criteria,
      }
    })
    .catch((error: any) => {
      console.error(error)
      return {
        items: [],
        total_count: 0,
        search_criteria: {},
      } as unknown as MagentoResultType<ProductType>
    })
  return products
}
