import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap footer-grid">
        <div className="footer-brand"><h4>Ember & Loam</h4><p>Thoughtful essentials for an elevated everyday.</p><Link to="/shop" className="footer-cta">Shop on E&L</Link></div>
        <div className="footer-column"><h4>Need Help?</h4><Link to="/contact">Chat with us</Link><Link to="/help-center">Help Center</Link><Link to="/contact">Contact Us</Link></div>
        <div className="footer-column"><h4>Useful Links</h4><Link to="/service-center">Service Center</Link><Link to="/help/how-to-shop">How to shop on E&L?</Link><Link to="/help/delivery">Delivery options and timelines</Link><Link to="/help/returns">How to return a product on E&L?</Link><Link to="/corporate/bulk-purchases">Corporate and bulk purchases</Link><Link to="/help/report-product">Report a Product</Link><Link to="/policies/dispute-resolution">Dispute Resolution Policy</Link><Link to="/policies/returns-refund-timeline">Returns &amp; Refund Timeline</Link><Link to="/policies/return">Return Policy</Link><Link to="/service-center/pickup-stations">Pickup Stations</Link><Link to="/service-center/delivery">E&amp;L Delivery</Link></div>
        <div className="footer-column"><h4>ABOUT E&amp;L</h4><Link to="/about">About us</Link><Link to="/about/careers">E&amp;L careers</Link><Link to="/corporate">Corporate Website</Link><Link to="/policies/terms">Terms and Conditions</Link><Link to="/policies/payment-guidelines">E&amp;L Payment Information Guidelines</Link><Link to="/stores">Official Stores</Link><Link to="/shop?sort=popularity">Best seller</Link></div>
        <div className="footer-column"><h4>PRIVACY</h4><Link to="/policies/privacy">Privacy Notice</Link><Link to="/policies/cookies">Cookie Notice</Link><Link to="/policies/cookie-preferences">Cookie Preferences</Link></div>
        <div className="footer-column"><h4>SAVE MONEY WITH E&amp;L discounts</h4><Link to="/shop">Shop on E&amp;L</Link></div>
        <div className="footer-column"><h4>E&amp;L INTERNATIONAL</h4><Link to="/international/nigeria">Nigeria</Link><Link to="/international/egypt">Egypt</Link><Link to="/international/ghana">Ghana</Link><Link to="/international/ivory-coast">Ivory Coast</Link><Link to="/international/kenya">Kenya</Link><Link to="/international/morocco">Morocco</Link><Link to="/international/senegal">Senegal</Link><Link to="/international/uganda">Uganda</Link></div>
        <div className="footer-column footer-contact"><h4>Contact us</h4><span>Business Name</span><strong>E&amp;L Nigeria</strong><span>Address</span><address>9 Alagbaka, Akure, Ondo</address><span>Phone Number</span><a href="tel:+2348103567961">2348103567961</a><span>WhatsApp</span><a href="https://wa.me/2348103567961" target="_blank" rel="noreferrer">2348103567961</a></div>
      </div>
      <div className="container footer-bottom"><span>&copy; {new Date().getFullYear()} Ember &amp; Loam</span><Link to="/contact">Contact support</Link></div>
    </footer>
  )
}

export default Footer
