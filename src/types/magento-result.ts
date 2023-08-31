export type MagentoResultType<T> = {
  items: T[]
  search_criteria: {
    filter_groups: {
      filters: {
        field: string
        value: string
        condition_type: string
      }[]
    }[]
    page_size: number
    current_page: number
  }
  total_count: number
}
