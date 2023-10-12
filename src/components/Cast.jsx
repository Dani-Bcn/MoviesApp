import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cast = (props) => {
  const navigate = useNavigate();
  const [infoCast, setInfoCast] = useState();
  const [movieOrTv, setMovieOrTv] = useState();
  const { funcCast } = props;

  useEffect(() => {
    if (props.valuesCast) {
      if (props.valuesCast.title) {
        setMovieOrTv("movie");
      } else {
        setMovieOrTv("tv");
      }
    }
  });

  useEffect(() => {
    if (props.valuesCast) {
      fetch(
        `https://api.themoviedb.org/3/${movieOrTv}/${props.valuesCast.id}/credits?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
      )
        .then((resp) => resp.json())
        .then((resp) => setInfoCast(resp));
    }
  }, [movieOrTv]);
  useEffect(() => {
    if (infoCast) {
      localStorage.setItem("infoActor", JSON.stringify(infoCast));
      funcCast(infoCast);
    }
  });

  const goToActorInfoPage = (value) => {
    localStorage.setItem("indexActor", value);
    navigate("/infoActor");
  };

  return (
    <main
      className="
            flex
            items-center
            justify-center
        "
    > 
      <section
        className="       
        flex
        flex-col
        md:flex-row
        md:flex-wrap
        items-center        
        justify-center
     "
      >
       
        {infoCast !== undefined &&
          infoCast.cast.map((e, i) => {
            if (i < 6) {
              return (
                <section
                  className="
                    flex
                    md:w-52
                    w-64
                    flex-wrap
                    my-10 
                    justify-center          
                "
                  key={e.id}
                >
                    
                  {e.profile_path && (
                    <h3
                      className="
                        h-10  
                        bg-slate-100                    
                        mb-10
                        mx-5
                        md:text-2xl
                        text-3xl   
                        text-orange-200                   
                    "
                    >
                      {e.name}
                    </h3>
                  )}
                  {e.profile_path && (
                    <img
                      className="
                        m-auto
                           w-48
                        "
                      onClick={() => goToActorInfoPage(i)}
                      src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                    />
                  )}
                </section>
              );
            }
          })}
      </section>
    </main>
  );
};

export default Cast;
