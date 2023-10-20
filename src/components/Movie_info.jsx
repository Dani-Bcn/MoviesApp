import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";

export default function Movie_info(props) {
  const { idMovie } = props;
  const [infoMovie, setInfoMovie] = useState();
  const [infoCast, setInfoCast] = useState();

  useEffect(() => {
    idMovie !== undefined
      ? fetch(
          `https://api.themoviedb.org/3/movie/${idMovie}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfoMovie(resp))
      : null;

    fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}/credits?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setInfoCast(resp));
  }, [idMovie]);
  idMovie ? console.log(infoMovie) : null;
  return (
    <m.main
      className="
        absolute
        w-screen      
        text-orange-200
        bg-slate-800
        z-20
    "
      animate={{
        opacity: [0, 1],
      }}
    >
      {infoMovie ? (
        <>
          <m.img
            /*  variants={variantsImages}
              animate={activePoster ? "open" : "closed"} */
            className="
                m-auto
                w-screen
                h-[500px]                 
            "
            src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`}
          />
          <section
            className="
                w-screen
                flex
                flex-col
                items-center
                justify-center            
                gap-5
                p-10
                "
          >
            <h2
              className="
                text-2xl
                "
            >
              {infoMovie.title}
            </h2>
            <p>{infoMovie.overview}</p>
            <section
              className="
                w-screen
                flex
                flex-col
                items-start
                px-10
                gap-5
                "
            >
              <section
                className="
                    flex
                    w-full
                    justify-between
                "
              >
                <p>{infoMovie.release_date.slice(0, 4)}</p>
                <p>{infoMovie.runtime}"</p>
                <p>{infoMovie.original_language}</p>

                <p>{infoMovie.production_companies[0].origin_country}</p>
              </section>
              <section
                className="
                    flex
                    w-full
                    flex-wrap
                    gap-5
                "
              >
                {infoMovie.genres.map((e) => {
                  return <p> {e.name}</p>;
                })}
              </section>
            </section>
          </section>
        </>
      ) : null}
    </m.main>
  );
}
