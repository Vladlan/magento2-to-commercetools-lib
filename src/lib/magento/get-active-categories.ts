import { MAGENTO_CATEGORIES_URL } from '../../constants'
import { Category } from '../../types/category'

export async function getActiveCategories(rootCategoryId = 2) {
  const res = await fetch(MAGENTO_CATEGORIES_URL(rootCategoryId))
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const dataRaw: Category = await res.json()
  const activeCategories = dataRaw.children_data.filter((el: any) => {
    if (!el.is_active) return false

    if (el.children_data.length) {
      el.children_data = el.children_data.filter((el: any) => el.is_active)
    }

    return true
  })
  return activeCategories
}
