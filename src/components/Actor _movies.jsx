import React, { useState, useEffect } from 'react'

export default function Actor_movies() {

  const idPerson = localStorage.getItem("idPerson")
  const [dataMovies,setDataMovies] = useState()

  useEffect(() => {
    idPerson ?
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_cast=${idPerson}&sort_by=release_date.desc&api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
      )
        .then((resp) => resp.json())
        .then((resp) => setDataMovies(resp.results))     
        :null
  }, []); 
  dataMovies? console.log(dataMovies):null
  return (
    <div>Actor's movies</div>
  )
}
