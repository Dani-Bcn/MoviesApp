import React, { useState } from 'react';

const Navbar = (props) => {
    
    const { handleValues } = props  
    const state = ["0"]
    const sections = ["Movies", "Series","Most popular"]

    const handleClick = ((target) => {   
        state.map((e, i) => {
            state[i] = false        
        })      
     
        switch (target.target.id) {     
            case "0":
                state[0] = "movie"
                break
            case "1":
                state[0] = "tv"
        }
        handleValues(state)
    })
    return (
        <main className='navbar'>
            <h2 className='title'>MoviesApp</h2>
            {
                sections.map((e, i) => (
                    <h3 id={i} onClick={handleClick} key={i}>{e}</h3>
                ))
            }
        </main>
    );
}

export default Navbar;

