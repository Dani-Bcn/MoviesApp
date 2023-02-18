import React,{useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import {motion as m} from 'framer-motion'
const Infomovie = (infoMovie) => {

const navigate = useNavigate()
const [valuesMovie,setValuesMovie] = useState()
useEffect(()=>{
infoMovie.infoMovie.length >0 ? setValuesMovie(infoMovie.infoMovie):null

},)

    return (
      
        <section className='container-cards'>
              {
                valuesMovie &&(
                  valuesMovie.map((e, i) => {
                        return (
                            <div onClick={() => {
                                window.localStorage.setItem("value", infoMovie.valuesForPageInfo + e.id)
                                navigate("/info")
                            }}
                                className='cardsMovies' key={e.id}>
                                <m.div style={{
                                    overflow: "hidden",
                                }}
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: [0, 1],
                                        transition: {
                                            delay: i * 0.1
                                        }
                                    }}
                                    whileInView={{
                                        x: [100, 0],
                                        transition: {
                                            duration: 1,
                                        }
                                    }}
                                >
                                    <m.img
                                        whileHover={{
                                            scale: [1, 1.5],
                                            transition: {
                                                duration: 1.5,
                                                ease: "easeOut",
                                            }
                                        }}
                                        src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt={e.id} ></m.img>
                                </m.div>
                            </div>
                        )
                    }) 
                )
                }  
            </section>
    )
}

export default Infomovie;
