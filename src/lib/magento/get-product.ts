import { ProductType } from '../../types/product'
import { getConfigurableAttrIds } from './get-category-products/get-configurable-attr-ids'
import { createProductAttributesMap } from './get-category-products/create-product-attributes-map'
import { addSizesColorsToProducts } from './get-category-products/add-sizes-colors-to-products'
import { MAGENTO_PRODUCT_BY_SKU_URL } from '../../constants/magento'

export async function getProduct(sku: string): Promise<ProductType | null> {
  if (!sku) return null

  const product = await fetch(MAGENTO_PRODUCT_BY_SKU_URL(sku))
    .then(async (res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch product by sku')
      }
      const data = await res.json()
      if (data.type_id !== 'configurable') return data

      const prodAttrIds = getConfigurableAttrIds([data])
      const attrsMap = await createProductAttributesMap(prodAttrIds)
      const [mapped] = addSizesColorsToProducts([data], attrsMap)

      return mapped
    })
    .catch((error: any) => {
      console.error(error)
      return null
    })
  return product
}
