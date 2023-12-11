import React, { useState, useEffect } from "react";
import Carousel_movies from "./Carousel_header";
import Carousel_popular from "./Carousel_sections";


export default function Home() {

  const [title,setTitle]= useState("Movies")
 
const movieOrTv = localStorage.getItem("movieOrTv");
  useEffect(()=>{
      movieOrTv === "movie" ?  setTitle("Movies"): setTitle("Tv")
  },[movieOrTv])


 return (
  <main className="flex flex-col items-center  ">
     <section
        className=" absolute z-20 mt-32 lg:flex lg:scale-150 flex flex-col items-center justify-center"      
      >      
        <h1
          className=" text-blue-200 text-8xl font-Josefin  text-shadow-logo"         
        >
         {title}
        </h1>
      </section>
  <Carousel_movies />
  <Carousel_popular/>
  </main>
 )
  
}
