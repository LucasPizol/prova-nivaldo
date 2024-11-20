import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Movies } from "./pages/movies";
import { Header } from "./components/header";
import { SearchMovies } from "./pages/search-movies";

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/filmes" element={<Movies />} />
        <Route path="/filmes/:query" element={<SearchMovies />} />

        <Route path="*" element={<Navigate to="/filmes" />} />

        {/* <Route path="/movies" element={<Movies />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
