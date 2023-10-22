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
    <main className="w-screen h-screen bg-slate-600 z-50">
      <h1 className="text-10xl text-red-800" onClick={() => setActive(!active)}>
        videos
      </h1>
      {resApi ? (
        resApi.results.length === 0 ? (
          <h2
            className=" 
                w-screen
                flex
                justify-center
                text-orange-200
                text-5xl
                m-auto
            "
          >
            Sorry No trailer
          </h2>
        ) : maxResultsTitle ? (
            <section>

                {
          maxResultsTitle.map((e, i) => {
            return (
              <section
              key={i}
              >
                <section                 
                  className="
                    mx-5                        
                    text-orange-200
                    text-[1.2rem]
                "
                >
                  <button
                    onClick={() => {
                      console.log(e), setGetKeyMovie(e.key);
                    }}
                    className="
                        flex
                        justify-start  
                        w-60
                        py-5
                    "
                  >
                    {e.name.slice(0, 24)}
                  </button>
                </section>               
              </section>
            );
          })
        }
          <iframe
          src={`//www.youtube.com/embed/${getKeyMovie}?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
        ></iframe>
        </section>          
        ) : (
          <iframe
            src={`//www.youtube.com/embed/${resApi.results[0].key}?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
          ></iframe>
        )
      ) : null}
    </main>
  );
}
