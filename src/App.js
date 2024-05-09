import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom';

import Nav from './components/Nav.js';
import Footer from './components/Footer.js';

import DetailPage from './pages/DetailPage/index.js';
import MainPage from './pages/MainPage/index.js';
import SearchPage from './pages/SearchPage/index.js';

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
};


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
