import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion'

const Infomovie = (infoMovie) => {
    const navigate = useNavigate()
    const [valuesMovie, setValuesMovie] = useState()
    useEffect(() => {
        infoMovie.infoMovie.length > 0 ? setValuesMovie(infoMovie.infoMovie) : null
    },)

    return (
        <section className='container-list-movies'>
            {
                valuesMovie && (
                    valuesMovie.map((e, i) => (
                        <div className='card-movie'
                            onClick={() => {
                                window.localStorage.setItem("value", infoMovie.valuesForPageInfo + e.id)
                                navigate("/info")
                            }}
                            key={e.id}>
                            <div >
                                <m.img className='img' src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt={e.id} ></m.img>
                            </div>
                        </div>
                    ))
                )
            }
        </section>
    )
}

export default Infomovie;
