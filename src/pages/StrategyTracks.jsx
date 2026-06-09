import { Link } from "react-router-dom";
import "../styles/Tracks.css";

function StrategyTracks() {
  return (
    <div className="tracks-page">

      <div className="mesh-bg">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-grid" />
      </div>

      <div className="tracks-content">

        <div className="tracks-header">
          <h1 className="page-title">Strategy Tracks</h1>
          <p className="page-description">
            Guided financial pathways designed for young South Africans entering the workforce.
            Each track provides milestones, recommendations and habits based on your life goals.
          </p>
        </div>

        <div className="track-cards">

          <div className="track-card">
            <div className="track-card-icon">🌿</div>
            <h3>Balanced Lifestyle & Investing</h3>
            <p>Build wealth while still enjoying your lifestyle. Focus on emergency savings, investing and sustainable spending.</p>
            <Link to="/tracks/lifestyle">
              <button>View Track</button>
            </Link>
          </div>

          <div className="track-card">
            <div className="track-card-icon">🏠</div>
            <h3>First Property Path</h3>
            <p>Prioritise saving for a home deposit and preparing for property ownership in South Africa.</p>
            <Link to="/tracks/property">
              <button>View Track</button>
            </Link>
          </div>

          <div className="track-card">
            <div className="track-card-icon">📈</div>
            <h3>Aggressive Global Investor</h3>
            <p>Maximise long-term growth through ETFs, offshore investing and higher savings rates.</p>
            <Link to="/tracks/investor">
              <button>View Track</button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StrategyTracks;
