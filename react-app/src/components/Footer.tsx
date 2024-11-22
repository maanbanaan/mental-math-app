import React from 'react';
import '../styles/Footer.css';

interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <div className="footer">
            <a href="https://github.com/maanbanaan/mental-math-app">GitHub</a>
            <a href="https://www.paypal.com/ncp/payment/389TL2FRZYWAC">Tip jar</a>
        </div>
    );
};

export default Footer;