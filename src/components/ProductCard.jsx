import { Link } from 'react-router-dom'
import { formatNaira } from '../utils/currency'

function ProductCard({ product, addToCart, favoriteIds, toggleFavorite }) {
  const isFavorite = favoriteIds.includes(product.id)

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <span className="product-badge">{product.badge}</span>
        <button type="button" className={isFavorite ? 'favorite-button active' : 'favorite-button'} onClick={() => toggleFavorite(product.id)} aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`} aria-pressed={isFavorite}>{isFavorite ? '♥' : '♡'}</button>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          <span>★ {product.rating}</span>
        </div>
        <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <div className="price-row">
          <strong>{formatNaira(product.price)}</strong>
          <span>{formatNaira(product.originalPrice)}</span>
        </div>
        <p className={product.stock > 0 ? 'stock-status' : 'stock-status sold-out'}>{product.stock > 0 ? `${product.stock} left in stock` : 'Sold out'}</p>
      </div>
      <button type="button" className="primary-button full-width" onClick={() => addToCart(product)} disabled={product.stock <= 0}>
        {product.stock > 0 ? 'Add to cart' : 'Sold out'}
      </button>
    </article>
  )
}

export default ProductCard
