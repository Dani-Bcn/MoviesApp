import React, { useEffect, useState } from 'react';
import ListMovie from './ListMovies'

const MostPopular = () => {

    const [infoMovies, setInfomovies] = useState()

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=55b2cf9d90cb74c55683e395bb1ad12b&watch_region=US&with_watch_monetization_types=rent`)
            .then(resp => resp.json())
            .then(resp => setInfomovies(resp))
    }, [])
    if (infoMovies) {
        console.log(infoMovies)
    }
    return (
        <div className='popular'>
            {
                infoMovies && (
                    <h1>{infoMovies.results[0].title}</h1>
                )
            }
        </div>
    );
}

export default MostPopular;
