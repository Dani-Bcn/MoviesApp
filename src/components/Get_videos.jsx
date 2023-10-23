import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";

export default function Get_videos(props) {
  const navigate = useNavigate();
  const { selectMovieTv } = props;
  const [maxResultsTitle, setMaxResultsTitle] = useState();

  const [active, setActive] = useState(false);
  const [resApi, setResApi] = useState();
  const { idMovie } = props;
  const [selectMovieOrTv, setSelectMovieOrTv] = useState();
  const [activeLength, setActiveLength] = useState();
  const [getKeyMovie, setGetKeyMovie] = useState();

  useEffect(() => {

    selectMovieTv ? setSelectMovieOrTv("movie") : setSelectMovieOrTv("tv");
    console.log(selectMovieOrTv, idMovie);
    selectMovieOrTv && idMovie

      ? fetch(
          `https://api.themoviedb.org/3/${selectMovieOrTv}/${idMovie}/videos?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setResApi(resp))
      : null;

  }, [selectMovieOrTv]);

  useEffect(() => {
    resApi ? setMaxResultsTitle(resApi.results.slice(0, 10)) : null;
    resApi ? console.log(resApi) : null;
  }, [resApi]);

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
           w-full
           h-full
           flex
        "
      >
        {resApi ? (
          resApi.results.length === 0 ? (
            <h2>
              No trailer
            </h2>
          ) : maxResultsTitle ? (
            <section>
                <section
                    className="
                    w-screen
                    p-5
                    "
                >
              {maxResultsTitle.map((e, i) => {
                return (
                 
                      <button key={i}
                      className="
                        w-80
                        flex
                        items-start
                        justify-start
                        text-[0.75rem]
                        py-2
                      "
                        onClick={() => {
                          console.log(e), setGetKeyMovie(e.key);
                        }}>
                        {e.name}
                      </button>   
                 
                );
              })}
            </section>
              <iframe
               className="
               w-screen
               h-56
               sm:h-96
                my-10
               " 
               src={`//www.youtube.com/embed/${getKeyMovie}?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
              ></iframe>
              </section>
         
          ) : (
            <iframe
              src={`//www.youtube.com/embed/${resApi.results[0].key}?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
            ></iframe>
          )
   
        ) : null}


      </section>
    </main>
  );
}
