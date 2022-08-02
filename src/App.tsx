import { Navigate, Route, Routes } from "react-router-dom";

import PokemonSearchPage from "./pages/PokemonSearchPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PokemonSearchPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
