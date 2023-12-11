import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion as m, transform } from "framer-motion";

export default function Actor_info() {
  let idPerson = localStorage.getItem("idPerson");
  const [dataActor, setDataActor] = useState();
  const [dataMovies, setDataMovies] = useState();
  const [dataPictures, setDataPictures] = useState();
  const [imgActor, setImgActor] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    idPerson
      ? fetch(
          `https://api.themoviedb.org/3/person/${idPerson}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setDataActor(resp))
      : null;
  }, [idPerson]);
  useEffect(() => {
    console.log(dataActor);
    if (idPerson) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_cast=${idPerson}&sort_by=release_date.desc&api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
      )
        .then((resp) => resp.json())
        .then((resp) => setDataMovies(resp.results));

      fetch(
        `https://api.themoviedb.org/3/person/${idPerson}/images?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
      )
        .then((res) => res.json())
        .then((resp) => setDataPictures(resp.profiles));
    }
  }, []);

  console.log(dataActor);
  let count = 100;

  const moveLeft = (e) => {
    console.log(e);
  };

  return (
    <m.main
      className=" w-screen flex justify-center md:pt-20 pt-32 "
      animate={{
        opacity: [0, 0, 1],
        transition: {
          duration: 0.3,
        },
      }}
      exit={{
        opacity: [1, 0],
        transition: {
          duration: 0.3,
        },
      }}
    >
      {dataActor ? (
        <section className="fixed w-screen flex z-10 -mt-20 justify-center ">
          <img
            className=" w-full h-full md:w-[50vw]"
            src={`https://image.tmdb.org/t/p/w500/${dataActor.profile_path}`}
          />
        </section>
      ) : null}
      <div className="fixed w-screen h-[650px] bg-gradient-to-t to-slate-800/[0] from-slate-800 z-20 -mt-20"></div>
      <div className="fixed w-screen h-[650px] bg-gradient-to-t to-slate-800 from-slate-800/[0] z-20 -mt-20"></div>
    
      <section className="absolute z-40">
        <section className="flex flex-col md:flex-row w-screen md:items-center lg:items-center">
        <section className="ml-5 ">
          {dataActor ? (
            <section className=" text-orange-50 flex ">
              <h2 className=" absolute -mt-12 px-5  text-[1.5rem] ">
                {dataActor.name}
              </h2>
              <article className="w-52 px-5 flex flex-col ">
                <p>{dataActor.birthday}</p>
                <p>{dataActor.place_of_birth}</p>
                <p>{dataActor.known_for_department}</p>
                <p>{dataActor.popularity}</p>
              </article>
            </section>
          ) : null}
        </section>
      
        <section className="relative gap-5 px-10 md:ml-20 lg:px-20  w-screen h-80 flex items-center overflow-y-auto ">
          {dataPictures
            ? dataPictures.map((e, i) => {
                return (
                  <img
                    key={i}
                    className="cursor-pointer z-30 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-slate-950/100"
                    src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}
                  />
                );
              })
            : null}
        </section>
        </section>        
          {dataMovies ? (
            <section className="relative gap-5 px-5 z-40 w-screen h-80 flex items-center overflow-y-auto">
              {dataMovies.map((e, i) => {
                return e.poster_path ? (
                  <img
                    onClick={() => {
                      navigate("/infoMovie");
                      localStorage.setItem("movieOrTv", "movie");
                      localStorage.setItem("idMovie", e.id);
                    }}
                    key={i}
                    className="cursor-pointer z-30 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-slate-950/100"
                    src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                  />
                ) : null;
              })}
              {dataMovies.length > 8 ? (
                <div
                  onClick={() => navigate("/actorMovies")}
                  className="cursor-pointer flex items-center clip-arrow-l text-2xl text-orange-200 bg-gradient-to-l from-blue-600 to-red-600/[0]  pr-5 px-2 mr-10 h-56"
                >
                  All
                </div>
              ) : null}
            </section>
          ) : null}
          {dataActor && dataActor.biography ? (
            <section className=" mx-5 my-10 z-40">
              <h2 className="z-40 text-orange-300 m-2 text-[1.5rem]">
                Biography
              </h2>
              <p className=" text-orange-100">
                {dataActor.biography}
              </p>
            </section>
          ) : null}
        </section>
  
    </m.main>
  );
}
