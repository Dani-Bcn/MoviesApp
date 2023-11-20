import React, { useState, useEffect } from "react";
import Carousel_movies from "./Carousel_header";
import Carousel_popular from "./Carousel_sections";
import {motion as m} from "framer-motion"


export default function Home() {
 return (
  <main className="flex flex-col ">
     <section
        className=" absolute z-20 -mt-[200px] sm:mt-10 w-screen h-screen flex flex-col items-center justify-center"      
      >
        <h1
          className=" text-blue-200 text-8xl font-Josefin  text-shadow-logo"         
        >
          Movies
        </h1>
        <h1
          className="text-indigo-200 text-8xl font-Josefin  text-shadow-logo"         
        >
          App
        </h1>
      </section>
  <Carousel_movies />
  <Carousel_popular/>
  </main>
 )
  
}
