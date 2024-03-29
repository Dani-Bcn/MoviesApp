import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Actor_movies() {
  const navigate = useNavigate();
  const idPerson = localStorage.getItem("idPerson");
  const idMovie = localStorage.getItem("idMovie");
  const movieOrTv = localStorage.getItem("moviOrTv");
  const [dataMovies, setDataMovies] = useState();
  const [dataPages, setDataPages] = useState();
  const [countPage, setCountPage] = useState(1);
  const [newCall, setNewCall] = useState();

  useEffect(() => {
    idPerson
      ? fetch(
          `https://api.themoviedb.org/3/discover/movie?with_cast=${idPerson}&sort_by=release_date.desc&api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=${countPage}`
        )
          .then((resp) => resp.json())
          .then((resp) => setDataMovies(resp))
      : null;
    dataMovies ? setDataPages(dataMovies.total_pages) : null;
  }, [dataMovies])

  return (
    <main className="absolute w-screen ">
 
      <section className="bg-slate-800/[0.7] backdrop-blur-sm  fixed flex  mt-10 w-screen h-10 justify-center items-center z-50">
       {countPage < dataPages ? (
        <h2
          className="text-orange-200  w-32 text-center cursor-pointer"
          onClick={() => {
           setCountPage(countPage + 1), setNewCall(!newCall);
          }}
        >
          Next page
        </h2>  
      ) : null}
       {countPage > 1  ? (
        <h2
          className="text-orange-200  w-32 text-center cursor-pointer"
          onClick={() => {
           setCountPage(countPage - 1), setNewCall(!newCall);
          }}
        >
          Previus page
        </h2>  
      ) : null}
      </section>
      <section className="flex flex-wrap start mt-28 px-7 gap-8 pb-10">
      {dataMovies
        ? dataMovies.results.map((e, i) => {
            return e.poster_path ? (
              <img
                onClick={() => {
                  navigate("/infoMovie");
                  localStorage.setItem("idMovie", e.id);
                }}
                key={i}
                className=" cursor-pointer w-50 z-30 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-slate-950/100"
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
              />
            ) : null;
          })
        : null}
      </section>
    </main>
  );
}
