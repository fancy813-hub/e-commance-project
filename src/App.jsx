import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminPage from './pages/AdminPage'
import { LoginPage, SignupPage } from './pages/AuthPages'
import { CartPage, CheckoutPage } from './pages/CommercePages'
import { AboutPage, ContactPage, FooterInfoPage } from './pages/InfoPages'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import ProductDetailPage from './pages/ProductDetailPage'
import ProfilePage from './pages/ProfilePage'
import ShopPage from './pages/ShopPage'
import { AuthProvider } from './contexts/AuthContext'
import { CatalogProvider } from './contexts/CatalogContext'
import { CartProvider } from './contexts/CartContext'
import { TestimonialsProvider } from './contexts/TestimonialsContext'
import { useAuth, useCart, useCatalog, useTestimonials } from './contexts/hooks'
import './App.css'

function AdminRoute({ user, children }) {
  return user?.role === 'admin' ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { user, setUser, login, reactivateAccount, signup, updateProfile, toggleProfileStatus } = useAuth()
  const { products, favoriteIds, toggleFavorite, addProduct, updateProduct, setBestSeller, deleteProduct } = useCatalog()
  const { cart, addToCart, updateCartQuantity, removeFromCart, subtotal, shipping, total } = useCart()
  const { testimonials, addTestimonial } = useTestimonials()

  return <BrowserRouter><div className="page-shell"><Header user={user} cart={cart} favoriteIds={favoriteIds} onLogout={() => setUser(null)} /><main className="main-content"><Routes>
    <Route path="/" element={<HomePage products={products} testimonials={testimonials} user={user} addToCart={addToCart} onAddTestimonial={addTestimonial} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />} />
    <Route path="/shop" element={<ShopPage products={products} addToCart={addToCart} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />} />
    <Route path="/product/:productId" element={<ProductDetailPage products={products} addToCart={addToCart} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />} />
    <Route path="/cart" element={<CartPage cart={cart} products={products} subtotal={subtotal} shipping={shipping} total={total} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} />} />
    <Route path="/checkout" element={<CheckoutPage user={user} cart={cart} subtotal={subtotal} shipping={shipping} total={total} />} />
    <Route path="/login" element={<LoginPage onLogin={login} onReactivate={reactivateAccount} onAuthenticated={setUser} />} />
    <Route path="/signup" element={<SignupPage onSignup={signup} onAuthenticated={setUser} />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/international/:country" element={<FooterInfoPage country="International" />} />
    <Route path="/help-center" element={<FooterInfoPage title="Help Center" />} />
    <Route path="/service-center" element={<FooterInfoPage title="Service Center" />} />
    <Route path="/help/:topic" element={<FooterInfoPage title="Shopping Help" />} />
    <Route path="/corporate" element={<FooterInfoPage title="Corporate Website" />} />
    <Route path="/corporate/:topic" element={<FooterInfoPage title="Corporate and bulk purchases" />} />
    <Route path="/policies/:policy" element={<FooterInfoPage title="E&amp;L Policy" />} />
    <Route path="/service-center/:service" element={<FooterInfoPage title="Service Center" />} />
    <Route path="/about/careers" element={<FooterInfoPage title="E&amp;L Careers" />} />
    <Route path="/stores" element={<FooterInfoPage title="Official Stores" />} />
    <Route path="/profile" element={user ? <ProfilePage user={user} products={products} addToCart={addToCart} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} onUpdateProfile={updateProfile} onToggleProfileStatus={toggleProfileStatus} /> : <Navigate to="/login" replace />} />
    <Route path="/admin" element={<AdminRoute user={user}><AdminPage products={products} onAddProduct={addProduct} onUpdateProduct={updateProduct} onSetBestSeller={setBestSeller} onDeleteProduct={deleteProduct} /></AdminRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes></main><Footer /></div></BrowserRouter>
}

function App() {
  return <AuthProvider><CatalogProvider><CartProvider><TestimonialsProvider><AppRoutes /></TestimonialsProvider></CartProvider></CatalogProvider></AuthProvider>
}

export default App
