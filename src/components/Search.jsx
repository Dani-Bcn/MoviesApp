import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, NavLink } from "react-router-dom";


const Search = ({ selectValue }) => {


    const { info } = selectValue
    const navigate = useNavigate()
    const [genderValue, setGenderValue] = useState("movie")
    const [infoMovie, setInfoMovie] = useState() 

    useEffect(() => {

        if (selectValue.value !== undefined) {
            setGenderValue(selectValue.value)
            setGenders(!genders)
        } else {
            setGenderValue("tv")
        }

    }, [genderValue])

    const [respApiGender, setrespApiGender] = useState([])
    const [respApi, setRespApi] = useState([])
    const [genders, setGenders] = useState(14)

    useEffect(() => {
        if (genderValue) {
            fetch(`https://api.themoviedb.org/3/genre/${genderValue}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => setrespApiGender(resp.genres))
        }
    }, [genderValue])

    const handleClick = ((target) => {
        setGenders(target.target.value)
    })

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/${genderValue}/?api_key=55b2cf9d90cb74c55683e395bb1ad12b&with_genres=${genders}`)
            .then(resp => resp.json())
            .then(resp => setRespApi(resp.results))
    }, [genders])

    useEffect(() => {
        if (selectValue !== undefined) {
            setGenderValue(selectValue.value)
        }
    }, [selectValue])
    console.log(info)

    return (
        <>
            <main className='select-gender'>
                {
                    respApiGender && (
                        <form action="">
                            <h2>Genders</h2>
                            <select onChange={handleClick}>
                                {
                                    respApiGender.map((e, i) => {
                                        return (
                                            <option id={e.id} key={e.id} value={e.id}>{e.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </form>
                    )
                }
            </main>
            <section className='container-cards'>
                {
                    respApi.map((e, i) => {
                        return (
                            <div onClick={() => {
                                info(e)
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
