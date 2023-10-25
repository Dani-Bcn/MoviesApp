import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Movie_info(props) {
  const { getIdPerson } = props;
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
        h-full
        text-slate-200
        bg-slate-800
        z-20
    "
      animate={{
        opacity:[0,1],
        transition: {
          duration: 0.5,
        },
      }}
      exit={{
        opacity:[1,0]
      }}
    >
      {infoMovie ? (
        <section>
          <section className="flex p-5">
            <m.img
            className="rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-slate-950/100 "
              src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`}
            />          

            <article className="flex flex-col px-5">
              <h2 className="text-[1.3rem]">{infoMovie.title}</h2>
              <section className="flex gap-5">
              {/* <p>{infoMovie.release_date.slice(0, 4)}</p> */}
              <p>{infoMovie.runtime}"</p>
              <p>{infoMovie.original_language}</p>

              {infoMovie.production_companies? (
                <p>{infoMovie.production_companies[0].origin_country}</p>
              ) : (
                <p>{infoMovie.production_countries[0].iso_3166_1}</p>
              )}
              </section>
              <section className="flex gap-x-2 flex-wrap" >
              {infoMovie.genres.map((e, i) => {
                return <p key={i}> {e.name}</p>;
              })}
              </section>              
              <a href={infoMovie.homepage}>
                <button>Home page</button>
              </a>             
            </article>
          </section> 
          <p className="p-x10 p-5">{infoMovie.overview}</p> 

          {infoCast !== undefined ? (
            <section className="flex overflow-y-hidden mx-2">
              {infoCast.cast.map((e, i) => {
                return (
                  <section key={i}>
                    {e.profile_path !== null ? (
                      <section className="m-2 flex flex-col items-center w-40"
                        onClick={() => {
                          navigate("/infoActor"), getIdPerson(e.id);
                        }}
                      >
                        <m.img className="rounded-2xl shadow-xl shadow-slate-950/100 "
                          src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                          whileInView={{
                            opacity: [0, 1],
                            transition: {
                              duration: 0.5,
                            },
                          }}
                        />
                        <section className="z-20">
                          <h3 className="z-20">{e.name}</h3>
                          <h3 className="text-slate-400">{e.character}</h3>
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
                  <section key={i}>
                   
                    <iframe className="w-screen h-60 mr-5 md:h-96"
                      src={`//www.youtube.com/embed/${e.key}/?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
                    ></iframe>
                  </section>
                ))
              : null}
          </section>
        </section>
      ) : null}
    </m.main>
  );
}
