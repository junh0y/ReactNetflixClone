import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios.js';
import './SearchPage.css';
import { useDebounce } from '../../hooks/useDebounce.js';

export default function SearchPage() {
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get('q');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        // First
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }

        // Second
    }, [debouncedSearchTerm]);

    const fetchSearchMovie = async (debouncedSearchTerm) => {
        try {
            const request = await axios.get(
                `search/multi?include_adult=false&query=${debouncedSearchTerm}`
            )
            setSearchResults(request.data.results);
            console.log(request.data.results);
        } catch (error) {
            console.log('error'+ error);
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                { searchResults.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== 'person') {
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                        return (
                            <div className="movie" key={movie.id}>
                                <div
                                    className="movie__column-poster"
                                    onClick={() => navigate(`/${movie.id}`)}
                                >
                                    <img
                                        src={movieImageUrl}
                                        alt="movieImage"
                                        className="movie__poster"
                                    />
                                </div>
                            </div>
                        );
                    }
                })}
            </section>
        ) : (
            <section className="no-results">
                <div className="no-results__text">
                    <p>
                        찾고자 하는 검색어 "{debouncedSearchTerm}"가 없습니다.
                    </p>
                </div>
            </section>
        )
    }

  return renderSearchResults();
}
