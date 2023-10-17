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
  const [textButtonTvActor, setTextButtonTvActor] = useState("Search Actor");
  const [selectTvOrActor, setSelectTvOrActor] = useState("person");
  const [posterOrProfile, setposterOrProfile] = useState(false);

  const inputMovies = useRef();

  /* Busqueda por título de series y películas */
  useEffect(() => {
    fetch(
      /* multi, para buscar tanto pelis como series */
      /* person, buscar personas */
      `https://api.themoviedb.org/3/search/${selectTvOrActor}?query=${searchMovie}&api_key=55b2cf9d90cb74c55683e395bb1ad12b&`
    )
      .then((resp) => resp.json())
      .then((resp) => setFindMovie(resp.results));
  }, [newCall]);

  /* Obtención de los todos los géneros segun película o serie*/
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/${selectMovieOrTv}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b&language=en-U`
    )
      .then((resp) => resp.json())
      .then((resp) => setResApiGenres(resp.genres));
  }, [newCall]);

  /*Obtención  de películas o series segun  pelídula o serie : "selectMovieOrTv" */
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/${selectMovieOrTv}?api_key=55b2cf9d90cb74c55683e395bb1ad12b${popularity}&page=${pageList}&with_genres=${selectGenres}`
    )
      .then((resp) => resp.json())
      .then((resp) => setResApiResults(resp));
    activeMovies ? (inputMovies.current.value = "") : null;
  }, [selectGenres, newCall]);

  activeGenres
    ? gsap.to("#card-genres", {
        x: -250,
        ease: "expo.out",
      })
    : gsap.to("#card-genres", {
        x: 600,
        ease: "expo.in",
      });
  let mm = gsap.matchMedia();

  // gsap responsive lg
  mm.add("(min-width: 400px)", () => {
    activeGenres
      ? gsap.to("#card-genres", {
          x: 350,
          ease: "expo.out",
        })
      : gsap.to("#card-genres", {
          x: 800,
          ease: "expo.in",
        });
  });

  return (
    <main
      onClick={() => /* esconde la card géneros  */
        activeGenres ? setActiveGenres(!activeGenres) : null
      }
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
            setPageList(1); /* volver a la primera página */
            setActiveMovies(true);
            setselectMovieOrTv("movie") /* búsqueda por péliculas */,
              setSelectGenres(
                28
              ) /* selecciona el primer género  de películas*/,
              setNewCall(!newCall); /* hace una lllmada */
          }}
        >
          Movies
        </button>
        <button
          onClick={() => {
            setPageList(1); /* volver a la primera página */
            setActiveMovies(true);
            setselectMovieOrTv("tv") /* búsqueda  por series*/,
              setSelectGenres(
                10759
              ) /* selecciona el primer género  de series*/,
              setNewCall(!newCall); /* hace una llamada */
          }}
        >
          TV
        </button>
        {activeMovies ? (
          <section
            className="
              flex
              flex-wrap
              items-center
              justify-center
            "
          >
            <button
              onClick={() => {
                setActiveMovies(
                  true
                ); /* desactiva la llamada por popularidad */
                setPopularity(""), setNewCall(!newCall);
              }}
            >
              Current
            </button>
            <button
              onClick={() => {
                setActiveMovies(true);
                setPopularity(
                  "&sort_by=vote_count.desc"
                ) /* activa la llamada por popularidad */,
                  setNewCall(!newCall);
              }}
            >
              Popularity
            </button>
            <button
             
              onClick={() => {
                setPageList(pageList - 1); /* página siguiente */
                setNewCall(!newCall);
                pageList < 2 ? setPageList(1) : null;
              }}
            >
              Back
            </button>
            <button
           
              onClick={() => {
                setPageList(1);
                setNewCall(!newCall);
              }}
            >
              Start
            </button>
            <button
            
              onClick={() => {
                setActiveMovies(true);
                setPageList(pageList + 1);
                setNewCall(!newCall);
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
          </section>
        ) : null}

        <m.article
          id="card-genres"
          className="
          fixed
          lg:p-2
          lg:ml-[1600px]
          ml-[800px]
          lg:rounded-[20px]
          rounded-l-[50px]
          mt-[225px]
          p-5
          w-screen
          bg-indigo-900/[0.9]
          lg:mt-24
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
                      lg:text-[0.9rem]
                      text-[1.2rem]
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
        <section
          className="
          w-screen
              flex
              flex-col
              justify-center
              items-center
              m-5
          "
        >
          <input
            ref={inputMovies}
            onClick={()=>setActiveMovies(false)}
            className="
          
            m-5
            p-2
            bg-slate-200
            rounded-[10px]
            border-2
            border-indigo-400
          "
            type="text"
            placeholder="Search name"
            onChange={(e) => {
              setSeachMovie(e.target.value);
              setNewCall(!newCall);
            }}
          />
          {/* lógica para cuando no hayan resultados en la búsqueda*/}
          {findMovie && searchMovie.length !== 0 ? (
            findMovie.length !== 0 || activeMovies ? null : (
              <h2
                className="
                text-2xl
                  text-orange-200
              "
              >
                No results
              </h2>
            )
          ) : null}  
           <button
          className="
            w-44
        "
          /* Selección de películas y series o de actores */
          onClick={() => {
            setActiveMovies(false);
            inputMovies.current.value = "";
            /* Cambiamos el texto del boton y el placeholder del input */
            if (textButtonTvActor !== "Search Movie/Tv") {
              setTextButtonTvActor("Search Movie/Tv");
              inputMovies.current.placeholder = "Search title";
            } else {
              setTextButtonTvActor("Search Actor");
              inputMovies.current.placeholder = "Search name";
            }
            selectTvOrActor !== "multi"
              ? setSelectTvOrActor("multi")
              : setSelectTvOrActor("person");
            setposterOrProfile(!posterOrProfile);
          }}
        >
          {textButtonTvActor}
        </button>
        </section>
     
      </section>
      <section
        className="
          w-[90%]
          bg-slate-800
          flex
          m-auto
          flex-wrap
          items-center
          justify-center
        "
      >
        {/* mostrar por búsqueda  */}
        {!activeMovies
          ? findMovie.map((e, i) => {
              return e.profile_path ? (/* si hay imagen del actor */ 
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
                  {
                    <m.img
                      src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                      whileInView={{
                        opacity: [0, 1],
                      }}
                    />
                  }
                </section>
              ) : e.poster_path? ( /* si hay imagen de la película o serie */ 
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
                  <m.img
                    src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                    whileInView={{
                      opacity: [0, 1],
                    }}
                  />
                </section>
              ) : null;
            })
          : null}
        {/* mostrar películas y series */}
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

      {activeMovies ? (
        <footer
          className="
          my-5
          w-screen
          flex
          justify-center
       "
        >
          <button
         
            onClick={() => {
              setPageList(pageList - 1), setNewCall(!newCall);
              pageList < 2 ? setPageList(1) : null;
            }}
          >
            Back
          </button>
          <button
          
            onClick={() => {
              setPageList(1);
              setNewCall(!newCall);
            }}
          >
            Start
          </button>
          <button
            onClick={() => {
              setActiveMovies(true);
              setPageList(pageList + 1);
              setNewCall(!newCall);
            }}
          >
            Next
          </button>
        </footer>
      ) : null}
    </main>
  );
}
