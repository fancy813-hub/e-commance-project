import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories } from '../data/products'
import { getRecentSearches, getSearchSuggestions, getSearchTerms, saveRecentSearch } from '../utils/search'

function ShopPage({ products, addToCart, favoriteIds, toggleFavorite }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeBrand, setActiveBrand] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const [search, setSearch] = useState(searchQuery)
  const [recentSearches, setRecentSearches] = useState(getRecentSearches)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const normalizedSearch = searchQuery.trim().toLowerCase()
  const suggestions = getSearchSuggestions(products, search, recentSearches)
  const brands = [...new Set(products.map((product) => product.brand).filter(Boolean))].sort()

  useEffect(() => {
    setSearch(searchQuery)
  }, [searchQuery])

  const directProducts = products.filter((product) => {
    const searchableText = `${product.name} ${product.brand || ''} ${product.category} ${product.description}`.toLowerCase()
    return !normalizedSearch || searchableText.includes(normalizedSearch)
  })
  const hasDirectResults = directProducts.length > 0
  const relatedProducts = normalizedSearch && !hasDirectResults
    ? products.map((product) => {
      const searchableText = `${product.name} ${product.brand || ''} ${product.category} ${product.description}`.toLowerCase()
      const score = getSearchTerms(searchQuery).reduce((total, term) => total + (searchableText.includes(term) ? 1 : 0), 0)
      return { product, score }
    }).sort((first, second) => second.score - first.score || second.product.rating - first.product.rating).map(({ product }) => product)
    : []
  const resultPool = hasDirectResults ? directProducts : relatedProducts
  const filteredProducts = resultPool.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory
    const matchesBrand = activeBrand === 'All' || product.brand === activeBrand
    return matchesCategory && matchesBrand
  }).sort((first, second) => {
    if (sortBy === 'popularity') {
      const popularityScore = (product) => (product.badge === 'Bestseller' ? 2 : product.badge === 'Trending' ? 1 : 0)
      return popularityScore(second) - popularityScore(first) || second.rating - first.rating
    }
    if (sortBy === 'newest') return second.id - first.id
    if (sortBy === 'price-low') return first.price - second.price
    if (sortBy === 'price-high') return second.price - first.price
    if (sortBy === 'rating') return second.rating - first.rating
    return 0
  })

  const handleSearch = (event) => {
    event.preventDefault()
    const query = search.trim()
    if (query) setRecentSearches(saveRecentSearch(query))
    setShowSuggestions(false)
    setSearchParams(query ? { search: query } : {})
  }

  const chooseSuggestion = (suggestion) => {
    setSearch(suggestion)
    setRecentSearches(saveRecentSearch(suggestion))
    setShowSuggestions(false)
    setSearchParams({ search: suggestion })
  }

  const clearSearch = () => {
    setSearch('')
    setActiveBrand('All')
    setShowSuggestions(false)
    setSearchParams({})
  }

  return <section className="container content-section"><div className="section-heading inline-heading"><div><p className="eyebrow">Our collection</p><h2>Shop the latest edit</h2></div></div><form className="catalog-search" role="search" onSubmit={handleSearch}><label className="sr-only" htmlFor="catalog-search">Search the catalog</label><input id="catalog-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} onClick={() => setShowSuggestions((visible) => !visible)} placeholder="Search products, categories, or brands" /><button className="primary-button" type="submit">Search</button>{searchQuery && <button className="text-button" type="button" onClick={clearSearch}>Clear</button>}{showSuggestions && suggestions.length > 0 && <div className="search-suggestions catalog-suggestions">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => chooseSuggestion(suggestion)}>{suggestion}</button>)}</div>}</form>{showSuggestions && !searchQuery && recentSearches.length > 0 && <div className="trending-searches"><strong>Trending searches</strong>{recentSearches.map((recentSearch) => <button type="button" key={recentSearch} onClick={() => chooseSuggestion(recentSearch)}>{recentSearch}</button>)}</div>}<div className="filter-row">{categories.map((category) => <button key={category} type="button" className={category === activeCategory ? 'filter-chip active' : 'filter-chip'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="catalog-controls"><label>Brand<select value={activeBrand} onChange={(event) => setActiveBrand(event.target.value)}><option>All</option>{brands.map((brand) => <option key={brand}>{brand}</option>)}</select></label><label>Sort by<select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="featured">Featured</option><option value="popularity">Popularity</option><option value="newest">Newest Arrivals</option><option value="rating">Product Rating</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>{searchQuery && (hasDirectResults ? <p className="search-summary">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found for &quot;{searchQuery}&quot;</p> : <div className="related-heading"><p className="eyebrow">Search assist</p><h2>No exact matches for &quot;{searchQuery}&quot;</h2><p>Here are related results you may like. Use the filters to narrow them down.</p></div>)}<div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />)}</div>{!filteredProducts.length && <div className="empty-state"><h2>No related products</h2><p>Try a different product, category, or brand.</p></div>}</section>
}

export default ShopPage
