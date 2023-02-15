import React, { useEffect, useState } from 'react';

const Cast = (props) => {
    const [infoCast, setInfoCast] = useState()
    const [movieOrTv, setMovieOrTv] = useState()
    const {funcCast} = props
  
    useEffect(() => {
        if (props.valuesCast) {
            if (props.valuesCast.title) {
                setMovieOrTv("movie")
            } else {
                setMovieOrTv("tv")
            }
       
        }

    },)


    useEffect(() => {
        if (props.valuesCast) {
            fetch(`https://api.themoviedb.org/3/${movieOrTv}/${props.valuesCast.id}/credits?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => setInfoCast(resp))
        }

    }, [movieOrTv])
    useEffect(()=>{
            if(infoCast){
    
        funcCast(infoCast)
}

    })

 
    return (
        <main className='cast'>
            {
                infoCast !== undefined && (
                  
                    infoCast.cast.map((e, i) => {
                        if (i < 7) {
                            return (
                                <section key={e.id} className="card-cast">

                                    <h2 >{e.name}</h2>
                                    {
                                        e.profile_path && (
                                            < img src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`} />
                                        )
                                    }
                                </section>
                            )
                        }
                    })
                )
            }
            
        </main>
    );
}

export default Cast;
