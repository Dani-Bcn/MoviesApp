import React, { useEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

export default function Carousel_movies() {
  const movieOrTv = localStorage.getItem("movieOrTv");
  const [idMovie, setIdMovie] = useState(localStorage.getItem("idMovie"));
  const [dataMovies, setDataMovies] = useState();
  const [dataImages, setDataImages] = useState();
  const [count, setCount] = useState(0);
  const [activeEffect,setActiveEffect] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/${movieOrTv}?api_key=55b2cf9d90cb74c55683e395bb1ad12b&sort_by=popularity.desc`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataMovies(resp.results));

    dataMovies ? console.log(dataMovies) : null;
  }, [movieOrTv]);

  dataImages ? console.log(dataImages.backdrops) : null;

  const countImages =(()=>{
    setActiveEffect(!activeEffect)
    setCount(count+1)
    count === 19?setCount(0):null
  clearInterval(interval)
}) 

const interval = setInterval(() => {
   countImages()
  }, 5000);
  const variantsEffect ={
    open:{
      x:[-50,0],
      opacity:[0.1,0.1,1],
      transition:{
        duration:0.5
      }
    },
    closed:{
      x:[-50,0],
      opacity:[0.1,0.1,1],
      transition:{
        duration:0.5
      }
    }
  } 

  return (
    <m.main className="absolute z-1 text-orange-200 w-screen h-screen bg-slate-800"
      whileInView={{
        opacity:[0,1]
      }}    
    >

      {dataMovies ? (
        <m.section
          onClick={()=>{navigate("/infoMovie"),localStorage.setItem("idMovie",dataMovies[count].id)}
        }
        >
          <m.img
            variants={variantsEffect}
            animate={
              activeEffect?"open":"closed"             
            }
            className="w-full h-full z-50"
            src={`https://image.tmdb.org/t/p/w500/${dataMovies[count].poster_path}`}
          /> 
        </m.section>
      ) :null
      
      
      }
    </m.main>
  );
}
