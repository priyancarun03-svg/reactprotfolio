import { profile } from '../data/profile.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Designed &amp; built by <span>{profile.name}</span> &nbsp;·&nbsp; Cyber Security Student &amp; Web Developer
      </p>
      <p className="footer__meta">© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  )
}