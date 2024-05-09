import React, { useEffect, useState } from 'react';
import axios from '../api/axios.js';
import './Row.css';
import MovieModal from './MovieModal/index.js';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Row({ isLargeRow, title, id, fetchUrl }) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMvoieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    };

    const handleClick = (movie) => {
        setModalOpen(true);
        setMvoieSelected(movie);
    };

  return (
    <section className="row">
        <h2>{ title }</h2>
        {/* <div className="slider"> */}
            {/* <div className="slider__arrow-left">
                <span
                    className="arrow"
                    onClick={() => {
                        document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                    }}
                >
                    {'<'}
                </span>
            </div> */}
            <Swiper
                modules={ [Navigation, Pagination, Scrollbar, A11y ] }
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                loop={true}
                breakpoints={{
                    1378: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                    },
                    998: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    625: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    }
                }}
            >
                <div id={id} className="row__posters">
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <img
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                                onClick={() => handleClick(movie)}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
            {/* <div className="slider__arrow-right">
                <span
                    className="arrow"
                    onClick={() => {
                        document.getElementById(id).scrollLeft += window.innerWidth - 80;
                    }}
                >
                    {'>'}
                </span>
            </div> */}
        {/* </div> */}

        {
            modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        }
    </section>
  )
}
