import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { info } from "autoprefixer";

export default function Movie_info() {
  let idMovie = localStorage.getItem("idMovie");
  const [movieOrTv, setMovieOrTv] = useState(localStorage.getItem("movieOrTv"));
  const [infoMovie, setInfoMovie] = useState();
  const [infoCast, setInfoCast] = useState();
  const [dataVideos, setDataVideos] = useState();
  const navigate = useNavigate();
  console.log(idMovie);
  useEffect(() => {
    idMovie !== undefined
      ? fetch(
          `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfoMovie(resp))
      : null;
  }, [idMovie]);
  infoMovie ? console.log(infoMovie) : null;
  useEffect(() => {
    idMovie !== undefined
      ? fetch(
          `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/credits?api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1&page=1`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfoCast(resp))
      : null;
  }, [idMovie]);

  infoCast ? console.log(infoCast) : null;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/videos?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataVideos(resp.results));
  }, [idMovie]);

  dataVideos ? console.log(dataVideos) : null;

  return (
    <m.main
      className="
        absolute
        w-screen  
        bg-slate-800
        text-slate-200
      z-10
    "
      animate={{      
        scale: [1.5, 1],
        transition: {
          duration: 0.5,
        },
      }}
      exit={{      
        opacity:[1,0,0,0],
        transition: {
          duration: 1,
        },
      }}
    >
      {infoMovie ? (
        <>
          <section className="mx-5">
            {infoMovie ? (
              infoMovie.title ? (
                <h2 className="text-[1.5rem]">{infoMovie.title}</h2>
              ) : (
                <h2 className="text-[1.5rem]">{infoMovie.name}</h2>
              )
            ) : null}
          </section>
          <section>
            <div className="fixed z-10 mt-76 w-screen h-screen bg-gradient-to-t to-slate-800/[0.99]  from-slate-800/[0.01]"></div>
            <div
              className=" fixed w-screen h-screen opacity-[0.8] "
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${infoMovie.poster_path})`,
              }}
            ></div>
          </section>
        </>
      ) : null}

      {infoMovie ? (
        <section>
          <section className="flex p-5">
            <m.img
              className=" z-10 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100 "
              src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`}
            />

            <article className="flex flex-col px-5 z-10">
              <section className="flex gap-2.5 my-1">
                <div className="w-8 h-8 rounded-[20px]  flex items-center justify-center border-2 border-green-500">
                  <p className="mt-0.5">
                    {infoMovie.original_language.toUpperCase()}
                  </p>
                </div>
                <div className="w-8 h-8 flex items-center justify-center border-2 border-red-500">
                  <p>{infoMovie.vote_average.toFixed(1)}</p>
                </div>
              </section>

              <section className="flex gap-3">
                {infoMovie.release_date ? (
                  <p>{infoMovie.release_date}</p>
                ) : (
                  <p>{infoMovie.first_air_date}</p>
                )}
              </section>
              <section className="flex gap-3">
                {movieOrTv === "movie" ? (
                
                  <p>{infoMovie.runtime}'</p>
                ) : (
                  infoMovie.episode_run_time.length === 0?null:
                  <p> {infoMovie.episode_run_time}'</p>
                )}
              </section>

              <section className="flex gap-x-2 flex-wrap">
                {infoMovie.genres.map((e, i) => {
                  return <p key={i}> {e.name}</p>;
                })}
              </section>

              <a href={infoMovie.homepage}>
                <button>Home page</button>
              </a>
            </article>
          </section>
          <section className=" relative w-full h-full z-10">
            <p className="text-slate-50 h-full p-x10 p-5">
              {infoMovie.overview}
            </p>
          </section>

          {infoCast !== undefined ? (
            <section className="flex overflow-y-hidden mx-2">
              {infoCast.cast.map((e, i) => {
                return (
                  <section key={i}>
                    {e.profile_path !== null ? (
                      <section
                        className="m-2 flex flex-col items-center w-40"
                        onClick={() => {
                          navigate("/infoActor"),
                            localStorage.setItem("idPerson", e.id);
                        }}
                      >
                        <img
                          className=" z-10 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100 "
                          src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                        />
                        <section className="z-10">
                          <h3 className="mt-2">{e.name}</h3>
                          <h3 className=" text-[0.8rem] text-slate-300">
                            {e.character}
                          </h3>
                        </section>
                      </section>
                    ) : null}
                  </section>
                );
              })}
            </section>
          ) : null}

          <section className="flex w-screen overflow-y-hidden my-2 md:my-0">
            {dataVideos
              ? dataVideos.map((e, i) => (
                  <section key={i} className="z-10">
                    <m.iframe
                      className="w-screen h-60 mr-5 md:h-96"
                      src={`//www.youtube.com/embed/${e.key}/?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
                      whileInView={{
                        opacity: [0, 1],
                        transition: {
                          delay: 0.2,
                        },
                      }}
                    ></m.iframe>
                  </section>
                ))
              : null}
          </section>
        </section>
      ) : null}
    </m.main>
  );
}
