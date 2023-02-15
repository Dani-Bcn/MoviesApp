import React, { useEffect, useState } from 'react';

const Cast = (props) => {
    const [infoCast, setInfoCast] = useState()

    useEffect(() => {
        if (props.valuesCast) {
            fetch(`https://api.themoviedb.org/3/movie/${props.valuesCast.id}/credits?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => setInfoCast(resp))
        }
    }, [props])

    return (
        <main className='cast'>
            {
                infoCast !== undefined && (
                    console.log(infoCast),
                    infoCast.cast.map((e, i) => {
                        if (i < 7) {
                            return (
                                <section key={e.id} className="card-cast">

                                    <h2 >{e.name}</h2>
                                    <img src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`} />
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
