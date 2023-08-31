export type ProductAttributeType = {
  attribute_code: string
  value: string
}

export type ConfigurableProductOptionType = {
  id: number
  attribute_id: string
  label: string
  position: number
  values: { value_index: number }[]
}

export type CategoryLinkType = {
  position: number
  category_id: string
}

export type MediaGalleryEntryType = {
  id: number
  media_type: string
  label: string
  position: number
  disabled: boolean
  types: string[]
  file: string
}

export type ProductType = {
  id: number
  sku: string
  name: string
  attribute_set_id: number
  price: number
  min_price: number
  status: number
  visibility: number
  type_id: string
  created_at: string
  updated_at: string
  weight: number
  tier_prices: any[]
  extension_attributes: {
    website_ids: number[]
    category_links: CategoryLinkType[]
    configurable_product_links: number[]
    configurable_product_options: ConfigurableProductOptionType[]
  }
  product_links: any[]
  options: any[]
  custom_attributes: ProductAttributeType[]
  media_gallery_entries: MediaGalleryEntryType[]
  Color?: string[]
  Size?: string[]
}
