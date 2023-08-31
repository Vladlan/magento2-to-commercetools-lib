import { getProductTypePossibleAttributes } from './get-product-type-possible-attributes'

export function findLeafCategories(objects: any[]) {
  const result: any = []

  function recursiveCheck(obj: any) {
    if (obj.children_data && obj.children_data.length === 0) {
      result.push(obj)
    } else if (obj.children_data && obj.children_data.length > 0) {
      for (const child of obj.children_data) {
        recursiveCheck(child)
      }
    }
  }

  for (const obj of objects) {
    recursiveCheck(obj)
  }

  return result
}

export async function mapLeafCategoriesToProductTypes(leafCategories: any[]) {
  const productTypes = leafCategories.map(async (cat) => {
    const magentoProductAttributes = await getProductTypePossibleAttributes(cat)
    const attributes = Object.entries(magentoProductAttributes).map(
      ([label, variantsObj]: [string, any]) => {
        const attributeVariants = Object.values(variantsObj)
          .filter((el) => !!(el as string).trim())
          .map((val: any) => {
            return {
              key: val,
              label: val,
            }
          })
        return {
          name: label,
          label: {
            'en-US': label,
          },
          inputTip: {
            'en-US': label,
          },
          isRequired: true,
          type: {
            name: 'enum',
            values: attributeVariants,
          },
          attributeConstraint: 'None',
          isSearchable: true,
          inputHint: 'SingleLine',
          displayGroup: 'Other',
        }
      }
    )
    return {
      name: cat.name,
      key: cat.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and'),
      description: cat.name,
      attributes,
    }
  })
  return Promise.all(productTypes)
}
