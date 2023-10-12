import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion'

const Infomovie = (infoMovie) => {
    const navigate = useNavigate()
    const [valuesMovie, setValuesMovie] = useState()
    useEffect(() => {
        infoMovie.infoMovie ? setValuesMovie(infoMovie.infoMovie) : null
    },[infoMovie])

    return (
        <section 
            className='
                w-screen
                flex
                justify-start
                flex-wrap
            '
        >
            {
                valuesMovie && (
                    valuesMovie.map((e, i) => (
                        <div
                            onClick={() => {
                                window.localStorage.setItem("value", infoMovie.valuesForPageInfo + e.id)
                                navigate("/info")
                            }}
                            key={e.id}>
                            <div >
                                <m.img 
                                className='
                                w-32
                                m-5
                                '
                                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt={e.id} ></m.img>
                            </div>
                        </div>
                    ))
                )
            }
        </section>
    )
}

export default Infomovie;
