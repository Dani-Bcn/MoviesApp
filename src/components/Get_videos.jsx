import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";

export default function Get_videos() {
  const idMovie = localStorage.getItem("idMovie");
  const movieOrTv = localStorage.getItem("movieOrTv");
  const [infoMovie, setInfoMovie] = useState();
  const [maxResults, setMaxResults] = useState();
  const [visibleVideo, setVisibleVideo] = useState(false);
  const [keyWord, setKeyWord] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/videos?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setInfoMovie(resp));
    infoMovie ? setMaxResults(infoMovie.results.slice(0, 10)) : null;
  }, [infoMovie]);

  return (
    <main
      className=" 
            absolute
            w-screen 
            h-screen
            z-20
            bg-slate-800
        "
    >
      <section
        className="
            p-5
            text-[0.8rem] 
        "
      >
        {maxResults ? (
          maxResults.length > 0 ? (
            maxResults.map((e, i) => {
              return (
                <button
                  onClick={() => {
                    setVisibleVideo(true), setKeyWord(e.key);
                    console.log(e);
                  }}
                  key={i}
                  className="
                        w-full
                        flex
                        items-center
                        justify-start
                        text-orange-200
                        text-left
                        py-4
                    "
                >
                  {e.name}
                </button>
              );
            })
          ) : (
            <p>No results</p>
          )
        ) : null}
      </section>

      {visibleVideo ? (
        <iframe
          className="
               w-screen
               h-56
               sm:h-96
                my-10
               "
          src={`//www.youtube.com/embed/${keyWord}/?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
        ></iframe>
      ) : null}
    </main>
  );
}
