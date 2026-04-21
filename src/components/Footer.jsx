import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer-section">
      <div className="footer-content">
        <div className="cta-wrapper">
          <h2 className="cta-title">READY TO UPGRADE?</h2>
          <p className="cta-subtitle">
            Don't let bad thumbnails hold back your content. Secure your slot now, direct message me, and let's craft something viral.
          </p>
          <div className="cta-buttons">
            <button className="primary-btn hover-target" onClick={() => window.open('https://discord.com/app', '_blank')}>
              <MessageSquare size={20} />
              DISCORD: le_beurre6
            </button>
            <button className="secondary-btn hover-target" onClick={() => window.location.href = 'mailto:hello@lebeurre.com'}>
              <Mail size={20} />
              EMAIL ME
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="brand">LE_BEURRE</div>
          <div className="copy">&copy; 2026. All Rights Reserved.</div>
        </div>
      </div>
      
      {/* Background massive glow */}
      <div className="footer-glow"></div>
    </footer>
  );
};

export default Footer;
