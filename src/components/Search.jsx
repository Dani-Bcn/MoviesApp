import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, NavLink } from "react-router-dom";
import ListMovies from './ListMovies'


const Search = ({ selectValue }) => {
    const navigate = useNavigate()
    const [choseMovieTV, setchoseMovieTV] = useState("movie")
    const [activeGenres, setActiveGenres] = useState(false)
    const valuesForPageInfo = [choseMovieTV]
    const [respApiGender, setrespApiGenre] = useState([])
    const [respApi, setRespApi] = useState([])
    const [genres, setGenres] = useState(14)

    useEffect(() => {

        if (selectValue.value !== undefined) {            
            setActiveGenres(false)
            setchoseMovieTV(selectValue.value)
            setGenres(!genres)
        } else {
            setchoseMovieTV("movie")
        }
        valuesForPageInfo.push(choseMovieTV)
    }, [choseMovieTV])

    useEffect(() => {
        if (choseMovieTV) {
            //buscar todos los generos de pelis y series respactivamente
            fetch(`https://api.themoviedb.org/3/genre/${choseMovieTV}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => setrespApiGenre(resp.genres))
        }
    }, [choseMovieTV])

    const handleClick = ((target) => {
        setGenres(target.target.value)
    })
    useEffect(() => {
        //Busca por géneros
        fetch(`https://api.themoviedb.org/3/discover/${choseMovieTV}/?api_key=55b2cf9d90cb74c55683e395bb1ad12b&include_adult=&with_genres=${genres}`)
            .then(resp => resp.json())
            .then(resp => setRespApi(resp.results))
    }, [genres])
    useEffect(() => {
        if (selectValue !== undefined) {
            setchoseMovieTV(selectValue.value)
        }
    }, [selectValue])
    return (
        <>
            <main className='select-gender'>
                {
                    respApiGender && (
                        <form action="">
                            <h2 onClick={() => setActiveGenres(!activeGenres)} >Genders</h2>
                            {
                                activeGenres && (
                                    <select onChange={handleClick}>
                                        {
                                            respApiGender.map((e, i) => {

                                                return (
                                                    <option id={e.id} key={e.id} value={e.id}>{e.name}</option>)
                                            })
                                        }
                                    </select>
                                )
                            }
                        </form>
                    )
                }
            </main>
            <ListMovies  respApi={respApi} valuesForPageInfo={valuesForPageInfo}/>           
        </>
    );
}

export default Search;