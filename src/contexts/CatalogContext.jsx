import { useEffect, useState } from 'react'
import { initialProducts } from '../data/products'
import { CatalogContext } from './contexts'

function getStoredProducts() {
  try {
    const storedProducts = window.localStorage.getItem('ember-loam-products')
    if (!storedProducts) return initialProducts
    const savedProducts = JSON.parse(storedProducts)
    return savedProducts.map((product) => ({ ...initialProducts.find((defaultProduct) => defaultProduct.id === product.id), stock: 10, ...product }))
  } catch {
    return initialProducts
  }
}

function getStoredFavorites() {
  try {
    const storedFavorites = window.localStorage.getItem('ember-loam-favorites')
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : []
    return Array.isArray(favorites) ? favorites : []
  } catch {
    return []
  }
}

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(getStoredProducts)
  const [favoriteIds, setFavoriteIds] = useState(getStoredFavorites)

  useEffect(() => {
    window.localStorage.setItem('ember-loam-products', JSON.stringify(products))
  }, [products])

  useEffect(() => {
    window.localStorage.setItem('ember-loam-favorites', JSON.stringify(favoriteIds))
  }, [favoriteIds])

  const toggleFavorite = (productId) => setFavoriteIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId])
  const addProduct = (product) => setProducts((current) => [...current, { ...product, stock: Number(product.stock), id: Date.now() }])
  const updateProduct = (productId, changes) => setProducts((current) => current.map((product) => product.id === productId ? { ...product, ...changes } : product))
  const setBestSeller = (productId) => setProducts((current) => current.map((product) => ({
    ...product,
    badge: product.id === productId ? 'Bestseller' : product.badge === 'Bestseller' ? 'New' : product.badge,
  })))
  const deleteProduct = (productId) => setProducts((current) => current.filter((product) => product.id !== productId))

  return <CatalogContext.Provider value={{ products, favoriteIds, toggleFavorite, addProduct, updateProduct, setBestSeller, deleteProduct }}>{children}</CatalogContext.Provider>
}
