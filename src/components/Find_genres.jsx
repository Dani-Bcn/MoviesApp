import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Find_genres() {
  const navigate = useNavigate();
  const [dataGenres, setDataGenres] = useState();
  const [dataMovies, setDataMovies] = useState([]);
  const movieOrTv = localStorage.getItem("movieOrTv");
  const [active, setActive] = useState(false);

  useEffect(() => {
    movieOrTv === "movie" ? setActive(true) : setActive(false);
    dataMovies.splice(0, dataMovies.length);

  }, [movieOrTv]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/${movieOrTv}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataGenres(resp));
  }, [movieOrTv]);

  
  useEffect(() => {
    if (dataGenres) {
      dataGenres.genres.map((e, i) => {
        fetch(
          `https://api.themoviedb.org/3/discover/${movieOrTv}?api_key=55b2cf9d90cb74c55683e395bb1ad12b&include_adult=false&page=1&sort_by=popularity.desc&limit=5&with_genres=${e.id}`
        )
          .then((resp) => resp.json())
          .then((resp) =>
            dataMovies
              ? dataMovies.length < 1
                ? setDataMovies((dataMovies) => [...dataMovies, resp.results])
                : null
              : null
          );
      });
    }
  }, [dataGenres]);
 
  return (
    <main className="mt-24 ">
      {dataMovies
        ? dataMovies.map((e, i) => {
            return (
              <section
                key={i}
                className=" flex overflow-y-hidden lg:overflow-hidden"
              >
                <section className=" flex flex-col justify-start items-start h-[350px] ">
                  {dataGenres ? (
                    <div className=" flex justify-between">
                      <p className="text-orange-100 ml-5 font-dorsa text-6xl  ">
                        {dataGenres.genres[i].name}
                      </p>
                     
                      <button className="text-orange-300 font-dorsa text-6xl hidden lg:flex">All</button>

                    </div>
                  ) : null}
                  <section className="flex lg:gap-10 gap-5 h-72 overflow-y-hidden ">
                    {e.map((e, i) => (
                      <img
                        key={i}
                        onClick={() => {
                          localStorage.setItem("idMovie", e.id);
                          navigate("/infoMovie");
                        }}
                        className="ml-5 cursor-pointer rounded-[10px] border-[3px] border-orange-300 shadow-xl shadow-black/100"
                        src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                      />
                    ))}
                  </section>
                </section>
              </section>
            );
          })
        : null}
    </main>
  );
}
