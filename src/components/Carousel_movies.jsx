import React, { useEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";

export default function Carousel_movies() {
  const posterRef = useRef();
  const [resApi, setResApi] = useState();
  const [countMovie, setCountMovie] = useState(0);
  const [stateCount, setStateCount] = useState(false);
  const [respImages, setResImages] = useState();
  const [activePoster, setActiveposter] = useState(false);
  const [stopCounter, setStopCounter] = useState(5000)
  let setIn;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=55b2cf9d90cb74c55683e395bb1ad12b&include_video=fals`
    )
      .then((resp) => resp.json())
      .then((resp) => setResApi(resp.results));
  }, []);

  useEffect(() => {
    resApi
      ? fetch(
          `http://api.themoviedb.org/3/movie/${resApi[countMovie].id}/images?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setResImages(resp))
      : null;
  }, [stateCount]);

  const count = () => {
    setStateCount(!stateCount);
    setCountMovie(countMovie + 1);
    countMovie === 19 ? setCountMovie((countMovie) => 0) : null;
    clearInterval(setIn);
    respImages.backdrops ? console.log(respImages) : null;
  };

  useEffect(() => {
    setIn = setInterval(count,stopCounter);
  }, [count]);

  const handlePoster = () => {
    setActiveposter(!activePoster)
    activePoster? setStopCounter(5000):setStopCounter(50000)
    console.log(stopCounter)
  
  };

  const variantsPoster = {
    open: {
        width:"90vw",
        height:"475px",
        borderRadius:"50px",
        border:"2px solid blue",
        backgroundImage: "linear-gradient(to bottom,  rgba(30, 41, 59, 0),  rgba(30 41 59 0))",
        boxShadow:"0 20px 10px rgb(0,0,0)"    
    },
    closed: {  
        borderRadius:"0px",
        border:"0px solid blue",
        backgroundImage: "linear-gradient(to bottom,  rgba(30, 41, 59, 0),  rgba(30 41 59))"
     },   
  };

  const variantsImages = {
    open: {        
        borderRadius:"50px",
        backgroundImage: "linear-gradient(to bottom,  rgba(30, 41, 59, 0),  rgba(30 41 59 0))",
        width:"90vw",
        height:"475px",    
    },
    closed: {        
        borderRadius:"0px",
        backgroundImage: "linear-gradient(to bottom,  rgba(30, 41, 59, 0),  rgba(30 41 59))"
     },   
  };

  return (
    <main
      className="   
        w-screen
        h-screen
        flex
        flex-col
        items-center
        z-10
      "
    >
      <section>
        {resApi ? (
          <m.img
          variants={variantsImages}

          animate={
            activePoster? "open":"closed"
          }
            className="
                w-screen
                h-[500px] 
            "
            src={`https://image.tmdb.org/t/p/w500/${resApi[countMovie].poster_path}`}
          />
        ) : null}
      </section>
      <m.section 
       className="
       absolute
       w-screen
       h-[500px] 
       "
      variants={variantsPoster}
      animate={
            activePoster? "open":"closed"
      }
      onClick={() => handlePoster()} id="posterHeader" ref={posterRef}>
    
      </m.section>

      {/*  <section>
        {respImages
          ? respImages.posters.map((e, i) => {
              return (
                <m.img
                  key={i}
                  className="
         
            w-full 
            h-[200px] 
        "
                  src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}
                />
              );
            })
          : null}
      </section>  */}
    </main>
  );
}
