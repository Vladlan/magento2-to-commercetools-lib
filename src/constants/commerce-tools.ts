import 'dotenv/config'

const PROJECT_KEY = process.env.COMMERCETOOLS_PROJECT_KEY
const COMMERCETOOLS_API_URL = process.env.COMMERCETOOLS_API_URL

export const COMMERCE_TOOLS_PROJECT_URL = `${COMMERCETOOLS_API_URL}/${PROJECT_KEY}`