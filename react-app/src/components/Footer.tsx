import React from 'react';
import '../styles/Footer.css';

interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <div className="footer">
            <a href="https://github.com">GitHub</a>
        </div>
    );
};

export default Footer;