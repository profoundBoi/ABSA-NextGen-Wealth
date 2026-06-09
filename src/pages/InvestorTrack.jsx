import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Tracks.css";

function InvestorTrack() {
  const { userData } = useContext(UserContext);

  const currentSavings = Number(userData.currentSavings) || 0;
  const income         = Number(userData.income) || 0;

  // Suggest investing 30% of current savings as monthly contribution
  const monthlyInvesting = currentSavings * 0.3;

  // Fixed: monthly annuity formula instead of annual
  const monthlyRate  = 0.10 / 12;
  const months       = 10 * 12;
  const projectedValue =
    monthlyInvesting > 0
      ? monthlyInvesting * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : 0;

  // Suggested allocation split
  const offshore = Math.round(monthlyInvesting * 0.7);
  const local    = Math.round(monthlyInvesting * 0.3);

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
          <h1 className="page-title">📈 Aggressive Global Investor</h1>
          <p className="page-description">
            Focus on building long-term wealth through ETFs, offshore diversification
            and disciplined investing.
          </p>
        </div>

        <div className="track-grid">

          <div className="track-metric-card">
            <div className="track-metric-tag">Current Savings</div>
            <div className="track-metric-value">R{currentSavings.toLocaleString()}</div>
          </div>

          <div className="track-metric-card">
            <div className="track-metric-tag">Suggested Monthly Investment</div>
            <div className="track-metric-value">R{Math.round(monthlyInvesting).toLocaleString()}</div>
          </div>

          <div className="track-metric-card track-metric-accent">
            <div className="track-metric-tag">10-Year Projection</div>
            <div className="track-metric-value">R{Math.round(projectedValue).toLocaleString()}</div>
          </div>

        </div>

        <div className="allocation-panel">
          <p className="rec-label">Suggested Allocation</p>
          <div className="allocation-row">
            <div className="allocation-item">
              <span className="alloc-dot dot-teal" />
              <span className="alloc-label">Offshore (70%)</span>
              <span className="alloc-value">R{offshore.toLocaleString()}/mo</span>
            </div>
            <div className="allocation-item">
              <span className="alloc-dot dot-red" />
              <span className="alloc-label">Local (30%)</span>
              <span className="alloc-value">R{local.toLocaleString()}/mo</span>
            </div>
          </div>
        </div>

        <div className="recommendation-panel">
          <p className="rec-label">Recommended Next Step</p>
          <p className="rec-text">
            Consider opening a Tax-Free Savings Account (TFSA) and investing in
            diversified ETFs with offshore exposure for maximum long-term growth.
          </p>
        </div>

      </div>
    </div>
  );
}

export default InvestorTrack;
