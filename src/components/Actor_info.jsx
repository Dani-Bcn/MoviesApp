import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion as m } from "framer-motion";
import gsap from "gsap";

export default function Actor_info() {
  const [idPerson, setIdPerson] = useState(localStorage.getItem("idPerson"));
  const [dataActor, setDataActor] = useState();
  const [dataMovies, setDataMovies] = useState();
  const [dataPictures, setDataPictures] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("movieOrTv", "movie");
    fetch(
      `https://api.themoviedb.org/3/person/${idPerson}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataActor(resp));
  }, []);
  useEffect(() => {
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
        .then((resp) => setDataPictures(resp));
    }
  }, []);

  return (
    <m.main
      className="fixed px-5 flex justify-center pt-32 h-screen z-40 overflow-x-auto"
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
      <section>
        {dataActor ? (
          <section className=" text-orange-50 flex py-5">
            <h2 className=" absolute -mt-12  text-[1.5rem] ">
              {dataActor.name}
            </h2>
            <img
              className="rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-slate-950/100 my-2 "
              src={`https://image.tmdb.org/t/p/w500/${dataActor.profile_path}`}
            />
            <article className="w-52 px-5 flex flex-col flex-wrap">
              <p>{dataActor.birthday}</p>
              <p>{dataActor.place_of_birth}</p>
              <p>{dataActor.known_for_department}</p>
              <p>{dataActor.popularity}</p>
            </article>
          </section>
        ) : null}

        {dataMovies ? (
          <section className="relative z-40 w-screen h-72 flex items-center overflow-y-auto scroll-auto">
            {dataMovies.map((e, i) => {
              return e.poster_path ? (               
                  <img
                    onClick={() => {
                      navigate("/infoMovie");
                      localStorage.setItem("idMovie", e.id);
                    }}
                    key={i}
                    className=" w-screen mr-10  z-40 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-slate-950/100"
                    src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                  />           
              ) : null
            })}
            <div onClick={()=> navigate("/actorMovies")}
            className=" flex items-center clip-arrow-l text-2xl text-orange-200 bg-slate-600 pr-5 px-2 mr-10 h-56">
              All
            </div>
          </section>
        ) : null}
        {dataActor && dataActor.biography ? (
          <section className="mr-10">
            <h2 className="z-50 text-orange-300 m-2 h-5 text-[1.1rem]">
              Biography
            </h2>
            <p className="p-2 text-orange-100">{dataActor.biography}</p>
          </section>
        ) : null}
      </section>
    </m.main>
  );
}
