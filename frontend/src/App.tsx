import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries/:slug" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
