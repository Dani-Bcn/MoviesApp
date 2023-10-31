import React, { useEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Search(props) {
  const { activeSearch } = props;
  const { activePageSearch } = props;
  const navigate = useNavigate();
  const inputRef = useRef();
  const [newCall, setNewCall] = useState(false);
  const [seacrhInput, setSearchInput] = useState();
  const [findMovie, setFindMovie] = useState();

  const variantsActiveSearch = {
    open: {
      x: [0, 850],
    },
    closed: {
      x:  0,
    },
  };

  useEffect(() => {
    if (inputRef.current.value.length > 2) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${seacrhInput}&api_key=55b2cf9d90cb74c55683e395bb1ad12b&`
      )
        .then((resp) => resp.json())
        .then((resp) => setFindMovie(resp.results));
    }
  }, [newCall]);

  return (
    <m.main
      className="fixed  w-screen  h-screen flex flex-col -ml-[850px]  bg-slate-800/[0.5] backdrop-blur-[20px] z-50"
      variants={variantsActiveSearch}
      animate={activePageSearch ? "open" : "closed"}
      transition={{
        duration: 0.5,
      }}
    >
      <section>
        <svg
          className="h-10 m-2 mx-5"
          onClick={() => activeSearch(false)}
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
              placeholder="Search Movies/Tv..."
              onChange={() => {
                setSearchInput(inputRef.current.value);
                setNewCall(!newCall);
              }}
            />
          </form>
        </section>
        {findMovie ? (
          findMovie.length === undefined ||
          (findMovie.length < 1 && inputRef.current.value.length > 3) ? (
            <h1 className="flex w-s items-center justify-center my-3 text-[1.3rem]">
              No results
            </h1>
          ) : null
        ) : null}
      </section>

      <section className="overflow-auto text-[1.1rem]" >
        {findMovie
          ? findMovie.map((e, i) => {
              if (e.poster_path && e.backdrop_path && !e.name && e.title) {
                return (
                  <section key={i}>
                    {e.media_type === "person" ? null : e.media_type ===
                      "movie" ? (
                      <section
                        onClick={() => {
                          navigate("/infoMovie"),
                            activeSearch(false),
                            localStorage.setItem("idMovie", e.id);
                          localStorage.setItem("movieOrTv", "movie");
                        }}
                       
                        className=" relative w-[95%] m-auto flex h-42  my-5 bg-slate-800 clip-arrow-r"
                      >
                       
                        <img
                          className="h-32 w-52"
                          src={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}
                        /> 
                        <section className=" absolute l-0 w-[56.5%] h-full bg-gradient-to-l to-slate-800/[0.01] from-slate-800 "></section>
                        <section className="w-full flex  justify-between px-5 text-slate-400">
                          {e.title.length > 20 ? (
                            <h2 className="w-28 py-2">{e.title.slice(0, 25)}...</h2>
                          ) : (
                            <h2 className="w-28 py-2">{e.title.slice(0, 25)}</h2>
                          )}
                        </section>
                       
                      </section>
                    ) : (
                      <section
                        onClick={() => {
                          activeSearch(false),
                            localStorage.setItem("idMovie", e.id);
                          localStorage.setItem("movieOrTv", "tv");
                        }}
                        key={i}
                        className="w-[95%] m-auto flex h-32 p-5 my-5 bg-red-950"
                      >
                        <img
                          className="h-full rounded-xl"
                          src={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}
                        />
                        <section className="w-full flex  justify-between px-5 text-orange-50">
                          {e.title.length > 20 ? (
                            <h2 className="w-28">{e.title.slice(0, 25)}...</h2>
                          ) : (
                            <h2 className="w-28">{e.title.slice(0, 25)}</h2>
                          )}
                        </section>
                        <section className=" absolute w-[95%] h-42 bg-red-500 z-40"></section>
                      </section>
                    )}
                  </section>
                );
              }
            })
          : null}
      </section>
    </m.main>
  );
}
