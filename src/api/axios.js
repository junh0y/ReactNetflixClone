import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    pramax: {
        api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
        language: 'ko-KR',
        token: process.env.REACT_APP_MOVIE_DB_API_TOKEN,
    },
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer '+ process.env.REACT_APP_MOVIE_DB_API_TOKEN
    }
});

export default instance; 