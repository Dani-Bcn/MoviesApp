import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cast from "./Cast";
import { motion as m } from "framer-motion";

const PageInfoMovie = () => {
  const [localeValue, setLocaleValue] = useState(false);
  const [valuesMovieOrTv, setValuesMovieOrTv] = useState(false);
  const [valueTitleOrname, setTitleOrName] = useState();
  const [valueId, setValueId] = useState(false);
  const [count, setCount] = useState(false);
  const [infoMovie, setInfoMovie] = useState();
  const [namesfromCast, setNamesFromCast] = useState();

  const navigate = useNavigate();
  setTimeout(() => {
    setCount(true);
  }, 2);

  useEffect(() => {
    setLocaleValue(localStorage.getItem("value"));
  });

  useEffect(() => {
    setValuesMovieOrTv(valueTitleOrname);
    if (localeValue) {
      if (localeValue[0] === "m") {
        infoMovie ? setTitleOrName(infoMovie.title) : null;
        setValuesMovieOrTv(localeValue.split("").splice(0, 5).join(""));
        setValueId(localeValue.split("").splice(5).join(""));
      } else {
        infoMovie ? setTitleOrName(infoMovie.name) : null;
        setValuesMovieOrTv(localeValue.split("").splice(0, 2).join(""));
        setValueId(localeValue.split("").splice(2).join(""));
      }
    }
  });

  const funcCast = (infoCast) => {
    setNamesFromCast(infoCast);
  };

  useEffect(() => {
    if (count && valueId && valuesMovieOrTv) {
      fetch(
        `https://api.themoviedb.org/3/${valuesMovieOrTv}/${valueId}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
      )
        .then((resp) => resp.json())
        .then((resp) => setInfoMovie(resp));
    }
  }, [count]);

  return (
    <main
      className={`           
            my-20
            bg-slate-900
            text-indigo-200
            text-1xl            
        `}
    >
      <div>
        {infoMovie && (
          <section
            className="
                flex
                md:flex-row
                flex-col
            "
          >
            <m.img
              className="
                    md:mx-10
                    mb-10
                    mx-10
                    md:w-64
                    lg:w-96
                    cursor-auto                    
                "
              src={`https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}`}
            ></m.img>
            <article
              className="
                    md:w-screen
                    md:m-0
                    w-80
                    m-auto                
                "
            >
              <div
                className="
                    h-96
                    lg:-mt-5
                    md:h-screen
                    flex
                    flex-col
                    justify-around
                "
              >
                {infoMovie && (
                  <h1
                    className="
                        text-4xl
                        md:text-5xl
                        font-semibold
                        mb-5
                    "
                  >{`${valueTitleOrname}`}</h1>
                )}
                {infoMovie.release_date && (
                  <h3>
                    Release date &nbsp; &nbsp;
                    <span>{infoMovie.release_date}</span>
                  </h3>
                )}
                <h3>
                  Cast &nbsp; &nbsp;
                  {namesfromCast &&
                    namesfromCast.cast.map((e, i) =>
                      i < 4 ? <span key={e.id}> {e.name} | </span> : null
                    )}
                </h3>
                <h3>
                  Language &nbsp; &nbsp;
                  <span> {infoMovie.original_language}</span>
                </h3>
                {infoMovie.homepage && (
                  <h3>
                    Home page &nbsp; &nbsp;{" "}
                    <span>
                      <a
                        style={{
                          fontSize: "1rem",
                        }}
                        href={infoMovie.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {infoMovie.homepage}
                      </a>
                    </span>
                  </h3>
                )}
                {infoMovie.runtime && (
                  <h3>
                    Run time &nbsp; &nbsp; <span> {infoMovie.runtime}'</span>
                  </h3>
                )}
                {infoMovie.production_companies[0] && (
                  <h3>
                    Productor company &nbsp; &nbsp;
                    <span>{infoMovie.production_companies[0].name}</span>
                  </h3>
                )}
                {infoMovie.runtime && (
                  <h3>
                    Vote average &nbsp; &nbsp;
                    <span>{infoMovie.vote_average}</span>
                  </h3>
                )}
                {infoMovie && (
                  <h3>
                    Genres
                    {infoMovie.genres.map((element, index) => {
                      return <span key={index}> &nbsp; {element.name} | </span>;
                    })}
                  </h3>
                )}
              </div>
            </article>
          </section>
        )}
        <article
          className="
            md:w-[95%]
            w-80
            m-auto                
        "
        >
          {infoMovie && (
            <article>
              <h3
                className="
                text-orange-200
                    text-2xl
                    my-5
                    md:mx-5
                    lg:mx-2
                "
              >
                Overview
              </h3>
              <p
                className="
                    text-1xl
                    w-full
                    md:w-[96%]
                    lg:w-[99%]
                    m-auto
                "
              >
                {infoMovie.overview}
              </p>
            </article>
          )}
        </article>
        <>
          <Cast valuesCast={infoMovie} funcCast={funcCast}></Cast>
        </>
      </div>
      <footer
        className="
        w-screen
        flex
        justify-center
        "
      >
        <button
          className="
                  
                    text-2xl
                    text-orange-200
                  "
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </footer>
    </main>
  );
};

export default PageInfoMovie;
