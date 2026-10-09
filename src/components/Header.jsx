import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header({ user, cart, favoriteIds, onLogout }) {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={menuOpen ? 'site-header account-menu-open' : 'site-header'}>
      <div className="container nav-wrap">
        <div className="brand-menu-group">
          <button type="button" className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
          <Link className="brand" to="/">Ember & Loam</Link>
        </div>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <div className="mobile-menu-heading"><strong>Menu</strong><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button></div>
          <div className="mobile-menu-section-label">Explore</div>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          {user?.role === 'admin' && <NavLink to="/admin" onClick={() => setMenuOpen(false)}>Admin</NavLink>}
          <div className="mobile-menu-account">
            <div className="mobile-menu-section-label">{user ? 'Your account' : 'Account'}</div>
            {user ? <>
              <div className="mobile-menu-user"><span className="mobile-menu-avatar">{user.name.slice(0, 1).toUpperCase()}</span><span><strong>{user.name}</strong><small>{user.email}</small></span></div>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Account details</Link>
              <Link to="/profile#favorites" onClick={() => setMenuOpen(false)}>Wishlist <span className="mobile-menu-count">{favoriteIds.length}</span></Link>
              <button type="button" onClick={() => { onLogout(); setMenuOpen(false) }}>Logout</button>
            </> : <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link className="mobile-menu-signup" to="/signup" onClick={() => setMenuOpen(false)}>Create an account</Link>
              <Link to="/profile#favorites" onClick={() => setMenuOpen(false)}>Wishlist <span className="mobile-menu-count">{favoriteIds.length}</span></Link>
            </>}
          </div>
        </nav>
        <div className="mobile-header-actions"><Link className="mobile-cart-button" to="/cart" aria-label={`Open cart with ${itemCount} items`}>Cart <span>{itemCount}</span></Link></div>
        <div className="nav-actions">
          {user ? <><Link className="account-pill" to="/profile">Hi, {user.name}</Link><button type="button" className="ghost-button" onClick={onLogout}>Logout</button></> : <><Link className="ghost-button" to="/login">Login</Link><Link className="ghost-button" to="/signup">Sign up</Link></>}
          <Link className="cart-button" to="/cart">Cart <span>{itemCount}</span></Link>
        </div>
        {menuOpen && <button type="button" className="account-backdrop" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}
      </div>
    </header>
  )
}

export default Header
