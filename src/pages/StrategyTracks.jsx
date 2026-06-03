import { Link } from "react-router-dom";
import "../styles/Tracks.css";

function StrategyTracks() {
  return (
    <div className="tracks-page">

      <h1 className="page-title">
        Strategy Tracks
      </h1>

      <div className="page-description">
        <p>
          Strategy Tracks are guided financial pathways designed
          for young South Africans entering the workforce.
        </p>

        <p>
          Each track provides milestones, recommendations and
          financial habits based on different life goals.
        </p>

        <div className="highlight">
          💡 Choose the path that best matches your priorities and
          track your progress over time.
        </div>
      </div>

      <div className="track-cards">

        {/* BALANCED TRACK */}
        <div className="track-card">
          <h3>
            Balanced Lifestyle & Investing
          </h3>

          <p>
            Build wealth while still enjoying your lifestyle.
            Focus on emergency savings, investing and
            sustainable spending.
          </p>

          <Link to="/tracks/lifestyle">
            <button>
              View Track
            </button>
          </Link>
        </div>

        {/* PROPERTY TRACK */}
        <div className="track-card">
          <h3>
            First Property Path
          </h3>

          <p>
            Prioritise saving for a home deposit and preparing
            for property ownership in South Africa.
          </p>

          <Link to="/tracks/property">
            <button>
              View Track
            </button>
          </Link>
        </div>

        {/* INVESTOR TRACK */}
        <div className="track-card">
          <h3>
            Aggressive Global Investor
          </h3>

          <p>
            Maximise long-term growth through ETFs,
            offshore investing and higher savings rates.
          </p>

          <Link to="/tracks/investor">
            <button>
              View Track
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default StrategyTracks;