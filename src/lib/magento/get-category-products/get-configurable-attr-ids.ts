import { ProductType } from '../../../types/product'

export const getConfigurableAttrIds = (products: ProductType[]) => {
  const confAttrIds: {
    [key: string]: { attribute_id: string; label: string }
  } = {}
  products.forEach((product: ProductType) => {
    if (!product.extension_attributes.configurable_product_options) return
    return product.extension_attributes.configurable_product_options.forEach(
      (el) => {
        confAttrIds[el.attribute_id] = {
          attribute_id: el.attribute_id,
          label: el.label,
        }
      }
    )
  })
  return Object.values(confAttrIds)
}
