import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, NavLink } from "react-router-dom";




const Search = ({ selectValue }) => {
  
   
  
    const navigate = useNavigate()
    const [genreValue, setgenreValue] = useState("movie")
    const [stateSelect, setStateSelect] = useState(false)
    const [idIsTv,setIdIsTv] =useState()
    const valuesForPageInfo =[genreValue]
   
  
    useEffect(() => {

        if (selectValue.value !== undefined) {
            setStateSelect(false)
            setgenreValue(selectValue.value)
            setGenres(!genres)
        } else {
            setgenreValue("movie")         
        }
        valuesForPageInfo.push(genreValue)
         
    }, [genreValue])

    const [respApiGender, setrespApiGenre] = useState([])
    const [respApi, setRespApi] = useState([])
    const [genres, setGenres] = useState(14)

    useEffect(() => {
        if (genreValue) {
            fetch(`https://api.themoviedb.org/3/genre/${genreValue}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => setrespApiGenre(resp.genres))
        }
    }, [genreValue])

    const handleClick = ((target) => {
        setGenres(target.target.value)
    })

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/${genreValue}/?api_key=55b2cf9d90cb74c55683e395bb1ad12b&with_genres=${genres}`)
            .then(resp => resp.json())
            .then(resp => setRespApi(resp.results))
    }, [genres])
    useEffect(() => {
        if (selectValue !== undefined) {
            setgenreValue(selectValue.value)            
        }
    }, [selectValue])
    return (
        <>
            <main className='select-gender'>
                {
              
                }
                {
                    respApiGender && (
                        <form action="">
                            <h2 onClick={() => setStateSelect(!stateSelect)} >Genders</h2>
                            {
                                stateSelect && (
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
