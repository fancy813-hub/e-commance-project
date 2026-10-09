import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

function ProfilePage({ user, products, addToCart, favoriteIds, toggleFavorite, onUpdateProfile, onToggleProfileStatus }) {
  const fileInputRef = useRef(null)
  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onUpdateProfile(reader.result)
    reader.readAsDataURL(file)
  }
  const favoriteProducts = products.filter((product) => favoriteIds.includes(product.id))

  return (
    <section className="container content-section profile-page">
      <div className="profile-header">
        {user.profileImage ? <img className="profile-avatar" src={user.profileImage} alt={`${user.name}'s profile`} /> : <div className="profile-avatar" aria-hidden="true">{user.name.slice(0, 1).toUpperCase()}</div>}
        <div><p className="eyebrow">Your account</p><h1>{user.name}</h1><p>Manage your customer profile and account details.</p><button type="button" className="secondary-button profile-upload-button" onClick={() => fileInputRef.current?.click()}>Choose profile picture</button><input ref={fileInputRef} className="profile-file-input" type="file" accept="image/*" onChange={handleImageChange} /></div>
      </div>
      <div className="profile-grid">
        <article className="profile-card"><span>Full name</span><strong>{user.name}</strong></article>
        <article className="profile-card"><span>Email address</span><strong>{user.email}</strong></article>
        <article className="profile-card"><span>Member since</span><strong>{user.joinedAt || 'Recently joined'}</strong></article>
        <article className="profile-card"><span>Account type</span><strong>{user.role === 'admin' ? 'CEO administrator' : 'Customer'}</strong></article>
      </div>
      <section className="profile-favorites" id="favorites"><div className="section-heading inline-heading"><div><p className="eyebrow">Saved for later</p><h2>Your favorites</h2></div><span>{favoriteProducts.length} saved</span></div>{favoriteProducts.length ? <div className="product-grid">{favoriteProducts.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />)}</div> : <div className="empty-state"><h2>No favorites yet</h2><p>Tap the heart on any product to save it here.</p><Link className="primary-button" to="/shop">Explore products</Link></div>}</section>
      <div className="profile-actions"><Link className="secondary-button" to="/shop">Continue shopping</Link>{user.role !== 'admin' && <button type="button" className={user.active === false ? 'primary-button' : 'secondary-button'} onClick={onToggleProfileStatus}>{user.active === false ? 'Reactivate profile' : 'Deactivate profile'}</button>}</div>
    </section>
  )
}

export default ProfilePage
