import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const navigate = useNavigate()
    const { handleValues } = props
    const state = ["0"]
    const sections = ["Movies", "Series", "Most popular"]

    const handleClick = ((target) => {
        state.map((e, i) => {
            state[i] = false
        })

        switch (target.target.id) {
            case "0":
                state[0] = "movie"
                navigate("/")
                localStorage.setItem("movie-tv", "movie")
                break
            case "1":
                state[0] = "tv"
                navigate("/")
                localStorage.setItem("movie-tv", "tv")
                break
            case "2":
                navigate("/popular")
        }
        handleValues(state)
    })

    return (
        <main className='navbar'>
            <section className='container-navbar'>
                <h2>MoviesApp</h2>
                {
                    sections.map((e, i) => (
                        <h3 id={i} onClick={handleClick} key={i}>{e}</h3>
                    ))
                }
            </section>
        </main>
    );
}

export default Navbar;

