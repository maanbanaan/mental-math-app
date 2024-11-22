import React from 'react';
import '../styles/Header.css';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = ({ }) => {
    return (
        <div className="header">
            <code>quick-math.net</code>
        </div>
    );
};

export default Header;