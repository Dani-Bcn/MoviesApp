import React, { useState, useEffect } from "react";
import gsap from "gsap";

export default function Trailers() {
  const [movieOrTv, setMovieOrTv] = useState(localStorage.getItem("movieOrTv"));
  const [idMovie, setIdMovie] = useState(localStorage.getItem("idMovie"));
  const [dataMovie, setDataMovie] = useState();
  const [keyWord, setKeyWord] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/videos?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataMovie(resp.results));
  }, [setDataMovie]);

  dataMovie ? console.log(dataMovie) : null;

  const showTrailerMode = (e) => {
    console.log(e);
  };

  return dataMovie ? (
    <main
      className="      
           fixed
            w-screen
            h-full
            bg-slate-800
            -mt-[140px]
            z-50
        "
    >
      <section
        className="          
            
            text-orange-50            
            text-[1rem]
            flex
            flex-col
            gap-10
        "
      >      
        <iframe
          className="
               w-screen
               h-56
               my-10
               sm:my-0
               sm:h-[350px]
            "
          src={`//www.youtube.com/embed/${dataMovie[0].key}/?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
        ></iframe>
      </section>
    </main>
  ) : null;
}
