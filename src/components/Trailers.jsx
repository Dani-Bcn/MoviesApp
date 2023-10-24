import React, { useState, useEffect } from "react";

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

  return dataMovie ? (
    <main
      className="
      absolute
            w-screen
            bg-slate-800
            z-50
        "
    >
      <section
        className="
            w-screen            
            h-screen
            text-orange-50            
            text-[0.8rem]
        "
      >
        {dataMovie.map((e, i) => (
          <section key={i}>
            <article
                className="
                    p-5
                    
                "
            >
              <h2>{e.name}</h2>
              <h2>{e.published_at}</h2>
            </article>
            {console.log(e.key)}
            <iframe
              className="
               w-screen
               h-56
               sm:h-96
               "
              src={`//www.youtube.com/embed/${e.key}/?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
            ></iframe>
          </section>
        ))}
      </section>
    </main>
  ) : null;
}
