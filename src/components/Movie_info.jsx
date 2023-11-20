import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { data, info } from "autoprefixer";

export default function Movie_info(props) {
  const { getImages } = props;
  const idMovie = localStorage.getItem("idMovie");
  const movieOrTv = localStorage.getItem("movieOrTv");
  const [infoMovie, setInfoMovie] = useState();
  const [infoCast, setInfoCast] = useState();
  const [dataVideos, setDataVideos] = useState();
  const [dataImages, setDataImages] = useState();
  const [selectedImages, setSelectedImages] = useState();
  let arrayNames = ["Backdrops", "Logos", "Posters"];
  let arrayImages = [];
  const navigate = useNavigate();

  useEffect(() => {
    idMovie !== undefined
      ? fetch(
          `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}?api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=50&sort_by=popularity.asc&include_null_first_air_dates=true`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfoMovie(resp))
      : null;
  }, [idMovie]);

  useEffect(() => {
    idMovie !== undefined
      ? fetch(
          `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/credits?api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfoCast(resp))
      : null;
  }, [idMovie]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/videos?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataVideos(resp.results));
  }, [idMovie]);

  useEffect(() => {
    idMovie !== undefined
      ? fetch(
          `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/images?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setDataImages(resp))
      : null;
  }, []);

  dataImages ? (arrayImages = Object.values(dataImages)) : null;
  arrayImages.map((e, i) => {
    typeof e === "number" ? arrayImages.splice(i, 1) : null;
  });
  arrayImages.map((e, i) => {
    e.length === 0 ? arrayNames.splice(i, 1) : null;
  });

  const variantsShowImages = {
    open: {
      marginTop: [-50, 0],
    },
    closed: {
      marginTop: [0, -50],
    },
  };
  return (
    <m.main
      className="    
     fixed
        py-20
        h-screen
        w-screen         
        text-slate-200    
        opacity-100
        overflow-x-hidden
    "
      animate={{
        opacity: [0, 0, 1],
        transition: {
          duration: 0.5,
        },
      }}
      exit={{
        opacity: [1, 0],
        transition: {
          duration: 0.2,
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
            <div className="fixed z-10 mt-76  w-screen h-screen bg-gradient-to-t to-slate-800/[0.99]  from-slate-800/[0.01]"></div>
            <div
              className="fixed w-screen h-screen opacity-[0.6] "
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
            <img
              className=" z-10 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100 "
              src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`}
            />

            <article className=" w-52 flex flex-col px-5 z-10">
              <section className="flex gap-2.5 my-1">
                <div className="w-8 h-8 rounded-[20px]  flex items-center justify-center border-2 border-green-500">
                  {infoMovie.spoken_languages === 0 ? (
                    infoMovie.original_language.toUpperCase()
                  ) : (
                    <p className="mt-0.5">
                      {infoMovie.spoken_languages[0].iso_639_1.toUpperCase()}
                    </p>
                  )}
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
                {movieOrTv !== "tv" ? (
                  <p>{infoMovie.runtime}'</p>

                ) : !infoMovie.episode_run_time?null:
                 infoMovie.episode_run_time.length === 0 ? null : (
                  <p> {infoMovie.episode_run_time}'</p>
                )}
              </section>
              {
                !infoMovie.number_of_seasons ?null:
                 <p> Seasons  {infoMovie.number_of_seasons}</p>
              }
             
              <section className=" relative flex gap-x-2 flex-wrap ">
                {infoMovie.genres.map((e, i) => {
                  return <p key={i}> {e.name}</p>;
                })}
              </section>

              <a href={infoMovie.homepage}>
                <button className="w-30">Home page</button>
              </a>
              <section className="relative w-screen z-20 flex gap-5">
                <span className="flex flex-col justify-start items-start">
                  <button
                    className="h-0"
                    onClick={() => setSelectedImages(!selectedImages)}
                  >
                    Images
                  </button>
                  <m.section className="absolute my-7 flex flex-col items-start overflow-hidden h-20 z-40">
                    {arrayNames.map((e, i) => {
                      return (
                        <m.button
                          variants={variantsShowImages}
                          animate={selectedImages ? "open" : "closed"}
                          className="opacity-100 z-30"
                          key={i}
                          onClick={() => {
                            navigate("/images"),
                              localStorage.setItem("imagesTypes", e);
                          }}
                        >
                          {e}
                        </m.button>
                      );
                    })}
                  </m.section>
                </span>
              </section>
            </article>
          </section>
          <section className="relative  z-10">
            <p className="text-slate-50 p-x10 p-5">{infoMovie.overview}</p>
          </section>
          {infoCast !== undefined ? (
            <section className="relative z-20 w-screen flex overflow-y-hidden mx-2">
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

          {dataVideos ? (
            dataVideos.length !== 0 ? (
              <section>
                <section
                  className=" mt-2 z-40 absolute w-screen h-[250px]"
                  onClick={() => navigate("/trailers")}
                ></section>

                <section className="flex w-screen overflow-y-hidden my-2 md:my-0">
                  <section className="z-10">
                    <iframe
                      className="w-screen h-60 mr-5 md:h-96"
                      src={`//www.youtube.com/embed/${dataVideos[0].key}/?autoplay=0;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
                    ></iframe>
                  </section>
                </section>
              </section>
            ) : null
          ) : null}
        </section>
      ) : null}
    </m.main>
  );
}
