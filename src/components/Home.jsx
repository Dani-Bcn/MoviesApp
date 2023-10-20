import React, { useState } from "react";
import { motion as m } from "framer-motion";
import Svg from "./Svg";
import Carousel_movies from "./Carousel_header";
import Navbar from "./Navbar";
import Search from "./Search";
import Movie_info from "./Movie_info";

export default function Home() {

  const [activeSearch, setActiveSearch] = useState(false);
  const [idMovie,setIdMovie] = useState()
  const active = (e) => {
    setActiveSearch(e);
  };

  const getIdMovieToMovieInfo =((e)=>{
    setIdMovie(e)
  })

  const dataOverage = (e) => <Svg e={e} />;

  const variants = {
    open: { x: 400,
      transition:{
        duration:0.5,
        ease:"circOut"
      }
    },
    
    closed: { x: -400,
      transition:{
        duration:0.5,
        ease:"circIn"
      }    
    },

  };
  return (
    <main
      className="
    z-10
    "
    >
      <h1
        className="
          w-screen
          flex
          justify-center
          my-10
          text-orange-200
          text-2xl    
        "
      >Movies App</h1>
    
      <m.section 
      className="
      absolute
        ml-[-400px]
        z-50
      "
      variants={variants} 
      animate={activeSearch ? "open" : "closed"}>
        <Search active={active} />
      </m.section>
      <Navbar active={active} />
    
      <Carousel_movies 
      getIdMovieToMovieInfo={getIdMovieToMovieInfo}
      active={active}
       />
       <Movie_info idMovie={idMovie}/>
      {/*   <List_Movies/> */}
      {/*   <Calls_Api dataOverage={dataOverage}/>  */}
    </main>
  );
}
