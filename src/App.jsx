import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";
import Svg from "./components/Svg";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Movie_info from "./components/Movie_info";
import Actor_info from "./components/Actor_info";
import Filmography from "./components/Filmography";
import Trailers from "./components/Trailers";
import Images from "./components/Images";
import Actor_movies from "./components/Actor _movies";
import Find_genres from "./components/Find_genres";
import Start_logo from "./components/Start_logo";
import Home from "./components/Home";


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dataImagesMovie, setDataImagesMovie] = useState()
  const [activePageSearch, setActivePageSearch] = useState(false);
  const [selectMovieTv, setSelectMovieTv] = useState(true);
  const [activeNavbar, setActiveNavbar] = useState(true);

  const getImages=((e)=>{
    setDataImagesMovie(e)
  })

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
    <m.main className="sticky flex flex-col">     
     
      <Navbar activeSearch={activeSearch} />
      <Search activeSearch={activeSearch} activePageSearch={activePageSearch}/>   
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<Home />} />
          <Route path="infoMovie" element={<Movie_info getImages={getImages}/>} />
          <Route path="infoActor" element={<Actor_info />} />
          <Route path="filmography" element={<Filmography />} />
          <Route path="trailers" element={<Trailers />} />
          <Route path="images" element={<Images dataImagesMovie={dataImagesMovie} />} />
          <Route path="actorMovies" element={<Actor_movies/>}/>
          <Route path="findGenres" element={<Find_genres/>}/>
          <Route path="/" element={<Start_logo/>}/>
          
        </Routes>
      </AnimatePresence>
    </m.main>
  );
}

export default App;
