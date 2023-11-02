import React, { useState, useEffect } from "react";

export default function Find_genres() {
  const [dataGenres, setDataGenres] = useState();
  const [dataMovies, setDataMovies] = useState([]);
  const movieOrTv = localStorage.getItem("movieOrTv");
  const [active,setActive] = useState(false)

useEffect(()=>{

  movieOrTv==="movie" ?setActive(true):setActive(false)
  dataMovies.splice(0,dataMovies.length)
console.log(active)
},[movieOrTv])


 
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/${movieOrTv}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataGenres(resp)); 
  }, [movieOrTv]);

  dataGenres ? console.log("genres", dataGenres.genres) : null; 
  useEffect(() => {
    if (dataGenres) {
      
      dataGenres.genres.map((e, i) => {  
        fetch(
          `https://api.themoviedb.org/3/discover/${movieOrTv}?api_key=55b2cf9d90cb74c55683e395bb1ad12b&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${e.id}`
        )
          .then((resp) => resp.json())
          .then((resp) =>
            setDataMovies((dataMovies) => [...dataMovies, resp.results])
          );
      });
    }
  }, [dataGenres]);
  dataMovies ? console.log(dataMovies) : null; 

  return (
    <main>
      <section className="mt-24">
      {dataMovies?
        dataMovies.map((e, i) => {

              return (
                <section key={i}>
                       <p className="text-orange-100 text-2xl " >{dataGenres.genres[i].name}</p>
                <section
                  className="flex h-[250px] mx-5 gap-5 w-screen overflow-y-hidden scroll-auto"
                >
              

                  {e.map((e, i) => (
                    <>
                      <img
                        key={i}
                        className="rounded-[10px]"
                        src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                      />
                    </>
                  ))}
                </section>
                </section>
              );
            })
        : null}
        </section>
    </main>
  );
}
