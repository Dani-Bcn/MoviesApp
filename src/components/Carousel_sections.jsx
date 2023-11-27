import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  {motion as m} from "framer-motion"

export default function Carousel_popular() {
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

  return (
    <m.main className="fixed pt-96 ml-6  h-screen  z-30 overflow-x-hidden"
    animate={{
      x:0,
      scale:1,
      opacity:[0,1]
    }}
    exit={{
      x:-50,
      scale:1.8,
      opacity:[1,0],
      transition:{
        duration:0.3,
      }
    }}     
    >     
    <section className="md:-mt-80">
    <h2 className="px-6 mt-5 text-orange-100 text-6xl font-dorsa">Actuality</h2>
      {dataPopular ? (
       <section className="flex items-start my-2 h-[260px] w-[97vw] overflow-y-hidden ">
          {dataPopular.map((e, i) => {
            return (
              <img
                onClick={() => {
                  navigate("/infoMovie");
                  localStorage.setItem("idMovie", e.id);
                  localStorage.setItem("movieOrTv", movieOrTv);
                }}
                className="cursor-pointer z-10  rounded-2xl mx-5 border-[3px] border-orange-300 shadow-xl shadow-black/100 "
                key={i}
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
              />
            );
          })}
        </section>
      ) : null}     
       <h2 className="px-6 mt-5 text-orange-100 text-6xl font-dorsa  ">Top rated</h2>
         {dataTopRated ? (
          <section className="flex items-start my-2 mb-10 h-[260px] w-[97vw] overflow-y-hidden ">
          {dataTopRated.map((e, i) => {
            return (
              <img
                onClick={() => {
                  navigate("/infoMovie");
                  localStorage.setItem("idMovie", e.id);
                }}
                className="cursor-pointer z-10 rounded-2xl mx-5 border-[3px] border-orange-300 shadow-xl shadow-black/100 scroll-auto "
                key={i}
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
              />
            );
          })}
        </section>
      ) : null}    
      </section>
    </m.main>
  );
}
