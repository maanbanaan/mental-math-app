import React from 'react';
import '../styles/Footer.css';

interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <div className="footer">
            <a href="https://github.com/maanbanaan/mental-math-app" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.paypal.com/ncp/payment/389TL2FRZYWAC" target="_blank" rel="noopener noreferrer">Tip jar</a>
        </div>
    );
};

export default Footer;