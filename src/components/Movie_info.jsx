import React, { useEffect, useState, Suspense } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { data, info } from "autoprefixer";
import ReactPlayer from "react-player";

export default function Movie_info(props) {
  const { getImages } = props;
  const idMovie = localStorage.getItem("idMovie");
  const movieOrTv = localStorage.getItem("movieOrTv");
  const [infoMovie, setInfoMovie] = useState();
  const [infoCast, setInfoCast] = useState();
  const [dataVideos, setDataVideos] = useState();
  const [dataImages, setDataImages] = useState();
  const [selectedImages, setSelectedImages] = useState();
  const [autoPlay, setAutoPlay] = useState(false);
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
    window.screen.width > 900 ? setAutoPlay(true) : setAutoPlay(false);
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
  const [activeTrailers, setActiveTrailers] = useState(false);

  useEffect(() => {
    window.screen.orientation.type === "portrait-primary" 
      ? setActiveTrailers(false)
      : setActiveTrailers(true);
    console.log(activeTrailers);
  }, []);

  const coco = () => {
    window.screen.orientation.type === "portrait-primary"
      ? setActiveTrailers(false)
      : setActiveTrailers(true);
    console.log(window.screen.orientation.angle);
  };

  window.addEventListener("resize", () => coco());

 

  return (
    <m.main
      className="    
        fixed   
        my-14 
        pb-10  
        lg:py-10
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
          <section className="mx-5 overflow-hidden">
            {infoMovie ? (
              infoMovie.title ? (
                <h2 className="text-[1.5rem]">{infoMovie.title}</h2>
              ) : (
                <h2 className="text-[1.5rem]">{infoMovie.name}</h2>
              )
            ) : null}
          </section>

          <div className="fixed z-20 w-screen h-screen bg-gradient-to-t to-slate-800/[0.99]  from-slate-800/[0.01]"></div>
          <div
            className="fixed bg-slate-950 w-screen h-screen bg-top bg-no-repeat"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${infoMovie.poster_path})`,
            }}
          ></div>
        </>
      ) : null}

      {infoMovie ? (
        <section>
          <section className="flex p-5">
            <img
              className="z-20 lg:w-96 lg:h-96 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100 "
              src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`}
            />

            <article className=" w-screen flex flex-col px-5 z-20">
              <section className="flex gap-2.5 my-1">
                <div className="w-8 h-8 rounded-[20px]  flex items-center justify-center border-2 border-green-500">
                  {infoMovie.spoken_languages.length === 0 ? (
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
                ) : !infoMovie.episode_run_time ? null : infoMovie
                    .episode_run_time.length === 0 ? null : (
                  <p> {infoMovie.episode_run_time}'</p>
                )}
              </section>
              {!infoMovie.number_of_seasons ? null : (
                <p> Seasons {infoMovie.number_of_seasons}</p>
              )}

              <section className="relative flex gap-x-2 flex-wrap w-40">
                {infoMovie.genres.map((e, i) => {
                  return <p key={i}> {e.name} |</p>;
                })}
              </section>

              <a className="w-24" href={infoMovie.homepage}>
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
            {dataVideos ? (
              dataVideos.length > 0 ? (
                <>
                  <ReactPlayer
                    id="movie"
                    className=" lg:flex md:flex hidden absolute  border-2 border-orange-300 z-40 shadow-xl shadow-slate-950"
                    url={`https://www.youtube.com/watch?v=${dataVideos[0].key}`}
                    playing={autoPlay}
                    controls={true}
                  ></ReactPlayer>
                  <div
                    onClick={() => navigate("/trailers")}
                    className="lg:mt-32 lg:ml-[200vh] ml-[192vh] flex  absolute mt-10 w-20 h-32 cursor-pointer items-center bg-gradient-to-r to-slate-700  from-slate-800/[0] clip-full-arrow-r z-40 shadow-xl shadow-slate-950"
                  >
                    <p className=" flex flex-col  w-10 text-start ml-4">
                      All trailers
                    </p>
                  </div>
                </>
              ) : null
            ) : null}
          </section>
        

          <section className="relative  z-20">
            <p className="text-slate-50 p-x10 p-5 w-screen lg:w-96">
              {infoMovie.overview}
            </p>
          </section>
          {infoCast !== undefined ? (
            <section className="relative my-12  z-20 w-screen flex overflow-y-hidden pr-5 mr-20">
              {infoCast.cast.map((e, i) => {
                return (
                  <section key={i}>
                    {e.profile_path !== null ? (
                      <section
                        className="m-2  flex flex-col items-center w-40"
                        onClick={() => {
                          navigate("/infoActor"),
                            localStorage.setItem("idPerson", e.id);
                        }}
                      >
                        <img
                          className=" cursor-pointer  z-20 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100 "
                          src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                        />
                        <section className="z-20">
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
              <section className="w-screen h-72 flex lg:hidden md:hidden">
                <section
                  className=" mt-2 z-40 absolute w-screen h-60 "
                  onClick={() => navigate("/trailers")}
                ></section>
                <section className="flex z-20 w-screen">
                  <iframe
                    className="w-screen h-52 ml-1 mb-10"
                    src={`//www.youtube.com/embed/${dataVideos[0].key}`}
                  ></iframe>
                </section>
              </section>
            ) : null
          ) : null}
        </section>
      ) : null}
    </m.main>
  );
}
