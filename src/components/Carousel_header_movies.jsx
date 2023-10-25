import React, { useEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";
import { Link,useNavigate } from "react-router-dom";

export default function Carousel_movies(props) {
  const { active } = props;
  const idMovie = localStorage.getItem("idMovie")
  const movieOrTv = localStorage.getItem("movieOrTv")
  const navigate = useNavigate()
  const { getIdMovieToMovieInfo } = props;
  const [resApi, setResApi] = useState();
  const [countMovie, setCountMovie] = useState(1);
  const [stateCount, setStateCount] = useState(false);
  const [respImages, setResImages] = useState();
  const [activePoster, setActiveposter] = useState(false);
  let setIn;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/${movieOrTv}?api_key=55b2cf9d90cb74c55683e395bb1ad12b&include_video=fals`
    )
      .then((resp) => resp.json())
      .then((resp) => setResApi(resp.results));
      movieOrTv === "movie" ? setActiveposter(false):setActiveposter(true)
  }, [movieOrTv]);





  useEffect(() => {
    // obtener todas las imágenes 
    resApi
      ? fetch(
          `http://api.themoviedb.org/3/${movieOrTv}/${resApi[countMovie].id}/images?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setResImages(resp))
      : null;
  }, []);

  /*  resApi? console.log(resApi):null  */

  const count = () => {
    setStateCount(!stateCount);
    setCountMovie(countMovie + 1);
    countMovie === 19? setCountMovie(countMovie => 1) : null;
    clearInterval(setIn);
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
      border: "2px solid wheat",
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
      opacity:[0,1],
    },
    closed: {
      opacity:[0,1]      
    },
  };

  return (
    <m.main className="flex justify-center"
    variants={variantsImages}
      animate={
        activePoster? "open":"closed"
      }
    >
      <section className="absolute">
        {resApi ? (
          <m.section
            animate={{
              opacity:[0,1]
            }}
            exit={{
              opacity:[0,1]
            }}
          >
            <m.img className="w-screen h-[500px]"
             onClick={() => {
              navigate("/infoMovie")
              getIdMovieToMovieInfo(resApi[countMovie].id,
               
                );
            }}
              variants={variantsImages}
              animate={activePoster ? "open" : "closed"}
              
              src={`https://image.tmdb.org/t/p/w500/${resApi[countMovie].poster_path}`}
            />
          </m.section>
        ) : null}
      </section>    
    </m.main>
  );
}
