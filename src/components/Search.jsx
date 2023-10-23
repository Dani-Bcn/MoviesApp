import React, { useEffect, useState, useRef } from "react";
import {motion as m} from "framer-motion"
import { Link, useNavigate } from "react-router-dom";


export default function Search(props) { 

  const navigate = useNavigate()
  const inputRef = useRef();
  const buttonTextRef = useRef();
  const [newCall, setNewCall] = useState(false);
  const [seacrhInput, setSearchInput] = useState("movie");
  const [findMovie, setFindMovie] = useState();
  const [movirOrTv,setMovieOrTv] = useState()
 
 
  const {active} = props

const [activePage,setActivePage] = useState(true)

  useEffect(() => {
    if (inputRef.current.value.length > 3) {
      fetch(
        /* multi, para buscar tanto pelis como series */
        /* person, buscar personas */
        `https://api.themoviedb.org/3/search/multi?query=${seacrhInput}&api_key=55b2cf9d90cb74c55683e395bb1ad12b&`
      )
        .then((resp) => resp.json())
        .then((resp) => setFindMovie(resp.results));      
    }
  }, [newCall]);

 

  return (
    <m.main
      className="
      absolute
      w-screen  
      -mt-[120px]
    bg-slate-800
    rounded-r-[25px]
      z-50
    "
    whileInView={{
      opacity:[0.01,1]
    }}
    >
      <section
        className="
        absolute
          bg-slate-800          
        "
      >
        <svg
          onClick={()=>active(false)}
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
            width="25px"
            height="30px"
            viewBox="0 0 25 25"
            fill="red"
            xmlns="http://www.w3.org/2000/svg"
            className="
            scale-[1.3]
            mx-5
            "
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
           
          </article>
        </section>
        {findMovie ? (
          findMovie.length === undefined ||
          (findMovie.length < 1 && inputRef.current.value.length > 3) ? (
            <h1
              className="
            flex
            w-screen
            items-center
            justify-center
            my-3
            text-[1.3rem]
            text-orange-200
            rounded-[50px]
          "
            >
              No results
            </h1>
          ) : null
        ) : null}
      </section>
      <section
        className="          
            mt-32
            m-auto                   
            p-2
            text-[1.2rem]            
            text-orange-200
            bg-slate-800
            rounded-[50px]
          "
      >
        {findMovie
          ? findMovie.map((e, i) => {
              if (e.poster_path) {
                return (
                  <section key={i}
                    className="                  
                    flex
                    m-5
                    shadow     rounded-[50px]                             
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
                        {e.title } 
                      </h2>

                    {
                      e.media_type === "person"?null:
                      e.media_type  === "movie" ?

                  
                      <button

                      onClick={()=>{
                        "/infoMovie",
                        active(false), 
                        localStorage.setItem("idMovie", e.id)
                        localStorage.setItem("movieOrTv", "movie")
                      }}
                        className="
                          bg-slate-600
                          py-4
                          mx-auto
                          rounded-[5px]
                        "
                      >Info</button>      
                                
                      :
                      <button
                      onClick={()=>{
                        "/infoMovie",
                        active(false), 
                        localStorage.setItem("idMovie", e.id)
                        localStorage.setItem("movieOrTv", "tv")
                      }}
                        className="
                          bg-slate-600
                          py-4
                          mx-auto
                          rounded-[5px]
                        "
                      >Info</button>
                    
                    
                    }
                     
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
