import { Link } from "react-router-dom";
import "../styles/Tracks.css";

function StrategyTracks() {
  return (
    <div className="tracks-page">

      <h1 className="page-title">Strategy Tracks</h1>

      <div className="page-description">
        <p>
          Strategy Tracks are guided financial paths designed to help you make
          smarter decisions over the first five years of your career.
        </p>

        <p>
          Each track focuses on a different approach to balancing spending,
          saving, and investing, allowing you to explore trade-offs and choose
          a path that fits your lifestyle and goals in a South African context.
        </p>
      </div>

      <div className="track-cards">

        <div className="track-card">
          <h3>Balanced Lifestyle & Investing</h3>

          <p>
            Maintain a strong lifestyle while steadily building long-term wealth.
          </p>

          <Link to="/tracks/balanced">
            <button>View Track</button>
          </Link>
        </div>

        <div className="track-card disabled">
          <h3>First Property Path</h3>
          <p>Coming soon</p>
        </div>

        <div className="track-card disabled">
          <h3>Aggressive Global Investor</h3>
          <p>Coming soon</p>
        </div>

      </div>

    </div>
  );
}

export default StrategyTracks;