import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Movie_info(props) {
  const { getIdPerson } = props;
  let idMovie = localStorage.getItem("idMovie");
  const [movieOrTv, setMovieOrTv] = useState(localStorage.getItem("movieOrTv"));
  const [infoMovie, setInfoMovie] = useState();
  const [infoCast, setInfoCast] = useState();
  const [dataVideos, setDataVideos] = useState();
  const navigate = useNavigate();
  console.log(idMovie);
  useEffect(() => {
    idMovie !== undefined
      ? fetch(
          `https://api.themoviedb.org/3/movie/${idMovie}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfoMovie(resp))
      : null;
  }, [idMovie]);

  useEffect(() => {
    idMovie !== undefined
      ? fetch(
          `https://api.themoviedb.org/3/movie/${idMovie}/credits?api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1&page=1`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfoCast(resp))
      : null;
  }, [idMovie]);

  infoCast ? console.log(infoCast) : null;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/videos?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataVideos(resp.results));
  }, [setDataVideos]);

  dataVideos ? console.log(dataVideos) : null;

  return (
    <m.main
      className="
        absolute
        w-screen      
        text-slate-200
        bg-slate-800
        z-20
    "
      animate={{
        transition: {
          duration: 0.5,
        },
      }}
      exit={{
        x: 200,
      }}
    >
      <header
        className="
          w-screen
          flex
          items-center
          justify-around
          
        "
      >
        <button onClick={() => navigate("/trailers")}>Trailer</button>
        <button onClick={() => navigate("/backImages")}>
          Background images
        </button>
        <button onClick={() => navigate("/logos")}>Logo</button>
        <button>Posters</button>
      </header>
      {infoMovie ? (
        <section>
          <m.img
            className="
                m-auto
                w-screen
                h-[500px]                 
            "
            src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`}
          />
          <section
            className="
                w-screen
                flex
                flex-col 
                items-center
                justify-center            
                gap-5
                p-10
                "
          >
            <h2
              className="
                text-2xl
                "
            >
              {infoMovie.title}
            </h2>
            <p>{infoMovie.overview}</p>
            <section
              className="
                w-screen
                flex
                flex-col
                items-start
                px-10
                gap-5
                "
            >
              <section
                className="
                    flex
                    w-full
                    gap-5
                "
              >
                <p>{infoMovie.release_date.slice(0, 4)}</p>
                <p>{infoMovie.runtime}"</p>
                <p>{infoMovie.original_language}</p>
                {infoMovie.production_companies.length !== 0 ? (
                  <p>{infoMovie.production_companies[0].origin_country}</p>
                ) : (
                  <p>{infoMovie.production_countries[0].iso_3166_1}</p>
                )}
              </section>
              <section
                className="
                    flex
                    w-full
                    flex-wrap
                    gap-5
                "
              >
                {infoMovie.genres.map((e, i) => {
                  return <p key={i}> {e.name}</p>;
                })}
              </section>
              <a href={infoMovie.homepage}>Home page</a>
              <p>Cast</p>
              {infoCast !== undefined ? (
                <section
                  className="
                  overflow-y-hidden
                    flex
                    w-full
                  "
                >
                  {infoCast.cast.map((e, i) => {
                    return (
                      <section key={i}>
                        {e.profile_path !== null ? (
                          <section
                            onClick={() => {
                              navigate("/infoActor"), getIdPerson(e.id);
                            }}
                            className="
                             w-40
                              p-1
                           
                            "
                          >
                            <m.img
                              className="
                            rounded-[10px]
                          shadow-xl
                            shadow-slate-950/100

                            "
                              src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                              whileInView={{
                                opacity: [0, 1],
                                transition: {
                                  duration: 0.5,
                                },
                              }}
                            />
                            <section
                              className="
                                flex
                                flex-col
                                items-center
                                justify-between                                
                            "
                            >
                              <h3>{e.name}</h3>
                            </section>
                          </section>
                        ) : null}
                      </section>
                    );
                  })}
                </section>
              ) : null}
            </section>
            <section
              className="
              overflow-y-hidden
              w-screen
                flex
                w-full
              "
            >
              {dataVideos
                ? dataVideos.map((e, i) => (
                    <section>
                       <a href={`https://www.youtube.com/watch?v=UqcGdmJJVTY`}>
                      <iframe
                        className="
                          w-screen
                          h-56
                          my-10
                          sm:my-0
                          sm:h-[350px]
                        "
                        src={`//www.youtube.com/embed/${e.key}/?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
                      ></iframe>
                      </a>
                    </section>
                  ))
                : null}
            </section>
          </section>
        </section>
      ) : null}
    </m.main>
  );
}
