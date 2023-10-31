import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Actor_movies() {
  const navigate = useNavigate()
  const idPerson = localStorage.getItem("idPerson");
  const idMovie = localStorage.getItem("idMovie")
  const movieOrTv = localStorage.getItem("moviOrTv")
  const [dataMovies, setDataMovies] = useState();
  const [countPage, setCountPage] = useState(1);
  const [newCall,setNewCall] = useState()
  const [dtaAray, setDataArray] =useState([])

  useEffect(() => {
    idPerson
      ? fetch(
          `https://api.themoviedb.org/3/discover/movie?with_cast=${idPerson}&sort_by=release_date.desc&api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=${countPage}`
        )
          .then((resp) => resp.json())
          .then((resp) => setDataMovies(resp.results))
      : null;
  }, [newCall]);
 
  dataMovies ? console.log(dataMovies) : null;

  return (
    <main className="flex flex-wrap mt-20  justify-start ">
      {dataMovies
        ? dataMovies.map((e, i) => {
            return e.poster_path ? (
              <img
                onClick={() => {
                  navigate("/infoMovie");
                  localStorage.setItem("idMovie", e.id);
                }}
                key={i}
                className="w-50 m-5  z-40 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-slate-950/100"
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
              />
            ) : null;
          })
        : null}
        <h2 className="text-red-100 p-10"
          onClick={()=> {setCountPage(countPage +1 ), setNewCall(!newCall)}}
        >Next page</h2>
    </main>
  );
}
