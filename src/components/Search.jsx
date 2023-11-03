import React, { useEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Search(props) {
  const movieOrTv = localStorage.getItem("movieOrTv");
  const { activeSearch } = props;
  const { activePageSearch } = props;
  const navigate = useNavigate();
  const inputRef = useRef();
  const [newCall, setNewCall] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [findMovie, setFindMovie] = useState();

  const variantsActiveSearch = {
    open: {
      x: 850,
    },
    closed: {
      x: 0,
    },
  };

  useEffect(() => {
    inputRef.current.value.length > 2
      ? fetch(
          `https://api.themoviedb.org/3/search/multi?query=${searchInput}&api_key=55b2cf9d90cb74c55683e395bb1ad12b&`
        )
          .then((resp) => resp.json())
          .then((resp) => setFindMovie(resp.results))
      : null;
  }, [newCall]);
  findMovie ? console.log(findMovie) : null;

  return (
    <m.main
      className="fixed overflow-hidden w-screen  h-screen flex flex-col -ml-[850px]  bg-slate-800/[0.5] backdrop-blur-[20px] z-50"
      variants={variantsActiveSearch}
      animate={activePageSearch ? "open" : "closed"}
      transition={{
        duration: 0.5,
      }}
    >
      <section>
        <svg
          className="h-10 m-2 mx-5"
          onClick={() => {
            activeSearch(false),
              (inputRef.current.value = ""),
              setNewCall(!newCall);
          }}
          width="30px"
          height="30px"
          viewBox="0 0 60 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Shopicon">
            <polygon
              fill="#999"
              points="40,22 14.828,22 28.828,8 26,5.172 7.172,24 26,42.828 28.828,40 14.828,26 400,26 	"
            />
          </g>
        </svg>
        <section className="w-screen p-4 flex items-center justify-start gap-10 text-slate-100 bg-slate-500 ">
          <svg
            width="25px"
            height="30px"
            viewBox="0 0 25 25"
            fill="red"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
              fill="#599"
            />
          </svg>
          <form>
            <input
              className="bg-slate-500"
              ref={inputRef}
              placeholder="Movies/Tv/Persons..."
              onChange={() => {
                setSearchInput(inputRef.current.value);
                setNewCall(!newCall);
              }}
            />
          </form>
        </section>
      </section>
      <section className=" w-screen h-screen flex flex-col m-5 my-10 gap-5 overflow-auto text-orange-100 z-50">
        {findMovie
          ? findMovie.map((e, i) => {
              if (e.media_type === "movie" && e.backdrop_path) {
                return (
                  <section className= " flex w-screen h-32 bg-red-800 text-orange-100 tex-3xl">
                   
                  <img onClick={()=>{ 
                    localStorage.setItem("idMovie",e.id)
                     navigate("/infoMovie")
                    localStorage.setItem("movieOrTv","movie")
                    activeSearch(false)
                  }}
                    className=" w-52 h-32 z-10 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100 "
                    src={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}
                  />
                  <section className=" mx-5 flex flex-col gap-1">
                  <p className="w-32 text-[1.1rem]">{e.title}</p>
                  <p>{e.media_type}</p>
                  </section>
                  </section>
                );
              } else if (e.media_type === "tv" && e.backdrop_path) {
                return (
                  <section className= " flex w-screen h-32 bg-red-800 text-orange-100 tex-3xl">
                  <img onClick={()=>{ 
                    localStorage.setItem("idMovie",e.id)
                     navigate("/infoMovie")
                    localStorage.setItem("movieOrTv","tv")
                    activeSearch(false)
                  }}
                    className=" w-52 h-32 z-10 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100 "
                    src={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}
                  />
                  <section className="mx-5 flex flex-col">
                   <p className="w-32 text-[1.1rem] ">{e.name}</p>
                   <p>{e.media_type}</p> 
                   </section>
                  </section>
                ); 
              } else if 
              (e.media_type === "person") {
               
                return (
                   e.known_for[0]?
                   e.known_for[0].backdrop_path !== null?
                  <section className= " flex w-screen h-32 bg-red-800 text-orange-100 tex-3xl">
                  <img onClick={()=>{ 
                    localStorage.setItem("idPerson",e.id)
                     navigate("/infoActor")
                    localStorage.setItem("movieOrTv","person")
                    activeSearch(false)
                  }}
                    className=" z-10 w-52 h-32 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100 "
                    src={`https://image.tmdb.org/t/p/w500/${e.known_for[0].backdrop_path}`}
                  />
                  <section className=" mx-5 flex flex-col">
                  <p className="w-32 text-[1.1rem]">{e.name}</p>
                  <p>{e.first_air_date}</p>
                  <p>{e.media_type}</p>
                  </section>
                  </section>
                   :null:null
                );
               
              }
            })
          : null}
      </section>
    </m.main>
  );
}
