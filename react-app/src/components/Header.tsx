import React from 'react';
import '../styles/Header.css';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = ({ }) => {
    return (
        <div className="header">
            <span>Settings</span>
        </div>
    );
};

export default Header;