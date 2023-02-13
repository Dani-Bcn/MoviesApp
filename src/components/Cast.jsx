import React, { useState, useEffect } from 'react';

const Cast = (props) => {
    const [cast, setCast] = useState([])

    useEffect(() => {
        if (props.idMovie.length > 0) {
            setCast(props.idMovie)
        
        }
    })

    return (
        <div className='cast'>
            {
                cast.map((e, i) => {
                    return (
                        e.profile_path && (
                            <section key={e.id} className='card-cast'>
                                <h3 >{e.name}</h3>
                                <img  src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`} alt={e.name} />
                            </section>
                        )
                    )
                })
            }
        </div>
    );
}

export default Cast;
