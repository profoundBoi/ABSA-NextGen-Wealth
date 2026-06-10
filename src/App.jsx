import { Routes, Route, Navigate } from "react-router-dom";
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
import LoginPage from "./pages/LoginPage";

function ProtectedRoute({ children }) {
  const session = localStorage.getItem("session");
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/login" element={<LoginPage />} />

      {/* PROTECTED — everything inside here requires login */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/snapshot" element={<MoneySnapshot />} />
                <Route path="/simulation" element={<SimulationLab />} />
                <Route path="/simulation/property" element={<RentVsBuy />} />
                <Route path="/simulation/car" element={<CarVsInvest />} />
                <Route path="/simulation/invest" element={<LocalVsOffshore />} />
                <Route path="/tracks" element={<StrategyTracks />} />
                <Route path="/tracks/balanced" element={<TrackDetails />} />
                <Route path="/tracks/lifestyle" element={<LifestyleTrack />} />
                <Route path="/tracks/property" element={<PropertyTrack />} />
                <Route path="/tracks/investor" element={<InvestorTrack />} />
              </Routes>
            </>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
