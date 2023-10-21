import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion as m } from "framer-motion";
import Svg from "./Svg";
import Carousel_movies from "./Carousel_header_movies";
import Carousel_tv from "./Carousel_header_tv";
import Navbar from "./Navbar";
import Search from "./Search";
import Movie_info from "./Movie_info";
import Tv_info from "./Tv_info"
import Actor_info from "./Actor_info"
import Filmography from "./Filmography";

export default function Home() {
  const location = useLocation();
  const [activeSearch, setActiveSearch] = useState(false);
  const [idMovie, setIdMovie] = useState();
  const [selectMovieTv,setSelectMovieTv] = useState(true)
  const [idPerson, setIdPerson] = useState()
  const [keyWord, setKeyWord] = useState()

  const active = (e) => {
    setActiveSearch(e);
  };

  const selectMovieOrTv =((e)=>{
   setSelectMovieTv(e)

  })
  const getIdMovieToMovieInfo = (e) => {
    setIdMovie(e);
  };

  const getIdMovie=((e)=>{
    setIdMovie(e)     
 })

  const getIdPerson=((e)=>{
     setIdPerson(e)     
  })

  const getKeyWord=((e)=>{
    setKeyWord(e)
  })
  console.log(keyWord)

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
      <Navbar active={active} selectMovieOrTv={selectMovieOrTv}/>
      <Routes location={location} key={location.pathname}>
        <Route path="infoMovie" element={<Movie_info idMovie={idMovie} getIdPerson={getIdPerson} />} />
        <Route path="infoTv" element={<Tv_info idMovie={idMovie}  getIdPerson={getIdPerson} />} />
        <Route path="infoActor" element={<Actor_info idPerson={idPerson} getKeyWord={getKeyWord}/>} />
        <Route path="filmography" element={<Filmography  keyWord={keyWord} getIdMovie={getIdMovie}/>} />
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

        {

          selectMovieTv?

        <Carousel_movies
          getIdMovieToMovieInfo={getIdMovieToMovieInfo}
          active={active}
        /> :
          <Carousel_tv
          getIdMovieToMovieInfo={getIdMovieToMovieInfo}
          active={active}
          
        />
          
       
       }
      {/*   <List_Movies/> */}
      {/*   <Calls_Api dataOverage={dataOverage}/>  */}
    </main>
  );
}
