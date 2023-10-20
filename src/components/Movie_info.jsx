import React ,{useEffect, useState} from "react";

export default function Movie_info(props) {

  const { idMovie } = props;
  const [findMovie, setFindMovie] = useState()



  useEffect(() => {
 idMovie !== undefined?
    fetch(
        `https://api.themoviedb.org/3/movie/${idMovie}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setFindMovie(resp))
  :null
  },[idMovie])

  console.log(findMovie);
 
  return (

    <main
    className="
    absolute
    w-screen
    text-5xl
    text-red-800
    "
    >
        <h1>Movie info</h1>
    </main>
  );      
} 
            