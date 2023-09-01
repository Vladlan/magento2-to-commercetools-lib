export const getProductSearchCriteria = (
  productCategoryId: number | string,
  configurableOnly = true
) => {
  const filters = [
    {
      field: 'category_id',
      value: productCategoryId,
      condition_type: 'eq',
    },
  ]
  if (configurableOnly) {
    filters.push({
      field: 'type_id',
      value: 'configurable',
      condition_type: 'eq',
    })
  }

  // TODO: add support for pagination to migrate huge catalogs
  return {
    searchCriteria: {
      filter_groups: [
        {
          filters,
        },
      ],
      pageSize: 10_000,
      currentPage: 1,
    },
  }
}
