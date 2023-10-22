import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Get_videos(props) {

    const navigate = useNavigate()
  const { selectMovieTv } = props;

  const [active, setActive] = useState(false);
  const [resApi, setResApi] = useState();
  const { idMovie } = props;
  const [selectMovieOrTv, setSelectMovieOrTv] = useState();
  const [activeLength, setActiveLength] = useState();

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
  
 resApi?console.log(resApi):null
  return (
    <main className="w-screen h-screen bg-slate-600 z-50">
      <h1 className="text-10xl text-red-800" onClick={() => setActive(!active)}>
        videos
      </h1>

      {
      
      resApi ? (
        resApi.results.length === 0 ?       
        <h2
            className="
                w-screen
                flex
                justify-center
                text-orange-200
                text-5xl
                m-auto
            "
        >Sorry No trailer</h2>
        :
        resApi.results.length > 1?
        
          <iframe
            type="text/html"
            className="
                m-auto
                w-full
                h-96  
            "
            src={`//www.youtube.com/embed/${resApi.results[1].key}?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
          ></iframe>:
         
          <iframe
            type="text/html"
            className="
                m-auto
                w-full
                h-96  
            "
            src={`//www.youtube.com/embed/${resApi.results[0].key}?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
          ></iframe>
        
      ) : null}
    </main>
  );
}
