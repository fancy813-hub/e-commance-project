import { Link, useParams } from 'react-router-dom'
import { formatNaira } from '../utils/currency'
import NotFound from './NotFound'

function ProductDetailPage({ products, addToCart, favoriteIds, toggleFavorite }) {
  const { productId } = useParams()
  const product = products.find((entry) => entry.id === Number(productId))
  if (!product) return <NotFound />

  const isFavorite = favoriteIds.includes(product.id)

  return <section className="container product-detail-section"><div className="product-detail-card"><div className="product-detail-image"><img src={product.image} alt={product.name} /><button type="button" className={isFavorite ? 'favorite-button active' : 'favorite-button'} onClick={() => toggleFavorite(product.id)} aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`} aria-pressed={isFavorite}>{isFavorite ? '♥' : '♡'}</button></div><div className="product-detail-copy"><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><div className="rating-row"><span>★★★★★</span><span>{product.rating} rating</span></div><div className="price-row"><strong>{formatNaira(product.price)}</strong><span>{formatNaira(product.originalPrice)}</span></div><p className={product.stock > 0 ? 'stock-status' : 'stock-status sold-out'}>{product.stock > 0 ? `${product.stock} left in stock` : 'Sold out'}</p><p>{product.description}</p><div className="detail-actions"><button type="button" className="primary-button" onClick={() => addToCart(product)} disabled={product.stock <= 0}>{product.stock > 0 ? 'Add to cart' : 'Sold out'}</button><Link className="secondary-button" to="/shop">Continue shopping</Link></div><ul className="feature-list"><li>Free shipping over {formatNaira(100)}</li><li>30-day returns and exchanges</li><li>Premium materials and careful craftsmanship</li></ul></div></div></section>
}

export default ProductDetailPage
