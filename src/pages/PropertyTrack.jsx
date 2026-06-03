import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Tracks.css";

function PropertyTrack() {
  const { userData } = useContext(UserContext);

  const depositGoal =
    userData.income * 12;

  const readiness =
    Math.min(
      (userData.currentSavings /
        depositGoal) *
        100,
      100
    );

  return (
    <div className="track-detail-page">

      <h1 className="page-title">
        🏠 First Property Path
      </h1>

      <div className="track-overview">
        <p>
          Prepare financially for your first property
          purchase by building savings and improving
          affordability.
        </p>
      </div>

      <div className="track-grid">

        <div className="info-tile">
          <h3>Deposit Target</h3>
          <p>
            R{depositGoal.toLocaleString()}
          </p>
        </div>

        <div className="info-tile">
          <h3>Current Savings</h3>
          <p>
            R{userData.currentSavings.toLocaleString()}
          </p>
        </div>

        <div className="info-tile">
          <h3>Property Readiness</h3>
          <p>
            {readiness.toFixed(0)}%
          </p>
        </div>

      </div>

      <div className="recommendation">
        <h3>Recommended Next Step</h3>

        <p>
          Save at least 10–20% of a property's value
          before applying for a home loan.
        </p>
      </div>

    </div>
  );
}

export default PropertyTrack;