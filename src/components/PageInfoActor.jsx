import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PageInfoActor = () => {
    const navigate = useNavigate()
    const [infoLocale, setInfoLocale] = useState(JSON.parse(localStorage.getItem("infoActor")))
    const [indexActor, setIndexActor] = useState(localStorage.getItem("indexActor"))
    const [idActor, setIdActor] = useState(infoLocale.cast[indexActor].id)
    const [infoActor, setInfoActor] = useState()

    useEffect(() => {
        if (idActor) {
            fetch(`https://api.themoviedb.org/3/person/${idActor}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => setInfoActor(resp))
        }
    }, [])

    useEffect(() => {
        console.log(infoActor)
    })

    return (
        <main className='info-actor'>
            <section className='container-infoActor'>
                {
                    infoActor !== undefined && (
                        <img src={`https://image.tmdb.org/t/p/w500/${infoActor.profile_path}`} alt="" />
                    )
                }
                {
                    infoActor && (
                        <span>
                            <article>
                                {
                                    infoActor.name && (
                                        <h2>{infoActor.name}</h2>
                                    )
                                }
                                {
                                    infoActor.birthday && (
                                        <h3>Birhtday  &nbsp;  &nbsp; <span>{infoActor.birthday}</span></h3>
                                    )
                                }
                                {
                                    infoActor.place_of_birth && (
                                        <h3>Place of birth  &nbsp;  &nbsp; <span>{infoActor.place_of_birth}</span></h3>
                                    )
                                }
                                {
                                    infoActor.homepage && (
                                        <h3>Homepage  &nbsp;  &nbsp; <a href={infoActor.homepage} target="_blank">{infoActor.homepage}</a></h3>
                                    )
                                }
                                {
                                    infoActor.popularity && (
                                        <h3>Popularity  &nbsp;  &nbsp;<span>{infoActor.popularity}</span></h3>
                                    )
                                }

                                <button className='card-info-button' onClick={() => navigate(-1)}>Back</button>
                            </article>
                        </span>
                    )
                }

            </section>
            <article className='card-biography'>
                {
                    infoActor && (
                        <h3>Biography  <br /><br /> <span>{infoActor.biography}</span></h3>
                    )
                }
            </article>
        </main>
    );
}

export default PageInfoActor;
