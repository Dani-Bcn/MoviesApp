import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion as m } from "framer-motion";
import gsap from "gsap";

export default function Actor_info() {
  const [idPerson, setIdPerson] = useState(localStorage.getItem("idPerson"));
  const [dataActor, setDataActor] = useState();
  const [dataMovies, setDataMovies] = useState();
  const [dataPictures, setDataPictures] = useState();
  const [dataTv, setDataTv] = useState();
  const [activeBio, setActiveBio] = useState(true);
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
    dataPictures ? console.log(dataPictures) : null;
  }, []);

  const activeImage = (e) => {
    setActiveBio(!activeBio);
    activeBio
      ? gsap.to(`#${e}`, {
          scale: 2.5,
          position: "absolute",
        })
      : gsap.to(`#${e}`, {
          scale: 1,
          position:"static"
        });
  };

  const variantsBio = {
    open: {
      height: "0%",
    },
    closed: {
      height: "100%",
    },
  };

  return (
    <m.main
      className="opacity-100 mt-28 w-full  z-10 px-5  bg-slate-800"
      exit={{
        opacity: [1, 0],
        transition: {
          duration: 0.1,
        },
      }}
    >
      {dataActor ? (
        <section className=" text-orange-50 flex py-5">
          <h2 className=" absolute -mt-12  text-[1.5rem] ">{dataActor.name}</h2>
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
        <section className="flex  overflow-y-hidden gap-10  h-72">
          {dataMovies.map((e, i) => {
            return e.poster_path ? (
              <img
                onClick={() => {
                  navigate("/infoMovie"), localStorage.setItem("idMovie", e.id);
                }}
                key={i}
                className="flex  rounded-2xl w-40 border-[3px] border-orange-300 shadow-xl shadow-slate-950/100"
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
              />
            ) : null;
          })}
        </section>
      ) : null}
      {dataPictures ? (
        <section className="flex justify-center overflow-y-hidden gap-10  h-72">
          {dataPictures.profiles.map((e, i) => {
            return (
              <img
                onClick={() =>
                  activeImage(e.file_path.slice(2, e.file_path.length - 4))
                }
                id={e.file_path.slice(2, e.file_path.length - 4)}
                key={i}
                className="flex m-auto rounded-2xl w-40 border-[3px] border-orange-300 shadow-xl shadow-slate-950/100"
                src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}
              />
            );
          })}
        </section>
      ) : null}

      {dataActor && dataActor.biography ? (
        <>
          <h2 className="z-20 text-orange-300 m-2  w-32 h-5 text-[1.1rem]">
            Biography
          </h2>
          <p className="p-2 text-orange-100">{dataActor.biography}</p>
        </>
      ) : null}
    </m.main>
  );
}
