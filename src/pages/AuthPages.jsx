import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function LoginPage({ onLogin, onReactivate, onAuthenticated }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [inactive, setInactive] = useState(false)

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setInactive(false)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const result = onLogin(form.email, form.password)
    if (result.inactive) { setInactive(true); setError('This profile is deactivated. Reactivate it to continue.'); return }
    if (result.error) { setInactive(false); setError(result.error); return }
    onAuthenticated(result.user)
    navigate(result.user.role === 'admin' ? '/admin' : '/profile')
  }

  const handleReactivate = () => {
    const result = onReactivate(form.email, form.password)
    if (result.error) { setError(result.error); return }
    onAuthenticated(result.user)
    navigate('/profile')
  }

  return <section className="container auth-section"><div className="auth-card"><div className="auth-copy"><p className="eyebrow">Welcome back</p><h2>Sign in to your account</h2><p>Use the email and password you entered when you created your account.</p></div><form className="auth-form" onSubmit={handleSubmit}><label>Email address<input name="email" type="email" value={form.email} onChange={handleChange} required /></label><label>Password<input name="password" type="password" value={form.password} onChange={handleChange} required /></label>{error && <p className="error-text">{error}</p>}{inactive ? <button type="button" className="primary-button full-width" onClick={handleReactivate}>Reactivate profile</button> : <button type="submit" className="primary-button full-width">Login</button>}<p className="auth-meta">Need an account? <Link to="/signup">Sign up</Link></p><p className="auth-meta">Or <Link to="/shop">continue shopping</Link></p></form></div></section>
}

export function SignupPage({ onSignup, onAuthenticated }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const handleSubmit = (event) => {
    event.preventDefault()
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    const result = onSignup({ name: form.name.trim(), email: form.email, password: form.password })
    if (result.error) { setError(result.error); return }
    onAuthenticated(result.user)
    navigate('/profile')
  }

  return <section className="container auth-section"><div className="auth-card"><div className="auth-copy"><p className="eyebrow">Join us</p><h2>Create your profile</h2><p>Sign up once to create your account and make future shopping easier.</p></div><form className="auth-form" onSubmit={handleSubmit}><label>Full name<input name="name" value={form.name} onChange={handleChange} required /></label><label>Email address<input name="email" type="email" value={form.email} onChange={handleChange} required /></label><label>Password<input name="password" type="password" value={form.password} onChange={handleChange} minLength={8} required /></label><label>Confirm password<input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} minLength={8} required /></label>{error && <p className="error-text">{error}</p>}<button type="submit" className="primary-button full-width">Create account</button><p className="auth-meta">Already have an account? <Link to="/login">Log in</Link></p></form></div></section>
}
