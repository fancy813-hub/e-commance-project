import { Link } from 'react-router-dom'

function NotFound() {
  return <section className="container content-section empty-state"><h2>Page not found</h2><p>The page you are looking for doesn’t exist.</p><Link className="primary-button" to="/">Back home</Link></section>
}

export default NotFound
