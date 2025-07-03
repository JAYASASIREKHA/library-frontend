import React from 'react';
import './Footer.css';

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-data">
                <div className="contact-details">
                    <h1>Contact Us</h1>
                    <p><b>Librarian</b></p>
                    <p>Sri Eshwar College of Engineering</p>
                    <p>Coimbatore-641202</p>
                    <p>Coimbatore, Tamil Nadu</p>
                    <p>India</p>
                    <p><b>Email:</b> sece@sece.ac.in</p>
                </div>

                <div className="librarian-details">
                    <h1>Librarian</h1>
                    <p>Name: Dr. John Doe</p>
                    <p>Education: Ph.D. in Library Science</p>
                    <p>Contact: +91 9123456787</p>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="contact-social">
                <a href="https://twitter.com" className="social-icon">
                    <TwitterIcon style={{ fontSize: 40, color: "#1DA1F2" }} />
                </a>
                <a href="https://www.linkedin.com" className="social-icon">
                    <LinkedInIcon style={{ fontSize: 40, color: "#0077b5" }} />
                </a>
                <a href="https://telegram.org" className="social-icon">
                    <TelegramIcon style={{ fontSize: 40, color: "#0088cc" }} />
                </a>
                <a href="https://www.instagram.com" className="social-icon">
                    <InstagramIcon style={{ fontSize: 40, color: "#e4405f" }} />
                </a>
            </div>

            <div className="footer-copyright">
                <p>&#169; 2025 Sri Eshwar College of Engineering. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
