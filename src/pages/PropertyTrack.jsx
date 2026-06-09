import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Tracks.css";

function PropertyTrack() {
  const { userData } = useContext(UserContext);

  const income         = Number(userData.income) || 0;
  const currentSavings = Number(userData.currentSavings) || 0;

  // Deposit goal: 10% of estimated property value (2x annual income is a common SA estimate)
  const estimatedPropertyValue = income * 24;
  const depositGoal  = estimatedPropertyValue * 0.10;
  const readiness    = depositGoal > 0 ? Math.min((currentSavings / depositGoal) * 100, 100) : 0;
  const remaining    = Math.max(depositGoal - currentSavings, 0);

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
          <p className="track-eyebrow">Strategy Track</p>
          <h1 className="page-title">🏠 First Property Path</h1>
          <p className="page-description">
            Prepare financially for your first property purchase by building savings
            and improving affordability.
          </p>
        </div>

        <div className="track-grid">

          <div className="track-metric-card">
            <div className="track-metric-tag">Estimated Property Value</div>
            <div className="track-metric-value">R{estimatedPropertyValue.toLocaleString()}</div>
          </div>

          <div className="track-metric-card">
            <div className="track-metric-tag">10% Deposit Target</div>
            <div className="track-metric-value">R{Math.round(depositGoal).toLocaleString()}</div>
          </div>

          <div className="track-metric-card">
            <div className="track-metric-tag">Current Savings</div>
            <div className="track-metric-value">R{currentSavings.toLocaleString()}</div>
          </div>

          <div className="track-metric-card track-metric-accent">
            <div className="track-metric-tag">Property Readiness</div>
            <div className="track-metric-value">{readiness.toFixed(0)}%</div>
          </div>

        </div>

        <div className="track-progress-panel">
          <div className="track-progress-header">
            <span>Deposit Progress</span>
            <span>R{currentSavings.toLocaleString()} / R{Math.round(depositGoal).toLocaleString()}</span>
          </div>
          <div className="track-progress-track">
            <div className="track-progress-fill" style={{ width: `${readiness}%` }} />
          </div>
          <p className="track-progress-sub">R{Math.round(remaining).toLocaleString()} still needed</p>
        </div>

        <div className="recommendation-panel">
          <p className="rec-label">Recommended Next Step</p>
          <p className="rec-text">
            Save at least 10–20% of a property's value before applying for a home loan.
            Banks in South Africa also consider your debt-to-income ratio, so keeping
            expenses low improves your bond approval chances.
          </p>
        </div>

      </div>
    </div>
  );
}

export default PropertyTrack;
