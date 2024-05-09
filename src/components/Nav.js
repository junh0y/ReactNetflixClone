import React, { useState, useEffect } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // First
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        })
        // Second
        return () => {
            window.removeEventListener('scroll', () => {

            })
        }
    },
        // Third
        []
    );

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }

    return (
        <nav className={`nav ${show && 'nav__black'}`}>
            <img
                alt="Neflix Logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg.png"
                className="nav__logo"
                onClick={() => window.location.reload()}
            />

            <input type="text" value={searchValue} onChange={handleChange} className="nav__input" placeholder="Please search movies." />

            <img
                alt="User Logged"
                src=""
                className="nav__avatar"
            />
        </nav>
    )
}
