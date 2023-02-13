import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cast from './Cast';

const Information = (value) => {
    const navigate = useNavigate()
    const [values, setValues] = useState(null)
    const [failTitle, setFailTitle] = useState("title")
    const [idMovie, setIdMovie] = useState(value.valuesMovie.id)
    const [isMovie, setIsMovie] = useState("tv")
    const [cast, setCast] = useState([])
    const [allInfoMovie, setAllInfoMovie] = useState([])
   

  
      useEffect(()=>{ 
        console.log(value)
         setIdMovie(value.valuesMovie.id)
         setFailTitle("title")
         setIsMovie("movie")       
          setValues(value.valuesMovie)
          value.valuesMovie.title ? setFailTitle(value.valuesMovie.title) : setFailTitle(value.valuesMovie.name)
      },[])
      
    useEffect(() => {
        value.valuesMovie.title ?
            setIsMovie("movie") : setIsMovie("tv")
    },)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${isMovie}/${idMovie}/credits?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
            .then(resp => resp.json())
            .then(resp => resp.cast.map((e, i) => {
                i < 9 ? setCast(prev => [...prev, e]) : null
            }))            
    }, [isMovie])


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${isMovie}/${idMovie}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
            .then(resp => resp.json())
            .then(resp => console.log(resp))            
    }, [isMovie])
    
    return (
        <div className='info'>
            {
                values && (
                    <main>
                        <button onClick={()=>navigate(-1)}>Back</button>
                        <section className='card-info'>
                            <img src={`https://image.tmdb.org/t/p/w500/${values.poster_path}`} alt="" />
                            <article>
                                <h1>{failTitle}</h1>
                                <h3>Release date{values.release_date}</h3>
                            </article>
                        </section>
                        <section>
                            {
                                idMovie && (
                                    <Cast idMovie={cast} ></Cast>
                                )
                            }
                        </section>
                    </main>
                )
            }
        </div>
    );
}

export default Information;
