import React from 'react'
import { Link } from 'react-router-dom'

import './Logo.css'

import logo from '../../assets/img/logo.png'

export default function Logo() {
    return (
        <aside className="logo">
            <Link to="/" className="logo">
                <img src={logo} alt="logo"/>
            </Link>
        </aside>
    )
}