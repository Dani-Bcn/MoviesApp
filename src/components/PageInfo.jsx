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
    const [namesfromCast, setNamesFromCast] = useState()
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
  
   const funcCast = ((infoCast) => {        
            console.log(infoCast)
            setNamesFromCast(infoCast)
  }) 
      
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
                    <section className='container-card'>
                        <article>
                            <img src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`} />
                        </article>
                        <article className='card-info'>
                            <h2>{`${valueTitleOrname}`}</h2>
                            <h3><span>
                              {
                                console.log(infoMovie)
                                } 
                            </span></h3>
                            {
                                infoMovie.release_date && (
                                    <h3>Release date &nbsp;  &nbsp; <span> {infoMovie.release_date}</span></h3>
                                )
                            }
                            <section>  
                                <h3>Cast</h3>
                                {
                                namesfromCast && (
                                     namesfromCast.cast.map((e,i)=>(
                                        i < 4 ?    <span key={e.id}> <h3>{e.name}</h3></span>:null 
                                     ))
                                )                               
                            } 
                            </section>
     
                            <h3>Language &nbsp;  &nbsp; <span> {infoMovie.original_language}</span></h3>
                            {
                                infoMovie.homepage && (
                                    <h3>Home page &nbsp;  &nbsp; <span> <a href={infoMovie.homepage} target="_blank" rel="noopener noreferrer">{infoMovie.homepage}</a></span></h3>
                                )
                            }
                            {
                                infoMovie.runtime && (
                                    <h3>Run time &nbsp;  &nbsp; <span> {infoMovie.runtime}'</span></h3>
                                )
                            }
                            <h3>Productor company &nbsp; &nbsp;<span>{infoMovie.production_companies[0].name}</span></h3>
                            <h3>Vote average &nbsp; &nbsp;<span>{infoMovie.vote_average}</span></h3>
                            <div
                                style={{
                                    display: "flex",
                                    width: 500,
                                    height: 30,
                                    gap: 20,
                                    alignItems: "flex-start"
                                }}
                                
                            >Genres&nbsp;[
                                {infoMovie.genres.map((element, index) => {
                                    return (
                                        <span key={index}> <h3 >{element.name},</h3></span>

                                    )
                                })}
                                ]</div>
                            <button onClick={() => navigate(-1)}>Back</button>
                        </article>
                    </section>
                )
            }
            <>
                <Cast valuesCast={infoMovie} funcCast={funcCast}></Cast>
            </>

        </main>
    );
}

export default PageInfo;
