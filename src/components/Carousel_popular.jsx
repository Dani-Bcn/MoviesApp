import React, { useEffect, useState } from "react";

export default function Carousel_popular() {
  const [dataResulst, setDataResulsts] = useState();
  const movieOrTv = localStorage.getItem("movieOrTv");

  useEffect(() => {
    movieOrTv
      ? fetch(
          `https://api.themoviedb.org/3/discover/${movieOrTv}/?api_key=55b2cf9d90cb74c55683e395bb1ad12b&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`
        )
          .then((res) => res.json())
          .then((resp) => setDataResulsts(resp.results))
      : null;
  }, [movieOrTv]);
  dataResulst ? console.log(dataResulst) : null;

  return (
    <main className="-mt-96 z-40">
      {dataResulst ?
        <section className="flex justify-between overflow-y-hidden scroll-auto">
          {dataResulst.map((e, i) => {
           
           
            return (
             
                <img className=" z-10 rounded-2xl mx-5 border-[3px] border-orange-300 shadow-xl shadow-black/100 "
                  key={i}                
                  src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                />
             
            )
          })}
        </section>
      : null}
    </main>
  );
}
