import React, { useEffect, useState, useRef } from "react";
import { animate, motion as m } from "framer-motion";
import gsap from "gsap";

export default function Calls_Api() {
  const [selectMovieOrTv, setselectMovieOrTv] = useState("movie");
  const [pageList, setPageList] = useState(1);
  const [selectGenres, setSelectGenres] = useState(28);
  const [popularity, setPopularity] = useState("");
  const [resApiResults, setResApiResults] = useState({});
  const [newCall, setNewCall] = useState(false);
  const [resApiGenres, setResApiGenres] = useState();
  const [activeGenres, setActiveGenres] = useState(false);
  const [searchMovie, setSeachMovie] = useState([]);
  const [findMovie, setFindMovie] = useState();
  const [activeMovies, setActiveMovies] = useState(true);

  const inputMovies = useRef();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&api_key=55b2cf9d90cb74c55683e395bb1ad12b&sort_by=vote_count.desc`
    )
      .then((resp) => resp.json())
      .then((resp) => setFindMovie(resp.results));
  }, [newCall]);

  //obtener lista de géneros
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/${selectMovieOrTv}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b&language=en-U`
    )
      .then((resp) => resp.json())
      .then((resp) => setResApiGenres(resp.genres));
  }, [newCall]);
  //obtener lista películas
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/${selectMovieOrTv}?api_key=55b2cf9d90cb74c55683e395bb1ad12b${popularity}&page=${pageList}&with_genres=${selectGenres}`
    )
      .then((resp) => resp.json())
      .then((resp) => setResApiResults(resp));
    activeMovies ? (inputMovies.current.value = "") : null;
  }, [selectGenres, newCall]);

  //pasamos la info a Home
  /*  resApiResults.results ? infoApi(resApiResults) : null;
  resApiGenres ? infoGenres(resApiGenres) : null; */

activeGenres ?

  gsap.to("#card-genres",{
    x:-400,
    ease: "expo.out",
  }):
  gsap.to("#card-genres",{
    x:600,
    ease: "expo.in",
  })
  return (
    <main
      className="
      w-screen
        z-10
      "
    >
      <section
        className="
          w-[96%]
          my-16
          mx-auto
          flex
          flex-wrap
          justify-center
          items-center       
        "
      >
        <button
          onClick={() => {
            setPageList(1);
            setActiveMovies(true);
            setselectMovieOrTv("movie"),
              setSelectGenres(28),
              setNewCall(!newCall);
          }}
        >
          Movies
        </button>
        <button
          onClick={() => {
            setPageList(1);
            setActiveMovies(true);
            setselectMovieOrTv("tv"),
              setSelectGenres(10759),
              setNewCall(!newCall);
          }}
        >
          TV
        </button>
        <button
          onClick={() => {
            setActiveMovies(true);
            setPopularity(""), setNewCall(!newCall);
          }}
        >
          Current
        </button>
        <button
          onClick={() => {
            setActiveMovies(true);
            setPopularity("&sort_by=vote_count.desc"), setNewCall(!newCall);
          }}
        >
          Popularity
        </button>

        <button
          disabled={!activeMovies}
          onClick={() => {
            setPageList(pageList - 1), setNewCall(!newCall);
            pageList < 2 ? setPageList(1) : null;
          }}
        >
          Back
        </button>
        <button
          disabled={!activeMovies}
          onClick={() => {
            setPageList(1), setNewCall(!newCall);
          }}
        >
          Start
        </button>
        <button
          disabled={!activeMovies}
          onClick={() => {
            setActiveMovies(true);
            setPageList(pageList + 1), setNewCall(!newCall);
          }}
        >
          Next
        </button>
        <button
          onClick={() => {
            setActiveMovies(true);
            setActiveGenres(!activeGenres);
          }}
        >
          Genres
        </button>
        <m.article
        id="card-genres"
          className="
          fixed
          ml-[800px]
          rounded-l-[50px]
          mt-[225px]
          p-5
          w-screen
          bg-indigo-900/[0.9]
          z-20
        "      
        >
          {resApiGenres 
            ? resApiGenres.map((e, i) => {
                return (
                  <p
                    className="
                  
                    my-2
                    mx-5
                    text-2xl
                      cursor-pointer
                      text-orange-300
                      hover:text-orange-50
                      hover:bg-indigo-900
                     
                      transition duration-[0.5s]
                    "
                    id={e.id}
                    key={i}
                    onClick={(e) => {
                      setSelectGenres(e.target.id),
                        setActiveGenres(!activeGenres);
                    }}
                  >
                    {e.name}
                  </p>
                );
              })
            : null}
        </m.article>

        <input
          ref={inputMovies}
          className="
            m-5
            p-2
            bg-slate-200
            rounded-[10px]
            border-2
            border-indigo-400
          "
          type="text"
          placeholder="Search Title"
          onChange={(e) => {
            setSeachMovie(e.target.value);
            setNewCall(!newCall);
            setActiveMovies(false);
          }}
        />
        {findMovie && searchMovie.length !== 0 ? (
          findMovie.length === 0 ? (
            <h2
              className="
                text-2xl
                  text-orange-200
              "
            >
              No results
            </h2>
          ) : null
        ) : null}
      </section>

      <section
        className="
          w-10/11
          bg-slate-800
          flex
          flex-wrap
          justify-center
        "
      >
        {!activeMovies
          ? findMovie.map((e, i) => {
              return (
                <section
                  key={i}
                  className="
                flex
                items-center
                justify-center
                w-[150px]
                m-[10px]
                bg-indigo-400
                overflow-hidden
                "
                >
                  {e.poster_path === null ? (
                    <>
                      <p>{e.title}</p>
                    </>
                  ) : (
                    <m.img
                      src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                      whileInView={{
                        opacity: [0, 1],
                      }}
                    />
                  )}
                </section>
              );
            })
          : null}
        {/* get searchMovie  */}
        {(resApiResults.results && findMovie.length < 1) ||
        (resApiResults.results && activeMovies)
          ? resApiResults.results.map((e, i) => {
              return (
                <section
                  key={i}
                  className="
                  flex
                  items-center
                  justify-center
                  w-[150px]
                  m-[10px]
                  bg-indigo-100
                  overflow-hidden
                  "
                >
                  <m.img
                    src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                    whileInView={{
                      opacity: [0, 1],
                      scale: [2, 1],
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  />
                </section>
              );
            })
          : null}
      </section>
      <footer
        className="
        my-5
        w-screen
        flex
        justify-center
        "
      >
        <button
          disabled={!activeMovies}
          onClick={() => {
            setPageList(pageList - 1), setNewCall(!newCall);
            pageList < 2 ? setPageList(1) : null;
          }}
        >
          Back
        </button>
        <button
          disabled={!activeMovies}
          onClick={() => {
            setPageList(1), setNewCall(!newCall);
          }}
        >
          Start
        </button>
        <button
          disabled={!activeMovies}
          onClick={() => {
            setActiveMovies(true);
            setPageList(pageList + 1), setNewCall(!newCall);
          }}
        >
          Next
        </button>
      </footer>
    </main>
  );
}
