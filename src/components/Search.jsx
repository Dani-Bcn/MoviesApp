import React, { useEffect, useState, useRef } from "react";
import {motion as m} from "framer-motion"


export default function Search() { 

  const inputRef = useRef();
  const buttonTextRef = useRef();
  const [newCall, setNewCall] = useState(false);
  const [seacrhInput, setSearchInput] = useState("movie");
  const [findMovie, setFindMovie] = useState();
  const [activePageSearch,setActivePageSearch] = useState(false)

 
const [activePage,setActivePage]= useState(localStorage.getItem("activePage"))

setInterval(()=>{
   setActivePage(localStorage.getItem("activePage"))
})


useEffect(()=>{
  console.log(activePageSearch)
   setActivePageSearch(activePage)
},[activePage])

const handleClick =(()=>{

  setActivePageSearch(!activePage)
})




  useEffect(() => {
    if (inputRef.current.value.length > 3) {
      fetch(
        /* multi, para buscar tanto pelis como series */
        /* person, buscar personas */
        `https://api.themoviedb.org/3/search/movie?query=${seacrhInput}&api_key=55b2cf9d90cb74c55683e395bb1ad12b&`
      )
        .then((resp) => resp.json())
        .then((resp) => setFindMovie(resp.results));
      setFindMovie ? console.log(findMovie) : null;
    }
  }, [newCall]);

  const variants ={
    open:{x:-0},
    closed:{x:400}
  }

 

  return (
    <m.main
      className="
      absolute
      w-screen
      -mt-5
    bg-slate-800
      z-20
    "
    variants={variants}
    animate={
      activePageSearch ? "open":"closed"
    }
    >
      <section
        className="
          fixed
          bg-slate-800
        "
      >

{
  console.log(activePageSearch)
}

        

        <svg

          onClick={()=>handleClick()}
          width="30px"
          height="30px"
          viewBox="0 0 60 50"
          xmlns="http://www.w3.org/2000/svg"
          className="
          m-5
        "
        >
          <g id="Shopicon">
            <polygon
              fill="#999"
              points="40,22 14.828,22 28.828,8 26,5.172 7.172,24 26,42.828 28.828,40 14.828,26 400,26 	"
            />
          </g>
        </svg>
        <section
          className="
          w-screen
          p-4
          bg-slate-500
          flex
          justify-around
          items-center
         "
        >
          <svg
            width="50px"
            height="30px"
            viewBox="0 0 20 20"
            fill="red"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
              fill="#599"
            />
          </svg>
          <form>
            <input
              className="
              bg-slate-500
              text-slate-300
            "
              ref={inputRef}
              placeholder="Search Movies/Tv"
              onChange={() => {
                setSearchInput(inputRef.current.value);
                setNewCall(!newCall);
              }}
            />
          </form>
          <article>
            <button
              onClick={() => window.location.replace("")}
              className="
                w-20
                text-orange-200
              "
            >
              Clear
            </button>
          </article>
        </section>
        {findMovie ? (
          findMovie.length === undefined ||
          (findMovie.length < 1 && inputRef.current.value.length > 3) ? (
            <h1
              className="
            flex
            w-screen
            justify-center
            text-2xl
            text-orange-200
          "
            >
              No results
            </h1>
          ) : null
        ) : null}
      </section>
      <section
        className="          
            mt-40
            m-auto
            w-96
            p-2
            text-[1.2rem]            
            text-orange-200
            bg-slate-800
          "
      >
        {findMovie
          ? findMovie.map((e, i) => {
              if (e.poster_path) {
                return (
                  <section
                    className="
                    flex
                    m-5
                    shadow     
                             
                  "
                  >
                    <img
                      className="rounded-l-lg
                      
                      shadow-lg shadow-cyan-400/50 
                      "
                      src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                    />
                    <section
                      className="
                        flex
                        w-48
                        py-5
                        flex-col
                        items-start
                        justify-between
                        bg-slate-700 
                        rounded-r-lg  
                        shadow-lg shadow-cyan-500/50              
                      "
                    >
                      <h2
                        className="
                          mx-5
                        "
                      >
                        {e.title.slice(0,60) } 
                      </h2>
                      <button
                        className="
                          bg-slate-600
                          py-4
                          mx-auto
                        "
                      >Info</button>
                    </section>
                  </section>
                );
              }
            })
          : null}
      </section>
    </m.main>
  );
}
