import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import { gsap} from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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

  const tl = gsap.timeline();
  gsap.registerPlugin(ScrollTrigger);
 useEffect(() => { 
  tl.set("#circle",{
    opacity:0.05
  }) 
    tl.to("#circle", {
        scrollTrigger:{
            start:"top 50", 
            end:350,   
            scrub:2,
            
        },
       opacity:1,
        stagger:0.05,
    });
  },);

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
              <m.p
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
                animate={{
                  opacity: [0, 1],
                  transition: {
                    delay: 1,
                    duration: 3,
                  },
                }}
              >
                {e.vote_average}
              </m.p>
              <svg        
           
                className="                            
                            absolute
                            flex
                            justify-center
                            items-center
                            w-20
                            h-20
                            mt-[130px]
                            ml-[60px]
                            z-10
                        "
                xmlns="http://www.w3.org/2000/svg"
              >
                <m.circle    
                       
                  cx="50"
                  cy="50"
                  r="25"
                  fill="#0059"
                  stroke="#929"
                  strokeWidth={7}
                 animate={{
                    scale: [0, 1],
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
             
                id="circle" 
                  
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
