import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Carousel_popular() {
  const [dataResulst, setDataResulsts] = useState();
  const movieOrTv = localStorage.getItem("movieOrTv");
  const navigate = useNavigate();

  useEffect(() => {
    movieOrTv === "movie"
      ? fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
        )
          .then((res) => res.json())
          .then((resp) => setDataResulsts(resp.results))
      : fetch(
          `https://api.themoviedb.org/3/tv/airing_today?api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
        )
          .then((res) => res.json())
          .then((resp) => setDataResulsts(resp.results));
  }, [movieOrTv]);
  dataResulst ? console.log(dataResulst) : null;

  return (
    <main className="-mt-64 z-40">
      {movieOrTv === "movie" ? (
        <h2 className="text-orange-100 text-2xl px-6 py-2 font-bold">
          Upcoming
        </h2>
      ) : (
        <h2 className="text-orange-100 text-2xl px-6 py-2 font-bold">
          Airing today
        </h2>
      )}
      {dataResulst ? (
        <section className="flex h-96 justify-between overflow-y-hidden scroll-auto">
          {dataResulst.map((e, i) => {
            return (
              <img
                onClick={() => {
                  navigate("/infoMovie");
                  localStorage.setItem("idMovie", e.id);
                }}
                className=" z-10 rounded-2xl mx-5 border-[3px] border-orange-300 shadow-xl shadow-black/100 "
                key={i}
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
              />
            );
          })}
        </section>
      ) : null}
    </main>
  );
}
