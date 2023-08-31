import { ProductType } from '../../../types/product'

export type AttrsMapType = {
  [key: string]: {
    [key: string]: string
  }
}

export const addSizesColorsToProducts = (
  products: ProductType[],
  attrsMap: AttrsMapType
) => {
  if (!products || !products.length) return []
  const mapped = products.map((product: ProductType) => {
    const configurableProdOptions = product?.extension_attributes
      ?.configurable_product_options
      ? product.extension_attributes.configurable_product_options.map((cpo) => {
          return {
            id: cpo.id,
            attribute_id: cpo.attribute_id,
            label: cpo.label,
            values: cpo.values.map(
              (el) => attrsMap[`${cpo.attribute_id}`][`${el.value_index}`]
            ),
          }
        })
      : []
    const mappedAttributes: any = {}
    configurableProdOptions.forEach((cpo) => {
      mappedAttributes[cpo.label] = cpo.values
    })
    return {
      id: product.id,
      sku: product.sku,
      name: product.name,
      type_id: product.type_id,
      custom_attributes: product.custom_attributes,
      configurable_product_options: configurableProdOptions,
      media_gallery_entries: product.media_gallery_entries,
      ...mappedAttributes,
    } as ProductType
  })
  return mapped
}
