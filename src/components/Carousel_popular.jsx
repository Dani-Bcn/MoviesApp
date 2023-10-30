import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Carousel_popular() {
  const [dataResulst, setDataResulsts] = useState();
  const [dataPopular, setDataPopular] = useState();
  const [dataTopRated,setDataTopRated] = useState()
  const movieOrTv = localStorage.getItem("movieOrTv");
  const navigate = useNavigate();

  useEffect(() => {
    movieOrTv ?
    
           fetch(
            `https://api.themoviedb.org/3/${movieOrTv}/popular?api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
          )
            .then((res) => res.json())
            .then((resp) => setDataPopular(resp.results))
            :null
            movieOrTv ?
            fetch(
                `https://api.themoviedb.org/3/${movieOrTv}/top_rated?api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
              )
                .then((res) => res.json())
                .then((resp) => setDataTopRated(resp.results)):null
            
               
  }, [movieOrTv])

  dataPopular ? console.log(dataPopular) : null;

  return (
    <main className="-mt-72 z-40">     
    <h2 className="px-6 py-3 text-orange-100 text-3xl font-bold ">Popular</h2>
      {dataPopular ? (
        <section className="flex h-[275px] justify-between overflow-y-hidden scroll-auto">
          {dataPopular.map((e, i) => {
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
       <h2 className="px-6 py-3 text-orange-100 text-3xl font-bold ">Top rated</h2>
         {dataTopRated ? (
        <section className="flex h-96 justify-between overflow-y-hidden scroll-auto">
          {dataTopRated.map((e, i) => {
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
