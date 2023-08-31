import axios, { AxiosResponse } from 'axios'

import { ProductType } from '../../types/product'
import { MAGENTO_CONFIGURABLE_PRODUCT_OPTIONS_URL } from '../../constants'

export async function getConfigurableProductOptions(
  sku: string,
  cpoId: number
) {
  if (!sku || !cpoId) return {}

  const cpos = await axios
    .get<ProductType>(MAGENTO_CONFIGURABLE_PRODUCT_OPTIONS_URL(sku, cpoId))
    .then((response: AxiosResponse) => {
      return response.data
    })
    .catch((error: any) => {
      console.error(error)
      return []
    })
  // cpos:  {
  //   id: 173,
  //   attribute_id: '93',
  //   label: 'Color',
  //   position: 1,
  //   values: [ { value_index: 49 }, { value_index: 50 }, { value_index: 52 } ],
  //   product_id: 1236
  // }
  return cpos
}
