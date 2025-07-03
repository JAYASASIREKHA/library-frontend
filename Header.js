import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

function Header() {
    const [menutoggle, setMenutoggle] = useState(false);

    const Toggle = () => {
        setMenutoggle(!menutoggle);
    };

    const closeMenu = () => {
        setMenutoggle(false);
    };

    return (
        <div className="header">
            <div className="logo-nav">
                <Link to='/home' onClick={closeMenu}>
                    LIBRARY
                </Link>
            </div>
            <div className='nav-right'>
                <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={closeMenu}>
                        <Link to='/home'>Home</Link>
                    </li>
                    <li className="option" onClick={closeMenu}>
                        <Link to='/books'>Books</Link>
                    </li>
                    <li className="option" onClick={closeMenu}>
                        <Link to='/popular'>Popular Books</Link>
                    </li>
                    <li className="option" onClick={closeMenu}>
                        <Link to='/recent'>Recent Uploads</Link>
                    </li>
                    <li className="option" onClick={closeMenu}>
                        <Link to='/ReservedBooks'>Reserved Books</Link>
                    </li>
                    <li className="option" onClick={closeMenu}>
                        <Link to='/Stats'>Stats</Link>
                    </li>
                    <li className="option" onClick={closeMenu}>
                        <Link to="/admin-login">Admin</Link>
                    </li>
                </ul>
            </div>
            <div className="mobile-menu" onClick={Toggle}>
                {menutoggle ? (
                    <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
                ) : (
                    <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
                )}
            </div>
        </div>
    );
}

export default Header;
