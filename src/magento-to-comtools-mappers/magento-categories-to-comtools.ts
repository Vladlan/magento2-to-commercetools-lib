export function magentoCategoriesToComtools(inputCategories: any) {
  const transformedCategories: any = []

  function traverse(categories: any, parent: any) {
    for (const category of categories) {
      const transformedCategory = magentoCategoryToComtools(category, parent)
      transformedCategories.push(transformedCategory)

      if (category.children_data && category.children_data.length > 0) {
        traverse(category.children_data, transformedCategory)
      }
    }
  }

  traverse(inputCategories, null)

  return transformedCategories
}

export function magentoCategoryToComtools(category: any, parent: any = null) {
  const transformedCategory: any = {
    id: category.id,
    key: category.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and'),
    name: {
      'en-US': category.name,
    },
    slug: {
      'en-US': category.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/&/g, 'and'),
    },
    orderHint: (1 - (category.level * 10 + category.position) * 0.01).toFixed(
      3
    ), // Generating a random orderHint for demonstration
  }

  if (parent) {
    transformedCategory.parent = {
      typeId: 'category',
      id: parent.id,
    }
  }

  return transformedCategory
}
