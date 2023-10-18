import React from "react";
import { animate, motion as m } from "framer-motion";
export default function Search(props) {

    const {dataOverage } = props
    const {activeMovies} = props
    const {inputMovies} = props
    const {resApiResults}=props
    const {findMovie} = props
    const {textButtonTvActor}= props
    const {setTextButtonTvActor}=props
    const {selectTvOrActor}=props
    const {setSelectTvOrActor}=props
    const {setposterOrProfile}=props
    const {posterOrProfile}=props
    const {setSeachMovie}=props
    const {setTextNoResults} = props
    const {setActiveMovies}=props
    console.log(findMovie)

  return (
    <main>
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
        {
           findMovie.map((e, i) => {
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
       }
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
    </main>
  );
}
