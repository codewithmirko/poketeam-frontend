import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PokemonPage from "./pages/PokemonPage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import LogInPage from "./pages/LogInPage";
import TeamPage from "./pages/TeamPage";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pokemon" element={<PokemonPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
