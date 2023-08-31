import { AttrsMapType } from './add-sizes-colors-to-products'
import { getProductAttributeOptions } from '../get-product-attributes-options'

type ProdAttrId = {
  attribute_id: string
  label: string
}

type ACC = {
  [key: string]: string
}

export const createProductAttributesMap = async (prodAttrIds: ProdAttrId[]) => {
  const attrsMap: AttrsMapType = {}
  await Promise.all(
    prodAttrIds.map(async (el) => {
      const attrsValues = await getProductAttributeOptions(el.attribute_id)
      attrsMap[el.attribute_id] = attrsValues.reduce(
        (acc: ACC, el: { label: string; value: string }) => {
          acc[el.value] = el.label
          return acc
        },
        {}
      )
      return {
        attribute_id: el.attribute_id,
        values: attrsValues,
      }
    })
  )
  return attrsMap
}
