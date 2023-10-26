import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion as m } from "framer-motion";
import Svg from "./Svg";
import Carousel_movies from "./Carousel_header_movies";
import Navbar from "./Navbar";
import Search from "./Search";
import Movie_info from "./Movie_info";
import Actor_info from "./Actor_info"
import Filmography from "./Filmography";

export default function Home() {
  const location = useLocation();
  const [activePageSearch, setActivePageSearch] = useState(false);
  const [selectMovieTv,setSelectMovieTv] = useState(true)

  const activeSearch = (e) => {
    setActivePageSearch(e);
  };

  const selectMovieOrTv =((e)=>{
   setSelectMovieTv(e)
   e?  localStorage.setItem("movieOrTv","movie"):
   localStorage.setItem("movieOrTv","tv")  
  })
  const dataOverage = (e) => <Svg e={e} />;
  const variants = {
    open: {
      x: 400,
      transition: {
        duration: 0.5,
        ease: "circOut",
      },
    },
    closed: {
      x: -450,
      transition: {
        duration: 0.5,
        ease: "circIn",
      },
    },
  };
  return (
    <m.main
      className="z-100"
      animate={{
        opacity:[0,1]
      }}
      exit={{
        opacity:[1,0]
      }}
    >
      <Navbar activeSearch={activeSearch} selectMovieOrTv={selectMovieOrTv}/>
      <Routes location={location} key={location.pathname}>
        <Route path="infoMovie" element={<Movie_info />} />      
        <Route path="infoActor" element={<Actor_info />} />
        <Route path="filmography" element={<Filmography  />} />
      
 </Routes>
       
        
      
        <Carousel_movies/>          
      
     
        <m.section
          className="ml-[-400px]"
          variants={variants}
          animate={activePageSearch ? "open" : "closed"}
        >
          <Search activeSearch={activeSearch} />
        </m.section>
    </m.main>
  );
}
