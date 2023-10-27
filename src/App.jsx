import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";
import Svg from "./components/Svg";
import Carousel_movies from "./components/Carousel_header_movies";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Movie_info from "./components/Movie_info";
import Actor_info from "./components/Actor_info";
import Filmography from "./components/Filmography";
import Trailers from "./components/Trailers";
import Home from "./components/Home";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePageSearch, setActivePageSearch] = useState();
  const [selectMovieTv, setSelectMovieTv] = useState(true);
  const [activeNavbar, setActiveNavbar] = useState(true);

  const activeSearch = (e) => {
    setActivePageSearch(e);
  };

  useEffect(() => {
    location.pathname !== "/" ? setActiveNavbar(true) : setActiveNavbar(false);
  }, [location.pathname]);

  const selectMovieOrTv = (e) => {
    setSelectMovieTv(e);
    e
      ? localStorage.setItem("movieOrTv", "movie")
      : localStorage.setItem("movieOrTv", "tv");
  };
  const dataOverage = (e) => <Svg e={e} />;

  const variantsCarousel = {
    open: {
      display: "none",
      transition: {
        delay: 0.5,
      },
    },
    closed: {
      display: "flex",
      transition: {
        delay: 0.5,
      },
    },
  };
  return (
    <m.main className="w-screen flex flex-col">
      <h1 className=" z-50 flex bg-slate-800/[0.8] justify-center w-screen text-[1.2rem] text-orange-200 p-2 m-auto" 
      onClick={() => navigate("/")}>
        App Movies
      </h1>
     
      <Navbar activeSearch={activeSearch} />
      <Search activeSearch={activeSearch} activePageSearch={activePageSearch}/>   
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="infoMovie" element={<Movie_info />} />
          <Route path="infoActor" element={<Actor_info />} />
          <Route path="filmography" element={<Filmography />} />
          <Route path="trailers" element={<Trailers />} />
        </Routes>
      </AnimatePresence>
    </m.main>
  );
}

export default App;
