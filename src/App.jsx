import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MoneySnapshot from "./pages/MoneySnapshot";
import SimulationLab from "./pages/SimulationLab";
import RentVsBuy from "./pages/RentVsBuy";
import StrategyTracks from "./pages/StrategyTracks";
import TrackDetails from "./pages/TrackDetails";
import CarVsInvest from "./pages/CarVsInvest";
import LocalVsOffshore from "./pages/LocalVsOffshore";
import LifestyleTrack from "./pages/LifestyleTrack";
import PropertyTrack from "./pages/PropertyTrack";
import InvestorTrack from "./pages/InvestorTrack";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snapshot" element={<MoneySnapshot />} />
        <Route path="/simulation" element={<SimulationLab />} />
        <Route path="/simulation/property" element={<RentVsBuy />} />
        <Route path="/tracks" element={<StrategyTracks />} />
        <Route path="/tracks/balanced" element={<TrackDetails />} />
        <Route path="/simulation/car" element={<CarVsInvest />} />
        <Route path="/simulation/invest" element={<LocalVsOffshore />} />
        <Route path="/tracks/lifestyle" element={<LifestyleTrack />} />
        <Route path="/tracks/property" element={<PropertyTrack />} />
        <Route path="/tracks/investor" element={<InvestorTrack />} />
      </Routes>
    </>
  );
}

export default App;