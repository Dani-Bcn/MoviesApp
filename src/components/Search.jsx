import React, { useState, useEffect } from 'react';

const Search = ({ selectValue }) => {

    const [genderValue, setGenderValue] = useState("movie")
    genderValue !== undefined ? console.log(genderValue) : null

    useEffect(() => {

        if (selectValue.value !== undefined) {
            setGenderValue(selectValue.value)
            setGenders(!genders)
            console.log(selectValue)
        } else {
            setGenderValue("tv")
        }

    }, [genderValue])

    const [respApiGender, setrespApiGender] = useState([])
    const [respApi, setRespApi] = useState([])
    const [genders, setGenders] = useState(14)
    const [selectedGender, setSelectedGender] = useState("movie")

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

    const handleInfo=((e)=>{
        console.log(e)
    })

    return (
        <>
            <main className='select-gender'>
                {
                    respApiGender && (
                        <form action="">
                            <h2>Genders</h2>
                            <select onChange={handleClick} name="" id="">
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
                          
                            <div className='cardsMovies' key={e.id}>
                                <img  onClick={()=>handleInfo(e)} src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt="" >
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
