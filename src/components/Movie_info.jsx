import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Movie_info(props) {
  const { getIdPerson } = props;
  let idMovie = localStorage.getItem("idMovie");
  const [infoMovie, setInfoMovie] = useState();
  const [infoCast, setInfoCast] = useState();
  const navigate = useNavigate();
  console.log(idMovie);
  useEffect(() => {
    idMovie !== undefined
      ? fetch(
          `https://api.themoviedb.org/3/movie/${idMovie}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfoMovie(resp))
      : null;
  }, [idMovie]);

  useEffect(() => {
    idMovie !== undefined
      ? fetch(
          `https://api.themoviedb.org/3/movie/${idMovie}/credits?api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1&page=1`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfoCast(resp))
      : null;
  }, [idMovie]);

  infoCast ? console.log(infoCast) : null;
  return (
    <m.main
      className="
        absolute
        w-screen      
        text-slate-200
        bg-slate-800
        z-20
    "
      animate={{
        transition: {
          duration: 0.5,
        },
      }}
      exit={{
        x: 200,
      }}
    >
      {infoMovie ? (
        <>
          <m.img
            className="
                m-auto
                w-screen
                h-[500px]                 
            "
            src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`}
          />
          <button
            onClick={() => {
              navigate("/trailers");
            }}
            className="
            absolute 
            -mt-16
             mx-5            
            py-1
            px-5
            text-3xl 
            border-red-300
            border-2
            rounded-lg
            "
          >
            Trailer/s
          </button>
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
                    gap-5
                "
              >
                <p>{infoMovie.release_date.slice(0, 4)}</p>
                <p>{infoMovie.runtime}"</p>
                <p>{infoMovie.original_language}</p>
                {infoMovie.production_companies.length !== 0 ? (
                  <p>{infoMovie.production_companies[0].origin_country}</p>
                ) : (
                  <p>{infoMovie.production_countries[0].iso_3166_1}</p>
                )}
              </section>
              <section
                className="
                    flex
                    w-full
                    flex-wrap
                    gap-5
                "
              >
                {infoMovie.genres.map((e, i) => {
                  return <p key={i}> {e.name}</p>;
                })}
              </section>
              <a href={infoMovie.homepage}>Home page</a>
              <p>Cast</p>
              {infoCast !== undefined ? (
                <>
                  {infoCast.cast.map((e, i) => {
                    return (
                      <>
                        {e.profile_path !== null ? (
                          <section
                            onClick={() => {
                              navigate("/infoActor"), getIdPerson(e.id);
                            }}
                            key={i}
                            className=" 
                          w-full
                          h-40
                          p-5
                          bg-slate-700
                          gap-5
                          flex
                          items-center
                          rounded-[10px]
                          shadow-lg shadow-cyan-500/50              
                          "
                          >
                            <img
                              className="
                              w-[100px]
                              h-[150px]
                              p-1
                              rounded-[10px]
                          "
                              src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                              alt=""
                            />
                            <section
                              className="
                                flex
                                flex-col
                                items-center
                                justify-between                                
                            "
                            >
                              <h3>{e.name}</h3>
                            </section>
                          </section>
                        ) : null}
                      </>
                    );
                  })}
                </>
              ) : null}
            </section>
          </section>
        </>
      ) : null}
    </m.main>
  );
}
