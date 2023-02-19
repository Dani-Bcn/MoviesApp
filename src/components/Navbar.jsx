import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const navigate = useNavigate()

    return (
        <main className='navbar'>
            <section className='container-navbar'>
                <h1>MoviesApp</h1>
            </section>
        </main>
    );
}

export default Navbar;

