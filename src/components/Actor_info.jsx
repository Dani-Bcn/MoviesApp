import React, { useEffect, useState } from "react";
import {motion as m} from "framer-motion"

export default function Actor_info() {
 
  const [idPerson, setIdPerson] = useState(localStorage.getItem("idPerson"));
  const [dataActor, setDataActor] = useState();
  const [dataMovies, setDataMovies] = useState();
  const [activeBio, setActiveBio] = useState(true)

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${idPerson}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataActor(resp));
  }, []);
  useEffect(() => {
    idPerson
      ? fetch(
          `https://api.themoviedb.org/3/discover/movie?with_cast=${idPerson}&sort_by=release_date.desc&api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
        )
          .then((resp) => resp.json())
          .then((resp) => setDataMovies(resp.results))
      : null;
  }, []);

 
  const variantsBio ={
    open:{
      height:"0%"
    },
    closed:{
      height:"100%"
    }
  }

  return (
    <m.main className="absolute z-20  h-screen bg-slate-800"
      animate={{
        opacity:[0,1]
      }}
    >
      {dataActor ? (
        <section className=" text-orange-50 flex p-5">
          <img
            className="rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-slate-950/100 "
            src={`https://image.tmdb.org/t/p/w500/${dataActor.profile_path}`}
          />
          <article className="w-52 px-5 flex flex-col flex-wrap" >
            <h2 className="text-[1.1rem] py-1">{dataActor.name}</h2>
            <p>{dataActor.birthday}</p>
            <p>{dataActor.place_of_birth}</p>
            <p>{dataActor.known_for_department}</p>
            <p>{dataActor.popularity}</p>
          </article>
        </section>
      ) : null}

      <section className="flex overflow-y-hidden h-64">
        {dataMovies
          ? dataMovies.map((e, i) => {             
              return (     
                    <img key={i}
                      className=" rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-slate-950/100 ml-5 "
                      src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                    />
              );
            })
          : null}
      </section>
     {dataActor?
      <>
        <h2 className="text-orange-300 m-5  w-32 h-0% text-[1.1rem]"
          onClick={()=>{setActiveBio(!activeBio),console.log(activeBio)}}>Biography</h2>
      <m.article className=" w-[90%] text-orange-50 px-5 overflow-hidden" 
      variants={variantsBio}
        animate={    
          activeBio ? "open":"closed"                   
        }      
        transition={{
          duration:0.5
        }}
      >
      
        <p>{dataActor.biography}</p>
      </m.article>
       </>
      :null
     
      } 
    </m.main>
  );
}
