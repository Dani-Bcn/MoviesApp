import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion'
import gsap from 'gsap';

const Infomovie = (infoMovie) => {
    const navigate = useNavigate()
    const [valuesMovie, setValuesMovie] = useState()
    useEffect(() => {
        infoMovie.infoMovie ? setValuesMovie(infoMovie.infoMovie) : null
    },[infoMovie])

    const handleOver=((e)=>{
         gsap.to(e.target,{
            scale:1,
            filter: "sepia(0%)"
              
        }) 
    })
    const handleOut=((e)=>{
        console.log(e.target)
         gsap.to(e.target,{
            scale:2,
            filter: "sepia(100%)"
        }) 
    })



    return (
        <section 
            className='
                w-screen
                flex
                justify-center
                flex-wrap
            '
        >
            {
                valuesMovie && (
                    valuesMovie.map((e, i) => (
                        <div
                            onClick={() => {
                                window.localStorage.setItem("value", infoMovie.valuesForPageInfo + e.id)
                                navigate("/info")
                            }}
                            key={i}>
                            <div
                                className='
                                w-32
                                m-2
                               
                                   overflow-hidden          

                                '
                            >
                                <m.img 
                                id={e.id}
                                    onMouseOver={(e)=>handleOver(e)}
                                    onMouseOut={(e)=>handleOut(e)}                            
                                className='
                                w-32
                                h-46
                                scale-[1]
                                lg:scale-[2]
                                sepia(0)
                                lg:sepia
                                '
                                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt={e.id} ></m.img>
                            </div>
                        </div>
                    ))
                )
            }
        </section>
    )
}

export default Infomovie;
