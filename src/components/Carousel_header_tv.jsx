import React, { useEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";

export default function Carousel_tv(props) {
  const { active } = props;
  const { getIdMovieToMovieInfo } = props;
  const posterRef = useRef();
  const [resApi, setResApi] = useState();
  const [countMovie, setCountMovie] = useState(1);
  const [stateCount, setStateCount] = useState(false);
  const [respImages, setResImages] = useState();
  const [activePoster, setActiveposter] = useState(false);
  let setIn;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=55b2cf9d90cb74c55683e395bb1ad12b&include_adult=false&page=1&language=en-US&sort_by=popularity.desc`
    )
      .then((resp) => resp.json())
      .then((resp) => setResApi(resp.results));
      stateCount ?console.log(resApi):null
  }, [stateCount]);

  useEffect(() => {
    resApi
      ? fetch(
          `http://api.themoviedb.org/3/tv/${resApi[countMovie].id}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setResImages(resp))
      : null;
  }, [stateCount]);

  const count = () => {
    setStateCount(!stateCount);
    setCountMovie(countMovie + 1);
    countMovie === 19 ? setCountMovie((countMovie) => 1) : null;
    clearInterval(setIn);
    /*  respImages.backdrops ? console.log(respImages) : null; */
  };

  setIn = setInterval(count, 3000);

  const handlePoster = () => {
    active(false);
    setActiveposter(!activePoster);
  };

  const variantsPoster = {
    open: {
      width: "90vw",
      height: "480px",
      borderRadius: "50px",
      border: "3px solid wheat",
      boxShadow: "0 20px 10px rgb(0,0,0)",
      background: "linear-gradient(rgba(30 41 59 0), rgba(30 41 59 0),rgba(30 41 59 0)",
    },
    closed: {
      borderRadius: "0px",
      border: "none",
      background: "linear-gradient(rgba(30 41 59 0), rgba(30 41 59 0.1),rgb(30 41 59)",

    },
  };

  const variantsImages = {
    open: {
      borderRadius: "50px",     
      width: "90vw",
      height: "480px",
    },
    closed: {
      borderRadius: "0px",      
    },
  };

  return (
    <m.main
    className="
      flex
      justify-center      
      "
    >
      <section
        className="
        absolute
        "
      >
        {resApi ? (
          <>
            <m.img
              variants={variantsImages}
              animate={activePoster ? "open" : "closed"}
              className="
                w-screen
                h-[500px] 
                
            "
              src={`https://image.tmdb.org/t/p/w500/${resApi[countMovie].poster_path}`}
            />
          </>
        ) : null}
      </section>
        <m.section
          className="
            absolute
            w-screen
            flex
            items-end
            justify-center
            h-[500px] 
        "
          variants={variantsPoster}
          animate={activePoster ? "open" : "closed"}
          onClick={() => handlePoster()}
          id="posterHeader"
          ref={posterRef}
        >

          {activePoster ? (
             <Link to="/infoTv">
            <button
              onClick={() => {
                getIdMovieToMovieInfo(resApi[countMovie].id);
              }}
              className="
              m-5
              py-5
              text-[1.4rem]
              bg-slate-800
              rounded-xl
            "
            >
              Info
            </button>
            </Link>
          ) : null}
        </m.section>     
    </m.main>
  );
}
