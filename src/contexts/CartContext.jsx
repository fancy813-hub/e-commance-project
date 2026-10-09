import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './contexts'
import { useCatalog } from './hooks'

export function CartProvider({ children }) {
  const { products } = useCatalog()
  const [cart, setCart] = useState([{ id: 1, quantity: 1 }, { id: 2, quantity: 1 }])

  useEffect(() => {
    setCart((current) => current.filter((item) => products.some((product) => product.id === item.id)))
  }, [products])

  const addToCart = (product) => setCart((current) => {
    const existing = current.find((item) => item.id === product.id)
    if (product.stock <= 0 || existing?.quantity >= product.stock) return current
    return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { id: product.id, quantity: 1 }]
  })

  const updateCartQuantity = (productId, delta) => setCart((current) => current.map((item) => {
    if (item.id !== productId) return item
    const product = products.find((entry) => entry.id === productId)
    return { ...item, quantity: Math.min(product?.stock ?? item.quantity, Math.max(0, item.quantity + delta)) }
  }).filter((item) => item.quantity > 0))

  const removeFromCart = (productId) => setCart((current) => current.filter((item) => item.id !== productId))
  const subtotal = useMemo(() => cart.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.id)
    return total + (product ? product.price * item.quantity : 0)
  }, 0), [cart, products])
  const shipping = subtotal > 0 ? 18 : 0
  const total = subtotal + shipping

  return <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart, subtotal, shipping, total }}>{children}</CartContext.Provider>
}
