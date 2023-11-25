import React, { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

export default function Trailers() {
  const movieOrTv = localStorage.getItem("movieOrTv");
  const [idMovie, setIdMovie] = useState(localStorage.getItem("idMovie"));
  const navigate = useNavigate()

  const [dataVideos, setDataVideos] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/videos?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataVideos(resp.results));      
  }, [idMovie]);

  return (
    <main className="my-20">
      {dataVideos
        ? dataVideos.map((e, i) => (
            <m.section
              key={i}
              className="opacity-0 z-10 my-10 md:mb-80"
              whileInView={{
                opacity: 1,
              }}
            >
              {i< 10 ? (
                <ReactPlayer
                  id="md-movie"
                  className="border-2 m-auto border-orange-300 z-40 shadow-xl shadow-slate-950"
                  url={`//www.youtube.com/watch?v=${e.key}`}
                  playing={false}
                  controls={true}
                  width={380}
                  height={250}
                ></ReactPlayer>
              ) : null}
            </m.section>
          ))
        : null}
    </main>
  );
}
