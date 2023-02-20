import React, { useRef, useEffect, useState } from 'react';
import ListMovie from './ListMovies'

const Search = () => {
    const [infoMovie, setInfoMovie] = useState()
    const [movieOrTv, setMovieOrTv] = useState(["Movie", "Tv"])
    const [isSelected, setIsSelected] = useState("movie")
    const [localeMovieOrTv, setLocaleMovieOrTv] = useState(localStorage.getItem("movie-tv"))
    const [changeCall, setChangeCall] = useState(true)
    const [count, setCount] = useState(1)
    const [resApiGenres, setResApiGenres] = useState([])
    const [genres, setGenres] = useState()
    const [searchPopularity, setSearchPopularity] = useState("")
    const valuesForPageInfo = [isSelected]
    let stringNum = toString()

    localStorage.setItem("indexPage",count)
    stringNum = localStorage.getItem("indexPage")
    const selectRef = useRef(null);
    console.log(localStorage.getItem("indexPage"))

    const selected = ((target) => {
        if (target === "Movie") {
            selectRef.current.selectedIndex = 0
            setCount(1)
            setIsSelected("movie")
            setChangeCall(!changeCall)
            setGenres(28)

        } else {
            selectRef.current.selectedIndex = 0
            setCount(1)
            setChangeCall(!changeCall)
            setIsSelected("tv")


            setGenres(10759)
        }
    })

    const funcPopular = (() => {
        setSearchPopularity("&sort_by=vote_count.desc")
        setChangeCall(!changeCall)

    })


    const funcActual = (() => {
        setSearchPopularity("")
        setChangeCall(!changeCall)
    })
    const nextPage = (() => {
        console.log(count)
        setCount(count + 1)
        setChangeCall(!changeCall)
    })
    const firtsPage = (() => {
        console.log(count)
        localStorage.setItem("indexPage", count)
        setCount(1)
        setChangeCall(!changeCall)
    })

    const previousPage = (() => {
        console.log(count)
        localStorage.setItem("indexPage", count)
        count < 2 ? null : setCount(count - 1)
        setChangeCall(!changeCall)
    })

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/${isSelected}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b&language=en-U`)
            .then(resp => resp.json())
            .then(resp => setResApiGenres(resp.genres))
    }, [changeCall])

    const selectGenre = ((target) => {
        setGenres(target.target.value)
        setChangeCall(!changeCall)
    })

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/${isSelected}?api_key=55b2cf9d90cb74c55683e395bb1ad12b${searchPopularity}&page=${stringNum}&with_genres=${genres}`)
            .then(resp => resp.json())
            .then(resp => setInfoMovie(resp.results))

    }, [changeCall])

    return (
        <main className='popular'>
            <section className='container-popular'>
                <article className='container-nav'>
                    {
                        movieOrTv.map((e, i) => (
                            <h2 key={i} id={i} onClick={() => selected(e)}>{e}</h2>
                        ))
                    }
                    <h2 onClick={() => funcActual()}>Current</h2>
                    <h2 onClick={() => funcPopular()}>Most popular</h2>
                    <form className='select-genres'>
                        <h2>Genres</h2>
                        <select ref={selectRef} onChange={(e) => selectGenre(e)}>
                            {
                                resApiGenres.map((e, i) => (
                                    <option key={e.id} value={e.id} id={e.id}>{e.name}</option>
                                ))
                            }
                        </select>
                    </form>
                </article>
                <nav className='container-nav'>
                    <button onClick={() => firtsPage()}>First</button>
                    <button onClick={() => previousPage()}>Previus</button>
                    <button onClick={() => nextPage()}>Next</button>
                </nav>
                <section>
                    {
                        infoMovie && (
                            <ListMovie
                                infoMovie={infoMovie}
                                valuesForPageInfo={valuesForPageInfo}
                            />
                        )
                    }
                </section>
                <nav className='container-button-popular'>
                    <button onClick={() => firtsPage()}>First</button>
                    <button onClick={() => previousPage()}>Previus</button>
                    <button onClick={() => nextPage()}>Next</button>
                </nav>
            </section>
        </main>
    );
}

export default Search;
