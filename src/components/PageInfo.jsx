import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cast from './Cast';

const PageInfo = () => {

    const [localeValue, setLocaleValue] = useState(false)
    const [valuesMovieOrTv, setValuesMovieOrTv] = useState(false)
    const [valueTitleOrname, setTitleOrName] = useState()
    const [valueId, setValueId] = useState(false)
    const [count, setcount] = useState(false)
    const [infoMovie, setInfoMovie] = useState()
    const navigate = useNavigate()
    setTimeout(() => {
        setcount(true)
    }, 1)

    useEffect(() => {
        setLocaleValue(window.localStorage.getItem("value"))
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

    useEffect(() => {
        if (count) {
            fetch(`https://api.themoviedb.org/3/${valuesMovieOrTv}/${valueId}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => setInfoMovie(resp))
        }
    }, [count])

    return (
        <main className='info'>
            {
                infoMovie && (
                    <section className='info-card'>
                        <span>
                            <img src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`} />
                        </span>
                        <article className='card-info'>
                            <h1>{`${valueTitleOrname}`}</h1>
                            {
                                infoMovie.release_date && (
                                    <h2>Release date &nbsp;  &nbsp;  {infoMovie.release_date}</h2>
                                )
                            }
                            <h2>Language &nbsp;  &nbsp;  {infoMovie.original_language}</h2>
                            {
                                infoMovie.homepage && (
                                    <h2>Home page &nbsp;  &nbsp; <a href={infoMovie.homepage} target="_blank" rel="noopener noreferrer">{infoMovie.homepage}</a></h2>
                                )
                            }
                            {
                                infoMovie.runtime && (
                                    <h2>Run time &nbsp;  &nbsp; {infoMovie.runtime}'</h2>
                                )
                            }
                            <div
                                style={{
                                    display: "flex",
                                    width: 500,
                                    height: 30,                               
                                    gap:20,
                                    alignItems:"flex-start"
                                }}
                            >Genres&nbsp;[
                                {infoMovie.genres.map((element, index) => {
                                    return (
                                        <h5 key={index}>{element.name},</h5>)
                                })}
                               ]</div>

                            <button onClick={() => navigate(-1)}>Back</button>
                        </article>

                    </section>
                )
            }
            <>     
            <Cast valuesCast={infoMovie}></Cast> 
            </>
   
        </main>
    );
}

export default PageInfo;
