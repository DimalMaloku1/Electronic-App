import React from 'react'
import '../components/Footer.css'
import {LinkedinLogo} from 'phosphor-react'
import {InstagramLogo} from 'phosphor-react'
import {FacebookLogo} from 'phosphor-react'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4>Electronic E-Commerce</h4>
            <ul className="list-unstyled">
              <li>@ Electronic E-Commerce is an online shoping store 
               for buying all electrinic accesories 
              </li>
              
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <ul className="list-unstyled">
              <li><FacebookLogo size={20} /> Facebook </li>
              <li><InstagramLogo size={20}/> Instagram</li>
              <li><LinkedinLogo size={20} /> LinkedIn</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="footer-row">
          <p>&copy; {new Date().getFullYear()} Electronic E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
