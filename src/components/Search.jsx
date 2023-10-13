import React, { useRef, useEffect, useState } from "react";
import ListMovie from "./ListMovies";
import {motion as m} from "framer-motion"

const Search = () => {
  const [infoMovie, setInfoMovie] = useState();
  const [movieOrTv, setMovieOrTv] = useState(["Movie", "Tv"]);
  const [isSelected, setIsSelected] = useState("movie");
  const [localeMovieOrTv, setLocaleMovieOrTv] = useState(
    localStorage.getItem("movie-tv")
  );
  const [changeCall, setChangeCall] = useState(true);
  const [count, setCount] = useState(1);
  const [resApiGenres, setResApiGenres] = useState([]);
  const [genres, setGenres] = useState();
  const [searchPopularity, setSearchPopularity] = useState("");
  const valuesForPageInfo = [isSelected];
  let stringNum = toString();

  localStorage.setItem("indexPage", count);
  stringNum = localStorage.getItem("indexPage");
  const selectRef = useRef(null);

  const selected = (target) => {
    if (target === "Movie") {
      selectRef.current.selectedIndex = 0;
      setCount(1);
      setIsSelected("movie");
      setChangeCall(!changeCall);
      setGenres(28);
    } else {
      selectRef.current.selectedIndex = 0;
      setCount(1);
      setChangeCall(!changeCall);
      setIsSelected("tv");
      setGenres(10759);
    }
  };

  const funcPopular = () => {
    setSearchPopularity("&sort_by=vote_count.desc");
    setChangeCall(!changeCall);
  };
  const funcActual = () => {
    setSearchPopularity("");
    setChangeCall(!changeCall);
  };
  const nextPage = () => {
    console.log(count);
    setCount(count + 1);
    setChangeCall(!changeCall);
  };
  const firtsPage = () => {
    console.log(count);
    localStorage.setItem("indexPage", count);
    setCount(1);
    setChangeCall(!changeCall);
  };

  const previousPage = () => {
    console.log(count);
    localStorage.setItem("indexPage", count);
    count < 2 ? null : setCount(count - 1);
    setChangeCall(!changeCall);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/${isSelected}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b&language=en-U`
    )
      .then((resp) => resp.json())
      .then((resp) => setResApiGenres(resp.genres));
  }, [changeCall]);

  const selectGenre = (target) => {
    setGenres(target.target.value);
    setChangeCall(!changeCall);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/${isSelected}?api_key=55b2cf9d90cb74c55683e395bb1ad12b${searchPopularity}&page=${stringNum}&with_genres=${genres}`
    )
      .then((resp) => resp.json())
      .then((resp) => setInfoMovie(resp.results));
  }, [changeCall]);

  return (
    <m.main   
      className="
                overflow-hidden
                w-full
                bg-slate-900    
            "
    >
      <section
        className="        
                font-normal
                text-1xl
                text-orange-200  
            "
      >
        <article
        
          className="
                my-10
                mx-5            
                flex
                flex-wrap
                items-center
                justify-start
                "
        >
          {movieOrTv.map((e, i) => (
            <button key={i} id={i} onClick={() => selected(e)}>
              {e}
            </button>
          ))}
          <button onClick={() => funcActual()}>Current</button>
          <button onClick={() => funcPopular()}>Most popular</button>
          <m.form
            className="
                        mx-5
                        bg-slate-800
                    "
          >          
            <select
              className="                          
                                cursor-pointer
                            "
              ref={selectRef}
              onChange={(e) => selectGenre(e)}
            >
              {resApiGenres.map((e, i) => (
                <option
                  className="
                                    bg-stale-200
                                        cursor-pointer
                                    "
                  key={e.id}
                  value={e.id}
                  id={e.id}
                >
                  {e.name}
                </option>
              ))}
            </select>
          </m.form>
        </article>

        <section>
          {infoMovie && (
            <ListMovie
              infoMovie={infoMovie}
              valuesForPageInfo={valuesForPageInfo}
            />
          )}
        </section>
        <nav
          className="
         
                    h-10
                    my-5
                    md:ml-0
                    ml-5
                    flex
                    items-center
                    justify-center
                    z-50
                    "
        >
          <button onClick={() => firtsPage()}>First</button>
          <button onClick={() => previousPage()}>Previus</button>
          <button onClick={() => nextPage()}>Next</button>
        </nav>
      </section>
    </m.main>
  );
};

export default Search;
