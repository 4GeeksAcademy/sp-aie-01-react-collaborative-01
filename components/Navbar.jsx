"use client";

import React from 'react';
import Link from 'next/link';
import BtnTeam from './BtnTeam';
import BtnPc from './BtnPc';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="navbar-container">
                <Link href="/" className="navbar-logo">PokeApi</Link>
                <ul className="navbar-menu">
                    <li><Link href="/wikidex">Wikidex</Link></li>
                    <li><Link href="/infolocations">Infolocations</Link></li>
                    <li><Link href="/contacta-con-nosotros">Contacto</Link></li>
                </ul>
                <div className="navbar-actions">
                    <BtnTeam />
                    <BtnPc />
                </div>
            </div>
        </nav>
    );
}   