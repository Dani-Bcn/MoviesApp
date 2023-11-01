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
    <main className=" fixed flex ">
      <section className=" flex flex-wrap items-start px-7 gap-8 pt-32 pb-10 h-screen overflow-x-hidden ">
      {dataMovies
        ? dataMovies.results.map((e, i) => {
            return e.poster_path ? (
              <img
                onClick={() => {
                  navigate("/infoMovie");
                  localStorage.setItem("idMovie", e.id);
                }}
                key={i}
                className="w-50 z-40 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-slate-950/100"
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
              />
            ) : null;
          })
        : null}
      
      {countPage < dataPages ? (
        <h2
          className="text-red-100 w-screen"
          onClick={() => {
           setCountPage(countPage + 1), setNewCall(!newCall);
          }}
        >
          Next page
        </h2>  
      ) : null}
      </section>
    </main>
  );
}
