import 'dotenv/config'
import { uploadFileToS3ByUrl } from '../lib/s3/upload-file-to-s3-by-url'
import { MAGENTO_IMGS_URL } from '../constants/magento'
import { getProduct } from '../lib/magento/get-product'

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
  const MAGENTO_ATTRIBUTES_MAP = getMagentoProductAttributesMap()

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
              name: capitalizeFLetter(`${el.attribute_code}`),
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

// TODO: replace with http call
function getMagentoProductAttributesMap(): any {
  const MAGENTO_SIZE_ATTRIBUTES_MAP = [
    {
      label: ' ',
      value: '',
    },
    {
      label: '55 cm',
      value: '91',
    },
    {
      label: 'XS',
      value: '166',
    },
    {
      label: '65 cm',
      value: '92',
    },
    {
      label: 'S',
      value: '167',
    },
    {
      label: '75 cm',
      value: '93',
    },
    {
      label: 'M',
      value: '168',
    },
    {
      label: '6 foot',
      value: '94',
    },
    {
      label: 'L',
      value: '169',
    },
    {
      label: '8 foot',
      value: '95',
    },
    {
      label: 'XL',
      value: '170',
    },
    {
      label: '10 foot',
      value: '96',
    },
    {
      label: '28',
      value: '171',
    },
    {
      label: '29',
      value: '172',
    },
    {
      label: '30',
      value: '173',
    },
    {
      label: '31',
      value: '174',
    },
    {
      label: '32',
      value: '175',
    },
    {
      label: '33',
      value: '176',
    },
    {
      label: '34',
      value: '177',
    },
    {
      label: '36',
      value: '178',
    },
    {
      label: '38',
      value: '179',
    },
  ].reduce((acc: any, curr: any) => {
    acc[curr.value] = curr.label
    return acc
  }, {})

  const MAGENTO_COLOR_ATTRIBUTES_MAP = [
    {
      label: ' ',
      value: '',
    },
    {
      label: 'Black',
      value: '49',
    },
    {
      label: 'Blue',
      value: '50',
    },
    {
      label: 'Brown',
      value: '51',
    },
    {
      label: 'Gray',
      value: '52',
    },
    {
      label: 'Green',
      value: '53',
    },
    {
      label: 'Lavender',
      value: '54',
    },
    {
      label: 'Multi',
      value: '55',
    },
    {
      label: 'Orange',
      value: '56',
    },
    {
      label: 'Purple',
      value: '57',
    },
    {
      label: 'Red',
      value: '58',
    },
    {
      label: 'White',
      value: '59',
    },
    {
      label: 'Yellow',
      value: '60',
    },
  ].reduce((acc: any, curr: any) => {
    acc[curr.value] = curr.label
    return acc
  }, {})

  return {
    size: MAGENTO_SIZE_ATTRIBUTES_MAP,
    color: MAGENTO_COLOR_ATTRIBUTES_MAP,
  }
}

function capitalizeFLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}
