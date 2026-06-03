import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Tracks.css";

function InvestorTrack() {
  const { userData } = useContext(UserContext);

  const monthlyInvesting =
    userData.currentSavings * 0.3;

  const projectedValue =
    monthlyInvesting *
    ((Math.pow(1.10, 10) - 1) / 0.10);

  return (
    <div className="track-detail-page">

      <h1 className="page-title">
        📈 Aggressive Global Investor
      </h1>

      <div className="track-overview">
        <p>
          Focus on building wealth through ETFs,
          diversification and long-term investing.
        </p>
      </div>

      <div className="track-grid">

        <div className="info-tile">
          <h3>Current Savings</h3>
          <p>
            R{userData.currentSavings.toLocaleString()}
          </p>
        </div>

        <div className="info-tile">
          <h3>Suggested Investment</h3>
          <p>
            R{monthlyInvesting.toLocaleString()}
          </p>
        </div>

        <div className="info-tile">
          <h3>10-Year Projection</h3>
          <p>
            R{Math.round(
              projectedValue
            ).toLocaleString()}
          </p>
        </div>

      </div>

      <div className="recommendation">
        <h3>Recommended Next Step</h3>

        <p>
          Consider diversified ETFs and offshore
          exposure for long-term growth.
        </p>
      </div>

    </div>
  );
}

export default InvestorTrack;