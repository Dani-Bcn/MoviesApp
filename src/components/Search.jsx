import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, NavLink } from "react-router-dom";

const Search = ({ selectValue }) => {
    const navigate = useNavigate()
    const [choseMoviTV, setChoseMoviTV] = useState("movie")
    const [activeGenres, setActiveGenres] = useState(false)
    const valuesForPageInfo = [choseMoviTV]
    const [respApiGender, setrespApiGenre] = useState([])
    const [respApi, setRespApi] = useState([])
    const [genres, setGenres] = useState(14)
    const [changeMovieTv, setChangeMovieTv] = useState(false)

    useEffect(() => {
        if (selectValue.value !== undefined) {
            setActiveGenres(false)
            setChoseMoviTV(selectValue.value)
            setGenres(!genres)

        } else {
            setChoseMoviTV("movie")
        }
        valuesForPageInfo.push(choseMoviTV)

    }, [choseMoviTV])

    useEffect(() => {
        if (choseMoviTV) {
            //buscar todos los generos de pelis y series respactivamente
            fetch(`https://api.themoviedb.org/3/genre/${choseMoviTV}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => setrespApiGenre(resp.genres))
        }
    }, [choseMoviTV])

    const handleClick = ((target) => {
        setGenres(target.target.value)
    })
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/${choseMoviTV}/?api_key=55b2cf9d90cb74c55683e395bb1ad12b&with_genres=${genres}`)
            .then(resp => resp.json())
            .then(resp => setRespApi(resp.results))
    }, [genres])
    useEffect(() => {
        if (selectValue !== undefined) {
            setChoseMoviTV(selectValue.value)
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
            <section className='container-cards'>
                {
                    respApi.map((e, i) => {
                        return (
                            <div onClick={() => {
                                window.localStorage.setItem("value", valuesForPageInfo + e.id)
                                navigate("/info")
                            }}
                                className='cardsMovies' key={e.id}>
                                <img src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt="" >
                                </img>
                            </div>
                        )
                    })
                }
            </section>
        </>
    );
}

export default Search;
