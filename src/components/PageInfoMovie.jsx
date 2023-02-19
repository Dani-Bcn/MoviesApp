import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cast from './Cast';
import { motion as m } from 'framer-motion'

const PageInfoMovie = () => {
    const [localeValue, setLocaleValue] = useState(false)
    const [valuesMovieOrTv, setValuesMovieOrTv] = useState(false)
    const [valueTitleOrname, setTitleOrName] = useState()
    const [valueId, setValueId] = useState(false)
    const [count, setcount] = useState(false)
    const [infoMovie, setInfoMovie] = useState()
    const [namesfromCast, setNamesFromCast] = useState()

    const navigate = useNavigate()
    setTimeout(() => {
        setcount(true)
    }, 2)


    useEffect(() => {
        setLocaleValue(localStorage.getItem("value"))
    },)

    useEffect(() => {
        if (localeValue) {
            if (localeValue[0] === "m") {
                infoMovie ? setTitleOrName(infoMovie.title) : null
                setValuesMovieOrTv(localeValue.split("").splice(0, 5).join(""))
                setValueId(localeValue.split("").splice(5,).join(""))
            } else {
                infoMovie ? setTitleOrName(infoMovie.name) : null
                setValuesMovieOrTv(localeValue.split("").splice(0, 2).join(""))
                setValueId(localeValue.split("").splice(2,).join(""))
            }
        }
    },)
    const funcCast = ((infoCast) => {
        setNamesFromCast(infoCast)
    })
    useEffect(() => {
        if (count && valueId && valuesMovieOrTv) {
            fetch(`https://api.themoviedb.org/3/${valuesMovieOrTv}/${valueId}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => setInfoMovie(resp))
        }
    }, [count])

    return (
        <main className='info-movie'>
            {
                infoMovie && (
                    <section className='container-info-movie'>
                        <article>
                            <m.img src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`} ></m.img>
                        </article>
                        <article className='card-info'>
                            {
                                infoMovie && (
                                    <h1>{`${valueTitleOrname}`}</h1>
                                )
                            }
                            {
                                infoMovie.release_date && (
                                    <h3>Release date&nbsp; &nbsp; <span> {infoMovie.release_date}</span></h3>
                                )
                            }
                            <section>
                                <h3>Cast [ &nbsp; &nbsp;
                                    {
                                        namesfromCast && (
                                            namesfromCast.cast.map((e, i) => (
                                                i < 4 ? <span key={e.id}> {e.name}, &nbsp;</span> : null
                                            ))
                                        )
                                    }
                                    ]</h3>
                            </section>
                            <h3>Language&nbsp; &nbsp;<span> {infoMovie.original_language}</span></h3>
                            {
                                infoMovie.homepage && (
                                    <h3>Home page  &nbsp; &nbsp;<span> <a
                                        style={{
                                            fontSize: "1rem"
                                        }}
                                        href={infoMovie.homepage} target="_blank" rel="noopener noreferrer">{infoMovie.homepage}</a></span></h3>
                                )
                            }
                            {
                                infoMovie.runtime && (
                                    <h3>Run time &nbsp; &nbsp;<span> {infoMovie.runtime/60}'</span></h3>
                                )
                            }
                            {
                                infoMovie.production_companies[0] && (
                                    <h3>Productor company &nbsp; &nbsp;<span>{infoMovie.production_companies[0].name}</span></h3>
                                )
                            }
                            {
                                infoMovie.vote_average && (
                                    <h3>Vote average &nbsp; &nbsp;<span>{infoMovie.vote_average}</span></h3>
                                )
                            }
                            {
                                infoMovie && (

                                    <h3>Genres  &nbsp; &nbsp;[
                                        {
                                            infoMovie.genres.map((element, index) => {
                                                return (
                                                    <span
                                                        key={index}> &nbsp; {element.name}, &nbsp;</span>
                                                )
                                            })}
                                        ]</h3>
                                )
                            }
                           
                        </article>
                    </section>
                )
            }
            <article className='card-overiew'>
                {
                    infoMovie && (
                        <article>
                            <h2>Overview </h2><br />
                            <span> {infoMovie.overview}</span>
                        </article>
                    )
                }
            </article>
            <>
                <Cast valuesCast={infoMovie} funcCast={funcCast}></Cast>
            </>
            <button onClick={() => navigate(-1)}>Back</button>
        </main>
    );
}

export default PageInfoMovie;
