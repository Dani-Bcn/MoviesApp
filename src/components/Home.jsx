import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import Svg from "./Svg";
import Carousel_movies from "./Carousel_header_movies";
import Navbar from "./Navbar";
import Search from "./Search";
import Movie_info from "./Movie_info";
import Actor_info from "./Actor_info";
import Filmography from "./Filmography";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePageSearch, setActivePageSearch] = useState(false);
  const [selectMovieTv, setSelectMovieTv] = useState(true);
  const [activeNavbar, setActiveNavbar] = useState(true);
  const activeSearch = (e) => {
    setActivePageSearch(e);
  };

  useEffect(() => {
    location.pathname === "/" ? setActiveNavbar(true) : setActiveNavbar(false);
  }, [location.pathname]);

  const selectMovieOrTv = (e) => {
    setSelectMovieTv(e);
    e
      ? localStorage.setItem("movieOrTv", "movie")
      : localStorage.setItem("movieOrTv", "tv");
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
      x: -450,
      transition: {
        duration: 0.5,
        ease: "circIn",
      },
    },
  };

  const variantsActiveSearch ={
    open:{
        y:[-100,0]
    },
    closed:{
      y:[0,-100]
    }
  }
  return (
    <m.main
      className="z-100"
      animate={{
        opacity: [0, 1],
      }}
      exit={{
        opacity: [1, 0],
      }}
    >
      <m.section className="absolute z-50" onClick={() => navigate(-1)}
      variants={variantsActiveSearch}
      animate={
        activeNavbar? "closed":"open"
      }
      >
        <svg
          className="m-5"
          onClick={() => activeSearch(false)}
          width="30px"
          height="30px"
          viewBox="0 0 60 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Shopicon">
            <polygon
              fill="#999"
              points="40,22 14.828,22 28.828,8 26,5.172 7.172,24 26,42.828 28.828,40 14.828,26 400,26 	"
            />
          </g>
        </svg>
      </m.section>
      <m.section
      variants={variantsActiveSearch}
      animate={
        activeNavbar? "open":"closed"
      }
      >
        <Navbar activeSearch={activeSearch} selectMovieOrTv={selectMovieOrTv} />
      </m.section>

      <Routes location={location} key={location.pathname}>
        <Route path="infoMovie" element={<Movie_info />} />
        <Route path="infoActor" element={<Actor_info />} />
        <Route path="filmography" element={<Filmography />} />
      </Routes>

      {activeNavbar ? <Carousel_movies /> : null}

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
