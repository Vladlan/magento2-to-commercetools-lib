import 'dotenv/config'
import { uploadFileToS3ByUrl } from '../lib/s3/upload-file-to-s3-by-url'
import { MAGENTO_IMGS_URL } from '../constants/magento'
import { getProduct } from '../lib/magento/get-product'
import { getProductAttributeOptions } from '../lib/magento/get-product-attributes-options'

const S3_URL = process.env.S3_URL as string
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME as string
const S3_FILES_URL = `${S3_URL}/${S3_BUCKET_NAME}`

export async function magentoProductsToCommercetools(
  products: any[],
  ctCategoryId: string,
  productTypeId: string
) {
  const groupedProducts = groupProductsByConfigurableProduct(products)
  return Promise.all(
    Object.values(groupedProducts).map(async (el: any) =>
      magentoProductToCommercetools(el, ctCategoryId, productTypeId)
    )
  )
}

async function magentoProductToCommercetools(
  magentoProduct: any,
  ctCategoryId: string,
  productTypeId: string
) {
  const slug = magentoProduct.custom_attributes.find(
    (el: { attribute_code: string }) => {
      return el.attribute_code === 'url_key'
    }
  )
  const description = magentoProduct.custom_attributes.find(
    (el: { attribute_code: string }) => {
      return el.attribute_code === 'description'
    }
  )
  const MAGENTO_ATTRIBUTES_MAP = await getMagentoProductAttributesMap()

  const variants = await Promise.all(
    magentoProduct.variants.map(async (variant: any) => {
      const ctProductAttributes = variant.custom_attributes.filter(
        (el: { attribute_code: string }) => {
          return el.attribute_code === 'size' || el.attribute_code === 'color'
        }
      )
      await Promise.all(
        variant.media_gallery_entries.map((el: any) => {
          return uploadFileToS3ByUrl(`${MAGENTO_IMGS_URL}/${el.file}`, el.file)
        })
      )
      const images = variant.media_gallery_entries.map((entry: any) => ({
        url: `${S3_FILES_URL}${entry.file}`,
        dimensions: {
          w: 183,
          h: 275,
        },
      }))
      const magentoProductBySKU = await getProduct(variant.sku)

      return {
        id: variant.id,
        sku: variant.sku,
        key: variant.sku,
        prices: [
          {
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: (magentoProductBySKU?.price || 0) * 100,
              fractionDigits: 2,
            },
            country: 'US',
          },
        ],
        images,
        attributes: ctProductAttributes.map(
          (el: { attribute_code: string | number; value: string | number }) => {
            return {
              name: capitalizeFirstLetter(`${el.attribute_code}`),
              value: {
                key: MAGENTO_ATTRIBUTES_MAP[el.attribute_code][el.value],
                label: MAGENTO_ATTRIBUTES_MAP[el.attribute_code][el.value],
              },
            }
          }
        ),
        assets: [],
      }
    })
  )
  const masterVariant = variants.shift()

  return {
    productType: {
      typeId: 'product-type',
      id: productTypeId,
    },
    key: slug.value.replace(/-/g, '_').replace(/&/g, 'and'),
    name: {
      'en-US': magentoProduct.name,
    },
    description: {
      'en-US': description.value,
    },
    categories: [
      {
        typeId: 'category',
        id: ctCategoryId,
      },
    ],
    slug: {
      'en-US': slug.value,
    },
    masterVariant,
    variants,
  }
}

function groupProductsByConfigurableProduct(products: any[]) {
  console.log('Magento products amount: ', products.length)

  const productsBySku: any = {}
  const magentoProductsData: any = {}
  products.forEach((product) => {
    const isConfigurable = product.type_id === 'configurable'
    if (isConfigurable) {
      product.variants = []
      productsBySku[product.sku] = product
    }
  })

  products.forEach((product) => {
    const isConfigurable = product.type_id === 'configurable'

    magentoProductsData[product.type_id] =
      magentoProductsData[product.type_id] === undefined
        ? 1
        : magentoProductsData[product.type_id] + 1

    if (isConfigurable) return

    const baseSku = product.sku.split('-')[0]
    if (productsBySku[baseSku]) {
      productsBySku[baseSku].variants.push(product)
    } else {
      console.log('Products without sku: ')
      console.log('product.sku: ', product.sku)
      console.log('product.type_id: ', product.type_id)
    }
  })
  const variantsAmount = Object.values(productsBySku).reduce(
    (acc: number, curr: any) => acc + curr.variants.length,
    0
  )
  console.log(
    'Commercetools products amount (including variants): ',
    variantsAmount + Object.keys(productsBySku).length
  )
  return productsBySku
}

let productAttributesCache: any = null

async function getMagentoProductAttributesMap(): Promise<any> {
  if (productAttributesCache) return productAttributesCache
  const rawResults = await Promise.all([
    getProductAttributeOptions('size'),
    getProductAttributeOptions('color'),
  ])

  const [sizeAttributes, colorAttributes] = rawResults.map((el) =>
    el.reduce((acc: any, curr: any) => {
      acc[curr.value] = curr.label
      return acc
    }, {})
  )

  productAttributesCache = {
    size: sizeAttributes,
    color: colorAttributes,
  }
  return productAttributesCache
}

function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}
