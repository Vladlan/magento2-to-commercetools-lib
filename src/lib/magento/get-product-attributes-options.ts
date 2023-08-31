import { MAGENTO_PRODUCT_ATTRIBUTE_OPTIONS_URL } from '../../constants'

export async function getProductAttributeOptions(attrId: string | number) {
  if (!attrId) return []

  const productAttrOpts = await fetch(
    MAGENTO_PRODUCT_ATTRIBUTE_OPTIONS_URL(attrId)
  )
    .then(async (res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const dataRaw = await res.json()
      return dataRaw
    })
    .catch((error: any) => {
      console.error(error)
      return []
    })
  // productAttrOpts:  [
  //   { label: ' ', value: '' },
  //   { label: 'Black', value: '49' },
  //   { label: 'Blue', value: '50' },
  //   { label: 'Brown', value: '51' },
  //   { label: 'Gray', value: '52' },
  //   { label: 'Green', value: '53' },
  //   { label: 'Lavender', value: '54' },
  //   { label: 'Multi', value: '55' },
  //   { label: 'Orange', value: '56' },
  //   { label: 'Purple', value: '57' },
  //   { label: 'Red', value: '58' },
  //   { label: 'White', value: '59' },
  //   { label: 'Yellow', value: '60' }
  // ]
  return productAttrOpts
}
