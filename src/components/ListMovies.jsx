import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import gsap from "gsap";

const Infomovie = (infoMovie) => {
  const navigate = useNavigate();
  const [valuesMovie, setValuesMovie] = useState();
  useEffect(() => {
    infoMovie.infoMovie ? setValuesMovie(infoMovie.infoMovie) : null;
  }, [infoMovie]);

  const handleOver = (e) => {
    gsap.to(e.target, {
      scale: 1,
      filter: "sepia(0%)",
    });
  };

  const handleOut = (e) => {
    gsap.to(e.target, {
      scale: 2,
      filter: "sepia(100%)",
    });
  };

  const visible = {
    pathLength: 0.99,
  };

  return (
    <section
      className="
                w-screen
                flex
                justify-center
                flex-wrap
            "
    >
      {valuesMovie &&
        valuesMovie.map((e, i) => (
          <div
            onClick={() => {
              window.localStorage.setItem(
                "value",
                infoMovie.valuesForPageInfo + e.id
              );
              navigate("/info");
            }}
            key={i}
          >
            <div
              className="
                                    w-32
                                    m-5
                                    overflow-hidden
                                "
            >
              {" "}
              <p
                className="
                    mt-[170px]
                    ml-[90px]
                    flex
                    items-center
                    justify-center
                    w-10
                    text-orange-300
                    font-bold
                    absolute
                    z-20
                "
              >
                {e.vote_average}
              </p>
              <svg
                className="                            
                            absolute
                            mt-[132px]
                            ml-[60px]
                            z-10
                        "
                xmlns="http://www.w3.org/2000/svg"
                width="124"
                height="124"
                viewBox="0 0 124 124"
              >
                <m.circle
                  id="circle"
                  cx="50"
                  cy="50"
                  r="25"
                  fill="#0009"
                  stroke="#926"
                  strokeWidth={7}
                  animate={{
                    pathLength: [0, e.vote_average / 10],
                    transition: {
                      delay: 1,
                      duration: 2,
                      ease: "circOut",

                    },
                  }}
                />
              </svg>
              <m.img
                id={e.id}
                onMouseOver={(e) => handleOver(e)}
                onMouseOut={(e) => handleOut(e)}
                className="
                                w-32
                                h-46
                                scale-[1]
                                lg:scale-[2]
                                sepia(0)
                                lg:sepia
                                "
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                alt={e.id}
              ></m.img>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Infomovie;
