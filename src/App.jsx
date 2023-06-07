import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";

import Contact from "./pages/Kickstarter";
import NoPage from "./pages/NoPage";
import Movies from "./pages/Movies";
import Videogames from "./pages/Videogames";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Videogames />} />
          <Route path="movies" element={<Movies />} />
          <Route path="kickstarter" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
