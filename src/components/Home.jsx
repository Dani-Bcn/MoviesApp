import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion as m } from "framer-motion";
import Svg from "./Svg";
import Carousel_movies from "./Carousel_header";
import Navbar from "./Navbar";
import Search from "./Search";
import Movie_info from "./Movie_info";

export default function Home() {
  const location = useLocation();
  const [activeSearch, setActiveSearch] = useState(false);
  const [idMovie, setIdMovie] = useState();
  const active = (e) => {
    setActiveSearch(e);
  };

  const getIdMovieToMovieInfo = (e) => {
    setIdMovie(e);
  };

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
      x: -400,
      transition: {
        duration: 0.5,
        ease: "circIn",
      },
    },
  };
  return (
    <main
      className="
        z-10
      "
    >
      <Navbar active={active} />
      <Routes location={location} key={location.pathname}>
        <Route path="infoMovie" element={<Movie_info idMovie={idMovie} />} />
 </Routes>
        <m.section
          className="
      absolute
        ml-[-400px]
        z-50
      "
          variants={variants}
          animate={activeSearch ? "open" : "closed"}
        >
          <Search active={active} />
        </m.section>
        <Carousel_movies
          getIdMovieToMovieInfo={getIdMovieToMovieInfo}
          active={active}
        />
     
      {/*   <List_Movies/> */}
      {/*   <Calls_Api dataOverage={dataOverage}/>  */}
    </main>
  );
}
