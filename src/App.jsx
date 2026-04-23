import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoneySnapshot from "./pages/MoneySnapshot";
import SimulationLab from "./pages/SimulationLab";
import SimulationStudio from "./pages/SimulationStudio";
import StrategyTracks from "./pages/StrategyTracks";
import TrackDetails from "./pages/TrackDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snapshot" element={<MoneySnapshot />} />
        <Route path="/simulation" element={<SimulationLab />} />
        <Route path="/simulation/property" element={<SimulationStudio />} />
        <Route path="/tracks" element={<StrategyTracks />} />
        <Route path="/tracks/balanced" element={<TrackDetails />} />
      </Routes>
    </>
  );
}

export default App;