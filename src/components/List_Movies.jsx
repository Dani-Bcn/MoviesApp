import React ,{useEffect}from "react";
import { motion as m } from "framer-motion";
import Carousel_movies from "./Carousel_movies";



export default function List_Movies(props) {
  const { dataOverage } = props;
  const { resApiGenres } = props;
  const { inputMovies } = props;
  const { findMovie } = props;
  const { textButtonTvActor } = props;
  const { activeMovies } = props;
  const { resApiResults } = props;
  const { setActiveMovies } = props;
  const { setTextNoResults } = props;
  const { activeGenres } = props;
  const { setSeachMovie } = props;
  const { setNewCall } = props;
  const { newCall } = props;
  const { setTextButtonTvActor } = props;
  const { selectTvOrActor } = props;
  const { setSelectTvOrActor } = props;
  const { setposterOrProfile } = props;
  const { posterOrProfile } = props;
  const { setPageList } = props;
  const { setselectMovieOrTv } = props;
  const { setSelectGenres } = props;
  const { setActiveGenres } = props;
  const { setPopularity } = props;
  const { pageList } = props;

  return (
    <m.main
      className="
      w-screen
      bg-slate-800
    "
      onClick={() =>
        /* esconde la card géneros  */
        activeGenres ? setActiveGenres(!activeGenres) : null
      }
    >
      <header
        className="
      w-full     
    "
      >
        <section
          className="
          h-10   
          flex     
          items-center
          justify-center
          bg-indigo-900
        "
        ></section>
        <section
          className="
          h-10   
          flex     
          items-center
          justify-center
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
          <button
            onClick={() => {
              setActiveMovies(true); /* desactiva la llamada por popularidad */
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
              setActiveMovies(true);
              setActiveGenres(!activeGenres);
            }}
          >
            Genres
          </button>
          {/* card categorias */}
          {/*  <m.article
          id="card-genres">
          {resApiGenres
            ? resApiGenres.map((e, i) => {
                return (
                  <p
                    
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
        </m.article> */}
        </section>
        <section
          className="
          h-20
          flex
          flex-col
          items-center
          justify-center
        "
        >
          <input
            className="
          my-2
        "
            ref={inputMovies}
            onClick={() => {
              setActiveMovies(false), setTextNoResults("");
            }}
            type="text"
            placeholder="Search name"
            onChange={(e) => {
              setSeachMovie(e.target.value);
              setNewCall(!newCall);
            }}
          />
          {/* lógica para cuando no hayan resultados en la búsqueda*/}
          {!findMovie ? null : findMovie.length === 0 &&
            inputMovies.current.value.length > 1 ? (
            <h2>No results</h2>
          ) : null}

          <button
            className="
              w-32
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
                setTextButtonTvActor("Search Person");
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
      </header>       

     
      {/*  
      <section
        className="      
         
            flex
        "
      >
        {(resApiResults.results && findMovie.length < 1) ||
        (resApiResults.results && activeMovies)
          ? resApiResults.results.map((e, i) => {
              return (
                <section 
                  className="
                  fixed
                    w-52 
                  "
                key={i}>
                  <h2>{e.vote_average}</h2>
                  {dataOverage(e.vote_average)}
                  <m.img
                     className="
                     fixed
                      w-52
                     " 

                    src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                    whileInView={{
                      opacity: [0, 1],
                      scale: [2, 1],
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  />
                  <div></div>
                </section>
              );
            })
          : null}
      </section>
     
    <section>
      {!activeMovies
        ? findMovie.map((e, i) => {
            return e.profile_path // si hay imagen del actor // ? (
              <m.section>
             
                {
                  <>                  
                  <m.img
                    src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                    whileInView={{
                      opacity: [0, 1],
                    }}
                  />
                  </>
                }
              </m.section>
            ) : e.poster_path // si hay imagen de la película o serie // ? (
              <m.section
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
              </m.section>
            ) : null;
          })
        : null}
        </section>
   
      {(resApiResults.results && findMovie.length < 1) ||
      (resApiResults.results && activeMovies)
        ? resApiResults.results.map((e, i) => {
            return (             
              <section>
                <h2 
                className="
                fixed
                text-2xl
                text-orange-300
                mt-[170px]
                ml-[100px]
                z-20
                "
                >
                  {e.vote_average}
                </h2>
                  {dataOverage(e.vote_average)}
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
    ) : null} */}
    </m.main>
  );
}
