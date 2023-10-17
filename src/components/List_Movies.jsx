import React from 'react'
import {motion as m} from "framer-motion"


export default function List_Movies(props) {

    const {dataOverage } = props
    const {resApiGenres} =props
    const {inputMovies} = props
    const {findMovie} = props
    const {textButtonTvActor}= props
    const {activeMovies} = props
    const {resApiResults}=props
    const {setActiveMovies}=props
    const {setTextNoResults} = props
    const {activeGenres}=props
    const {setSeachMovie}=props
    const {setNewCall}=props
    const {newCall}=props
    const {setTextButtonTvActor}=props
    const {selectTvOrActor}=props
    const {setSelectTvOrActor}=props
    const {setposterOrProfile}=props
    const {posterOrProfile}=props
    const {setPageList} = props
    const {setselectMovieOrTv}=props
    const {setSelectGenres}=props
    const {setActiveGenres}=props
    const {setPopularity}=props

  return (
    <main
    onClick={() =>
      /* esconde la card géneros  */
      activeGenres ? setActiveGenres(!activeGenres) : null
    }
    className="
      w-screen   
      z-10
      flex
      flex-col
      items-center
    "
  >
    <section
    className='
    md:w-[60%]
    w-full    
    flex
    flex-col
    items-center
    '
    >
      <section
        className="
            flex
            w-[90%]
            md:w-full
            items-center
            justify-between    
            md:justify-around      
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
        <m.article
          id="card-genres"
          className="
        fixed
        lg:p-2
        mt-[400px]
        md:-mt-16
        lg:mt-24
        ml-[800px]
        lg:ml-[2700px]
        lg:rounded-[20px]
        rounded-l-[50px]       
        p-5
        w-screen
        bg-indigo-900/[0.9]        
        z-50
      "     
        >
          {resApiGenres
            ? resApiGenres.map((e, i) => {
                return (
                  <p
                    className="                  
                    my-3 
                   md:my-0.5
                    lg:my-2  
                    mx-5   
                    text-[1.2rem]
                    md:text-[0.7rem]
                    lg:text-[0.9rem]
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
      </section>
      <section
        className="  
      flex
      flex-col
      justify-center
      items-center    
      m-10              
    "
      >
        <input
          ref={inputMovies}
          onClick={() => {
            setActiveMovies(false), setTextNoResults("");
          }}
          className="  
    w-40   
    m-2
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
        {!findMovie ? null : findMovie.length === 0 &&
          inputMovies.current.value.length > 1 ? (
          <h2
            className="
            text-red-300
           "
          >
            No results
          </h2>
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
            return e.profile_path /* si hay imagen del actor */ ? (
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
                  <>                  
                  <m.img
                    src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                    whileInView={{
                      opacity: [0, 1],
                    }}
                  />
                  </>
                }
              </section>
            ) : e.poster_path /* si hay imagen de la película o serie */ ? (
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
                <h2 
                className="
                absolute
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
    ) : null}
  </main>
  )
}
