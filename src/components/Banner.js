import React, { useEffect, useState } from 'react';
import requests from '../api/requests.js';
import axios from '../api/axios.js';
import './Banner.css';
import styled from 'styled-components';

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 현재 상영중인 영화 정보 조회 (복수)
        const request = await axios.get(requests.fetchNowPlaying);

        // 여러 영화 중 영화 하나의 ID 조회
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;

        // 특정 영화의 상세 정보 조회(비디오 정보 포함)
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: {append_to_response: 'videos'}
        });
        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    if (!isClicked) {
        return <header
            className="banner"
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                backgroundPosition: "top center",
                backgroundSize: "cover"
            }}
        >        
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie.title || movie.name || movie.original_name }
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button play" onClick={() => setIsClicked(true)}>Play</button>
                    <button className="banner__button info">More Information</button>
                </div>

                <h1 className="banner__description">{ truncate(movie.overview, 100) }</h1>
            </div>

            <div className="banner--fadeBottom"></div>
        </header>
    } else {
        return (
            <Container>
                <HomeContainer>
                    <Iframe
                        width="640"
                        height="360"
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    >
                    </Iframe>
                </HomeContainer>
            </Container>
        )
    }

}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    // opacity: 0.65;
    border: none;

    $::after {
        content: '';
        position: absoulte;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;