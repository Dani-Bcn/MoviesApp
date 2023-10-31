import React, { useEffect, useState, useRef } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Carousel_movies() {
  const movieOrTv = localStorage.getItem("movieOrTv")
  const idMovie = localStorage.getItem("idMovie")
  const [dataMovies, setDataMovies] = useState();
  const [dataImages, setDataImages] = useState();
  const [count, setCount] = useState(Math.floor(Math.random()*19));
  const [activeEffect,setActiveEffect] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/${movieOrTv}?api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataMovies(resp.results));
 
  }, [movieOrTv]);

  const countImages =(()=>{
    setActiveEffect(!activeEffect)
    setCount(count+1)
    count === 19?setCount(1):null
  clearInterval(interval)
}) 

const interval = setInterval(() => {
   countImages()
  }, 4000);
  const variantsEffect ={
    open:{
      x:[-50,0],
      opacity:[0.1,0.1,1],
      transition:{
        duration:0.1
      }
    },
    closed:{
      x:[-50,0],
      opacity:[0.1,0.1,1],
      transition:{
        duration:0.1
      }
    }
  } 

  return (
    <m.main className=" z-1 mt-20 text-orange-200  bg-slate-800"     
    exit={{
      opacity:[1,0],
      transition:{
        duration:0.3,
      }
    }}     
    >
      {dataMovies ? 
      <>{
         !dataMovies[count].poster_path? setCount[count +1]:null
      }       

        <m.section className="z-1"
          onClick={()=>{navigate("/infoMovie"),localStorage.setItem("idMovie",dataMovies[count].id)}
        }
        >
          
        
         
         <m.img
            variants={variantsEffect}
            animate={
              activeEffect?"open":"closed"             
            }
            className="w-full h-[550px] z-10"
            src={`https://image.tmdb.org/t/p/w500/${dataMovies[count].poster_path}`}
          />  
 <section className="absolute top-0 w-screen h-[800px] bg-gradient-to-t to-cyan-500/[0] from-slate-800 z-10"></section>

        </m.section>
        </>
      :null    
      }
    </m.main>
  );
}
