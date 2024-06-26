import React, { useRef } from 'react'
import './MovieModal.css';
import useOnClickOutside from '../../hooks/useOnClickOutside';

export default function MovieModal({ backdrop_path, title, overview, vote_average, name, release_date, first_air_date, setModalOpen }) {
    const ref = useRef();
    useOnClickOutside(ref, () => {setModalOpen(false)});


    return (
        <div className="presentation">
            <div className="wrapper-modal">
                <div className="modal" ref={ref}>
                    <span onClick={() => setModalOpen(false)} className="modal-close">X</span>
                    <img
                        className="modal__poster-img"
                        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                        alt={name}
                    />

                    <div className="modal__content">
                        <p className="modal__details">
                            <span className="modal__user_perc">100% for you</span>
                            { release_date ? release_date : first_air_date }
                        </p>
                        <h2 className="modal__title">{ title ? title : name }</h2>
                        <p className="movie__overview">Rate: { vote_average }</p>
                        <p className="movie__overview">{ overview }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
