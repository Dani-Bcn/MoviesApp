import React, { useEffect, useState, useRef } from "react";
import { animate, motion as m } from "framer-motion";
import gsap from "gsap";
import List_Movies from "../components/List_Movies";
import Search from "../components/Search";

export default function Calls_Api(props) {
  const { dataOverage } = props;

  const [selectMovieOrTv, setselectMovieOrTv] = useState("movie");
  const [pageList, setPageList] = useState(1);
  const [selectGenres, setSelectGenres] = useState(28);
  const [popularity, setPopularity] = useState("");
  const [resApiResults, setResApiResults] = useState({});
  const [newCall, setNewCall] = useState(false);
  const [resApiGenres, setResApiGenres] = useState();
  const [activeGenres, setActiveGenres] = useState(false);
  const [searchMovie, setSeachMovie] = useState([]);
  const [findMovie, setFindMovie] = useState();
  const [activeMovies, setActiveMovies] = useState(true);
  const [textButtonTvActor, setTextButtonTvActor] = useState("Search Person");
  const [selectTvOrActor, setSelectTvOrActor] = useState("person");
  const [posterOrProfile, setposterOrProfile] = useState(false);
  const [textNoResults, setTextNoResults] = useState("");

  const inputMovies = useRef();

  /* Busqueda por título de series y películas */
  useEffect(() => {
    fetch(
      /* multi, para buscar tanto pelis como series */
      /* person, buscar personas */
      `https://api.themoviedb.org/3/search/${selectTvOrActor}?query=${searchMovie}&api_key=55b2cf9d90cb74c55683e395bb1ad12b&`
    )
      .then((resp) => resp.json())
      .then((resp) => setFindMovie(resp.results));
  }, [newCall]);

  /* Obtención de los todos los géneros segun película o serie*/
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/${selectMovieOrTv}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b&language=en-U`
    )
      .then((resp) => resp.json())
      .then((resp) => setResApiGenres(resp.genres));
  }, [newCall]);

  /*Obtención  de películas o series segun  pelílula o serie : "selectMovieOrTv" */
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/${selectMovieOrTv}?api_key=55b2cf9d90cb74c55683e395bb1ad12b${popularity}&page=${pageList}&with_genres=${selectGenres}`
    )
      .then((resp) => resp.json())
      .then((resp) => setResApiResults(resp));
    activeMovies ? (inputMovies.current.value = "") : null;
  }, [selectGenres, newCall]);

  activeGenres
    ? gsap.to("#card-genres", {
        x: -650,
        ease: "expo.out",
      })
    : gsap.to("#card-genres", {
        x: 0,
        ease: "expo.in",
      });
  let mm = gsap.matchMedia();

  // gsap responsive md
  mm.add("(min-width: 400px)", () => {
    activeGenres
      ? gsap.to("#card-genres", {
          x: 250,
          duration:1,
        })
      : gsap.to("#card-genres", {
          x: 500,
          ease: "expo.in",
        });
  });
  
  // gsap responsive lg
  mm.add("(min-width: 1000px)", () => {
    activeGenres
      ? gsap.to("#card-genres", {
          x: -200,
          duration:1,
        })
      : gsap.to("#card-genres", {
          x: 0,
          ease: "expo.in",
        });
  });
  return (
  <main>
      <List_Movies
        dataOverage={dataOverage}
        resApiGenres={resApiGenres}
        inputMovies={inputMovies}
        findMovie={findMovie}
        textButtonTvActor={textButtonTvActor}
        activeMovies={activeMovies}
        resApiResults={resApiResults}
        setActiveMovies={setActiveMovies}
        setTextNoResults={setTextNoResults}
        activeGenres={activeGenres}
        setSeachMovie={setSeachMovie}
        setNewCall={setNewCall}
        newCall={newCall}
        setTextButtonTvActor={setTextButtonTvActor}
        selectTvOrActor={selectTvOrActor}
        setSelectTvOrActor={setSelectTvOrActor}
        setposterOrProfile={setposterOrProfile}
        posterOrProfile={posterOrProfile}
        setPageList={setPageList}
        setselectMovieOrTv={setselectMovieOrTv}
        setSelectGenres={setSelectGenres}
        setActiveGenres={setActiveGenres}
        setPopularity={setPopularity}
        pageList={pageList}
      />

  </main>
  );
}
