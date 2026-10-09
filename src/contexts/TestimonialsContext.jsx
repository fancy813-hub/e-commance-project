import { useEffect, useState } from 'react'
import { testimonials as initialTestimonials } from '../data/products'
import { useAuth } from './hooks'
import { TestimonialsContext } from './contexts'

function getStoredTestimonials() {
  try {
    const storedTestimonials = window.localStorage.getItem('ember-loam-testimonials')
    return storedTestimonials ? JSON.parse(storedTestimonials) : initialTestimonials
  } catch {
    return initialTestimonials
  }
}

export function TestimonialsProvider({ children }) {
  const { user } = useAuth()
  const [testimonials, setTestimonials] = useState(getStoredTestimonials)

  useEffect(() => {
    window.localStorage.setItem('ember-loam-testimonials', JSON.stringify(testimonials))
  }, [testimonials])

  const addTestimonial = (quote, rating) => {
    if (!user) return
    setTestimonials((current) => [...current, { id: Date.now(), name: user.name, quote, rating }])
  }

  return <TestimonialsContext.Provider value={{ testimonials, addTestimonial }}>{children}</TestimonialsContext.Provider>
}
