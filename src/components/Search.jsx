import React, { useEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Search(props) {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [newCall, setNewCall] = useState(false);
  const [seacrhInput, setSearchInput] = useState();
  const [findMovie, setFindMovie] = useState();
  const { activeSearch } = props;

  useEffect(() => {
    if (inputRef.current.value.length > 2) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${seacrhInput}&api_key=55b2cf9d90cb74c55683e395bb1ad12b&`
      )
        .then((resp) => resp.json())
        .then((resp) => setFindMovie(resp.results));
    }
  }, [newCall]);

  findMovie ? console.log(findMovie) : null;

  return (
    <m.main
      className="-mt-20 z-50 w-screen  bg-slate-800 rounded-r-[25px] z-100"
      whileInView={{
        opacity: [0.01, 1],
      }}
    >
      <section className=" bg-slate-800">
        <svg
          className="m-5"
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
        <section className="w-screen p-4  bg-slate-500 flex justify-around items-center">
          <svg
            className="scale-[1.3] mx-5"
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
              className=" bg-slate-500  text-slate-300"
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
            <h1 className="flex w-s items-center justify-center my-3 text-[1.3rem]  text-orange-200 rounded-[50px] ">
              No results
            </h1>
          ) : null
        ) : null}
      </section>

      <section className=" m-auto text-[0.7rem]  text-orange-200 ">
        {findMovie
          ? findMovie.map((e, i) => {
              if (e.poster_path && e.backdrop_path && !e.name && e.title) {
                return (
                  <section key={i} className="w-42 h-20 flex m-5 shadow rounded-[50px]  ">
                    
                    <img
                      className="rounded-l-lg h-20"
                      src={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}
                    />
                    <section className="flex w-96 py-5  items-start justify-between bg-slate-700 rounded-r-lg">
                      {
                        e.title.length >25 ? 
                        <h2 className="mx-5 ">{e.title.slice(0,25)}...</h2>
                        :
                        <h2 className="mx-5 ">{e.title.slice(0,25)}</h2>
                      }
                 
                      {e.media_type === "person" ? null : e.media_type ===
                        "movie" ? (
                        <button
                          className=" bg-slate-600 py-1 px-5 mx-5 rounded-[5px]"
                          onClick={() => {
                            navigate("/infoMovie"),
                              activeSearch(false),
                              localStorage.setItem("idMovie", e.id);
                            localStorage.setItem("movieOrTv", "movie");
                          }}
                        >
                          Info
                        </button>
                      ) : (
                        <a href="/infoMovie">
                          <button
                            onClick={() => {
                              activeSearch(false),
                                localStorage.setItem("idMovie", e.id);
                              localStorage.setItem("movieOrTv", "tv");
                            }}
                            className="bg-slate-600 py-1 px-5 mx-5 rounded-[5px]"
                          >
                            Info
                          </button>
                        </a>
                      )}
                    </section>
                  </section>
                );
              }
            })
          : null}
      </section>
    </m.main>
  );
}
