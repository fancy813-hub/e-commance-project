import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

function HomePage({ products, testimonials, user, addToCart, onAddTestimonial, favoriteIds, toggleFavorite }) {
  const bestSeller = products.find((product) => product.badge === 'Bestseller') || products[0]
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const testimonialCount = testimonials.length
  const currentTestimonial = testimonials[activeTestimonial]

  const showTestimonial = (index) => {
    if (!testimonialCount) return
    setActiveTestimonial((index + testimonialCount) % testimonialCount)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!comment.trim() || !rating) return
    onAddTestimonial(comment.trim(), rating)
    setComment('')
    setRating(0)
    setSubmitted(true)
    window.setTimeout(() => setSubmitted(false), 3000)
  }

  return <>
    <section className="hero-section"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">Fresh arrivals</p><h1>Curated essentials for modern living.</h1><p className="lead">Discover elevated pieces from fashion, home, beauty, and accessories designed to make everyday rituals feel special.</p><div className="cta-row"><Link className="primary-button" to="/shop">Shop now</Link><Link className="secondary-button" to="/about">Our story</Link></div><ul className="mini-stats"><li><strong>20k+</strong><span>happy customers</span></li><li><strong>4.9/5</strong><span>average rating</span></li><li><strong>48h</strong><span>dispatch time</span></li></ul></div><div className="hero-visual"><div className="feature-card feature-card-top"><span>Best seller</span><strong>{bestSeller?.name || 'Coming soon'}</strong></div><img src={bestSeller?.image || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80'} alt={bestSeller?.name || 'Lifestyle model wearing modern fashion'} /><div className="feature-card feature-card-bottom"><span>Luxury edit</span><strong>Up to 30% off</strong></div></div></div></section>
    <section className="container content-section"><div className="section-heading"><p className="eyebrow">Shop by category</p><h2>Find your favorite style</h2></div><div className="category-grid">{['Women', 'Men', 'Accessories', 'Home', 'Beauty'].map((category) => <Link to="/shop" key={category} className="category-card"><span>{category}</span><strong>Explore</strong></Link>)}</div></section>
    <section className="container content-section"><div className="section-heading inline-heading"><div><p className="eyebrow">Featured picks</p><h2>Freshly curated for you</h2></div><Link className="text-link" to="/shop">View all products</Link></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />)}</div></section>
    <section className="container content-section testimonials-wrap"><div className="section-heading"><p className="eyebrow">Customer love</p><h2>What shoppers are saying</h2></div>{currentTestimonial ? <div className="testimonial-carousel" aria-roledescription="carousel" aria-label="Customer testimonials"><button className="testimonial-arrow" type="button" onClick={() => showTestimonial(activeTestimonial - 1)} aria-label="Previous testimonial">‹</button><article className="testimonial-card testimonial-featured" aria-live="polite" aria-atomic="true" key={currentTestimonial.id || `${currentTestimonial.name}-${currentTestimonial.quote}`}><span className="testimonial-quote-mark" aria-hidden="true">“</span><div className="stars" aria-label={`${currentTestimonial.rating || 5} out of 5 stars`}>{'★'.repeat(currentTestimonial.rating || 5)}{'☆'.repeat(5 - (currentTestimonial.rating || 5))}</div><p>“{currentTestimonial.quote}”</p><div className="testimonial-author"><span className="testimonial-avatar" aria-hidden="true">{currentTestimonial.name.slice(0, 1).toUpperCase()}</span><strong>{currentTestimonial.name}</strong><span>Verified customer</span></div></article><button className="testimonial-arrow" type="button" onClick={() => showTestimonial(activeTestimonial + 1)} aria-label="Next testimonial">›</button><div className="testimonial-pagination"><div className="testimonial-dots" aria-label="Choose testimonial">{testimonials.map((item, index) => <button type="button" key={item.id || `${item.name}-${item.quote}`} className={index === activeTestimonial ? 'testimonial-dot active' : 'testimonial-dot'} onClick={() => showTestimonial(index)} aria-label={`Show testimonial ${index + 1}`} aria-current={index === activeTestimonial ? 'true' : undefined} />)}</div><span>{activeTestimonial + 1} / {testimonialCount}</span></div></div> : <div className="testimonial-empty">Be the first to share your experience.</div>}{user ? <form className="testimonial-form" onSubmit={handleSubmit}><fieldset className="rating-input"><legend>How would you rate your experience?</legend><div className="star-options">{[1, 2, 3, 4, 5].map((value) => <label key={value} className={value <= rating ? 'selected' : ''}><input type="radio" name="testimonial-rating" value={value} checked={rating === value} onChange={() => setRating(value)} required /><span aria-hidden="true">★</span><span className="sr-only">{value} {value === 1 ? 'star' : 'stars'}</span></label>)}</div></fieldset><label>Share your experience<textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Tell other shoppers what you loved..." rows="3" maxLength="300" required /></label><button type="submit" className="primary-button">Post comment</button>{submitted && <p className="success-text">Your comment has been posted.</p>}</form> : <p className="testimonial-signin">Have you shopped with us? <Link to="/login">Sign in to leave a comment</Link> or <Link to="/signup">create an account</Link>.</p>}</section>
  </>
}

export default HomePage
