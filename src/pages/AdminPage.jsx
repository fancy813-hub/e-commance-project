import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/products'
import { formatNaira } from '../utils/currency'

const emptyForm = { name: '', brand: '', category: 'Women', price: '', originalPrice: '', rating: '4.8', stock: '10', description: '', image: '', badge: 'New' }

function AdminPage({ products, onAddProduct, onUpdateProduct, onSetBestSeller, onDeleteProduct }) {
  const [form, setForm] = useState(emptyForm)
  const [bestSellerName, setBestSellerName] = useState('')
  const [bestSellerImage, setBestSellerImage] = useState('')
  const [message, setMessage] = useState('')
  const [bestSellerMessage, setBestSellerMessage] = useState('')
  const fileInputRef = useRef(null)
  const bestSellerFileInputRef = useRef(null)
  const bestSeller = products.find((product) => product.badge === 'Bestseller')

  useEffect(() => {
    setBestSellerName(bestSeller?.name || '')
    setBestSellerImage(bestSeller?.image || '')
  }, [bestSeller?.id, bestSeller?.name, bestSeller?.image])

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const handleImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((current) => ({ ...current, image: reader.result }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddProduct({ ...form, price: Number(form.price), originalPrice: Number(form.originalPrice || form.price), rating: Number(form.rating), stock: Number(form.stock) })
    setForm(emptyForm)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setMessage('Product added to your storefront.')
    window.setTimeout(() => setMessage(''), 3000)
  }

  const handleBestSellerImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setBestSellerImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handleBestSellerSubmit = (event) => {
    event.preventDefault()
    if (!bestSeller || !bestSellerName.trim() || !bestSellerImage) return
    onUpdateProduct(bestSeller.id, { name: bestSellerName.trim(), image: bestSellerImage })
    setBestSellerMessage('Best seller updated on your storefront.')
    window.setTimeout(() => setBestSellerMessage(''), 3000)
  }

  return (
    <section className="container admin-section">
      <div className="admin-heading">
        <div><p className="eyebrow">Store management</p><h1>Product studio</h1><p>Add new products, update your catalog, and keep your storefront fresh.</p></div>
        <Link className="secondary-button" to="/shop">View storefront</Link>
      </div>
      <div className="admin-grid">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-heading"><h2>Add a product</h2><p>Customers will see it as soon as you publish it.</p></div>
          <div className="form-row">
            <label>Product name<input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Willow Linen Shirt" required /></label>
            <label>Brand<input name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Willow Studio" required /></label>
          </div>
          <div className="form-row">
            <label>Category<select name="category" value={form.category} onChange={handleChange}>{categories.filter((category) => category !== 'All').map((category) => <option key={category}>{category}</option>)}</select></label>
          </div>
          <div className="form-row">
            <label>Sale price<input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" required /></label>
            <label>Original price<input name="originalPrice" type="number" min="0" step="0.01" value={form.originalPrice} onChange={handleChange} placeholder="Optional" /></label>
          </div>
          <div className="form-row">
            <label>Rating<input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} /></label>
            <label>Quantity in stock<input name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required /></label>
          </div>
          <div className="form-row">
            <label>Badge<select name="badge" value={form.badge} onChange={handleChange}><option>New</option><option>Bestseller</option><option>Trending</option><option>Limited</option><option>Editor Pick</option></select></label>
          </div>
          <label>Description<textarea name="description" value={form.description} onChange={handleChange} placeholder="Tell customers what makes this product special." rows="4" required /></label>
          <div className="image-upload">
            <div><strong>Product image</strong><p>Upload a local image or paste a hosted image URL.</p></div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} />
            <input name="image" value={form.image.startsWith('data:') ? '' : form.image} onChange={handleChange} placeholder="https://..." required={!form.image.startsWith('data:')} />
          </div>
          {form.image && <img className="admin-image-preview" src={form.image} alt="Product preview" />}
          <button type="submit" className="primary-button">Publish product</button>
          {message && <p className="success-text">{message}</p>}
        </form>
        <aside className="inventory-panel">
          <form className="best-seller-editor" onSubmit={handleBestSellerSubmit}>
            <div className="admin-form-heading"><p className="eyebrow">Featured product</p><h2>Update best seller</h2><p>Edit the product shown as your best seller on the storefront.</p></div>
            {bestSeller ? <>
              <label>Product name<input value={bestSellerName} onChange={(event) => setBestSellerName(event.target.value)} required /></label>
              <div className="image-upload">
                <div><strong>Best seller image</strong><p>Upload a local image or paste a hosted image URL.</p></div>
                <input ref={bestSellerFileInputRef} type="file" accept="image/*" onChange={handleBestSellerImage} />
                <input value={bestSellerImage.startsWith('data:') ? '' : bestSellerImage} onChange={(event) => setBestSellerImage(event.target.value)} placeholder="https://..." required={!bestSellerImage.startsWith('data:')} />
              </div>
              {bestSellerImage && <img className="admin-image-preview" src={bestSellerImage} alt="Best seller preview" />}
              <button type="submit" className="primary-button">Save best seller</button>
            </> : <p className="empty-state">Choose a product below to make it the best seller first.</p>}
            {bestSellerMessage && <p className="success-text">{bestSellerMessage}</p>}
          </form>
          <div className="inventory-heading"><div><p className="eyebrow">Live catalog</p><h2>{products.length} products</h2></div><span>Saved locally</span></div>
          <div className="inventory-list">{products.map((product) => <article className="inventory-item" key={product.id}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>{product.category} · {formatNaira(product.price)}</span></div><div className="inventory-actions"><label>Stock<input type="number" min="0" step="1" value={product.stock} onChange={(event) => onUpdateProduct(product.id, { stock: Math.max(0, Number(event.target.value)) })} /></label><button type="button" className="text-button" onClick={() => onSetBestSeller(product.id)} disabled={product.badge === 'Bestseller'}>{product.badge === 'Bestseller' ? 'Best seller' : 'Set best seller'}</button><button type="button" className="text-button" onClick={() => onDeleteProduct(product.id)} aria-label={`Delete ${product.name}`}>Delete</button></div></article>)}</div>
        </aside>
      </div>
    </section>
  )
}

export default AdminPage
