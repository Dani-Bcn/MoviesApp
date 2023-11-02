import React, { useState, useEffect } from "react";

export default function Find_genres() {
  const [dataGenres, setDataGenres] = useState();
  const [dataMovies, setDataMovies] = useState([]);
  const movieOrTv = localStorage.getItem("movieOrTv");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/${movieOrTv}/list?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataGenres(resp));
  }, []);

  dataGenres ? console.log("genres", dataGenres.genres) : null;
  useEffect(() => {
    if (dataGenres) {
      (movieOrTv === "movie" && dataGenres.length > 18) ||
      (movieOrTv === "tv" && dataGenres.length > 16)
        ? dataMovies.splice(0, dataMovies.length) 
        : null;
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
      {dataMovies
        ? (movieOrTv === "movie") & (dataMovies.length === 19) ||
          (movieOrTv === "tv") & (dataMovies.length === 16)
          ? dataMovies.map((e, i) => {
              console.log(dataMovies);
              return (
                <section
                  key={i}
                  className="flex h-[275px] w-screen overflow-y-hidden scroll-auto"
                >
                  {/* <p className="fixed text-red-300">
                    {dataGenres.genres[i].name}
                  </p> */}

                  {e.map((e, i) => (
                    <>
                      <img
                        key={i}
                        className="m-5rounded-[10px]"
                        src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                      />
                    </>
                  ))}
                </section>
              );
            })
          : null
        : null}
    </main>
  );
}
