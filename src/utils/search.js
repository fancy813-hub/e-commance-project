export const recentSearchesKey = 'ember-loam-recent-searches'

export function getRecentSearches() {
  try {
    const searches = JSON.parse(window.localStorage.getItem(recentSearchesKey) || '[]')
    return Array.isArray(searches) ? searches.slice(0, 5) : []
  } catch {
    return []
  }
}

export function saveRecentSearch(query) {
  const cleanedQuery = query.trim()
  if (!cleanedQuery) return getRecentSearches()
  const searches = [cleanedQuery, ...getRecentSearches().filter((search) => search.toLowerCase() !== cleanedQuery.toLowerCase())].slice(0, 5)
  window.localStorage.setItem(recentSearchesKey, JSON.stringify(searches))
  return searches
}

export function getSearchSuggestions(products, query, recentSearches) {
  const normalizedQuery = query.trim().toLowerCase()
  const productSuggestions = products.flatMap((product) => [product.name, product.brand, product.category]).filter(Boolean)
  const allSuggestions = [...recentSearches, ...productSuggestions]
  return [...new Set(allSuggestions)].filter((suggestion) => !normalizedQuery || suggestion.toLowerCase().includes(normalizedQuery)).slice(0, 6)
}

export function getSearchTerms(query) {
  return query.toLowerCase().split(/\s+/).map((term) => term.replace(/[^a-z0-9]/g, '')).filter((term) => term.length > 2)
}