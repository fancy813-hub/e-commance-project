import { useContext } from 'react'
import { AuthContext, CartContext, CatalogContext, TestimonialsContext } from './contexts'

function useRequiredContext(context, hookName, providerName) {
  const value = useContext(context)
  if (!value) throw new Error(`${hookName} must be used within ${providerName}`)
  return value
}

export function useAuth() {
  return useRequiredContext(AuthContext, 'useAuth', 'AuthProvider')
}

export function useCatalog() {
  return useRequiredContext(CatalogContext, 'useCatalog', 'CatalogProvider')
}

export function useCart() {
  return useRequiredContext(CartContext, 'useCart', 'CartProvider')
}

export function useTestimonials() {
  return useRequiredContext(TestimonialsContext, 'useTestimonials', 'TestimonialsProvider')
}
