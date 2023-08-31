import { Num } from './Num'
import { saveToFile, saveToFileAsync } from './save-to-file'

// commerce-tools
import { createAuthHeaders } from './lib/commerce-tools/utils/create-auth-headers'
import { createCategory } from './lib/commerce-tools/create-category'
import { createProductType } from './lib/commerce-tools/create-product-type'
import { createProduct } from './lib/commerce-tools/create-product'
import { deleteProductType } from './lib/commerce-tools/delete-product-type'
import { getCategories } from './lib/commerce-tools/get-categories'
import { getProductTypes } from './lib/commerce-tools/get-product-types'
import { getProducts } from './lib/commerce-tools/get-products'
import { getToken } from './lib/commerce-tools/get-token'

// Magento
import { addCartItem } from './lib/magento/cart/add-cart-item'
import { changeCartItem } from './lib/magento/cart/change-cart-item'
import { createCart } from './lib/magento/cart/create-cart'
import { getCart } from './lib/magento/cart/get-cart'
import { removeCartItem } from './lib/magento/cart/remove-cart-item'

import { addSizesColorsToProducts } from './lib/magento/get-category-products/add-sizes-colors-to-products'
import { createProductAttributesMap } from './lib/magento/get-category-products/create-product-attributes-map'
import { getConfigurableAttrIds } from './lib/magento/get-category-products/get-configurable-attr-ids'
import { getProductSearchCriteria } from './lib/magento/get-category-products/get-product-search-criteria'
import { getCategoryProducts } from './lib/magento/get-category-products'

import { getActiveCategories } from './lib/magento/get-active-categories'
import { getConfigurableProductOptions } from './lib/magento/get-configurable-product-options'
import { getProductAttributeOptions } from './lib/magento/get-product-attributes-options'
import { getProduct } from './lib/magento/get-product'

// S3
import { downloadImgByUrlToBuffer } from './lib/s3/download-img-by-url-to-buffer'
import { downloadImgByUrl } from './lib/s3/download-img-by-url'
import { isFileExistS3 } from './lib/s3/is-file-exist-s3'
import { uploadFileToS3ByUrl } from './lib/s3/upload-file-to-s3-by-url'

// types
export type { Category } from './types/category'
export type {
  ProductAttributeType,
  ConfigurableProductOptionType,
  CategoryLinkType,
  MediaGalleryEntryType,
  ProductType,
} from './types/product'
export type { MagentoResultType } from './types/magento-result'

export {
  Num,
  saveToFile,
  saveToFileAsync,
  createAuthHeaders,
  createCategory,
  createProductType,
  createProduct,
  deleteProductType,
  getCategories,
  getProductTypes,
  getProducts,
  getToken,
  addCartItem,
  changeCartItem,
  createCart,
  getCart,
  removeCartItem,
  addSizesColorsToProducts,
  createProductAttributesMap,
  getConfigurableAttrIds,
  getProductSearchCriteria,
  getCategoryProducts,
  getActiveCategories,
  getConfigurableProductOptions,
  getProductAttributeOptions,
  getProduct,
  downloadImgByUrlToBuffer,
  downloadImgByUrl,
  isFileExistS3,
  uploadFileToS3ByUrl,
}
