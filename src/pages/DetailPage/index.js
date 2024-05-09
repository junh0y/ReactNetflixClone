import axios from '../../api/axios.js';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DetailPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    console.log('movieId', movieId);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(
                `/movie/${movieId}`
            )
            console.log('request', request);
            setMovie(request.data);
        }
        fetchData();
    }, []);

    if (!movie) return <div>...Loading</div>;

  return (
    <section>
        <img
            key={movieId}
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="Poster"
        />
    </section>
  )
}
