import React ,{useEffect, useState} from "react";
import {motion as m} from "framer-motion"

export default function Movie_info(props) {

  const { idMovie } = props;
  const [infoMovie, setInfoMovie] = useState()

  useEffect(() => {
    idMovie !== undefined?
    fetch(
        `https://api.themoviedb.org/3/movie/${idMovie}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setInfoMovie(resp))
  :null
  },[idMovie])
  console.log(infoMovie); 
  return (
    <main
   className="
    absolute
    z-20
    "   
    >
        {
            infoMovie?
           <> 
          

            <m.img
             /*  variants={variantsImages}
              animate={activePoster ? "open" : "closed"} */
              className="
                w-screen
                h-[500px] 
            "
              src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`}
            />
            </> 
         :null
        
        }
    </main>
  );      
} 
            