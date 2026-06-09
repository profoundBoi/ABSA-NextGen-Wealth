import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Tracks.css";

function LifestyleTrack() {
  const { userData } = useContext(UserContext);

  const income        = Number(userData.income) || 0;
  const rent          = Number(userData.rent) || 0;
  const car           = Number(userData.car) || 0;
  const expenses      = Number(userData.expenses) || 0;
  const currentSavings = Number(userData.currentSavings) || 0;

  const totalExpenses = rent + car + expenses;
  const savingsRate   = income > 0 ? (currentSavings / income) * 100 : 0;
  const emergencyFund = totalExpenses * 3;

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
          <h1 className="page-title">🌿 Balanced Lifestyle & Investing</h1>
          <p className="page-description">
            This path focuses on creating a healthy balance between enjoying your lifestyle
            today and building wealth for the future.
          </p>
        </div>

        <div className="track-grid">

          <div className="track-metric-card">
            <div className="track-metric-tag">Monthly Income</div>
            <div className="track-metric-value">R{income.toLocaleString()}</div>
          </div>

          <div className="track-metric-card">
            <div className="track-metric-tag">Total Expenses</div>
            <div className="track-metric-value">R{totalExpenses.toLocaleString()}</div>
          </div>

          <div className="track-metric-card">
            <div className="track-metric-tag">Savings Rate</div>
            <div className="track-metric-value">{savingsRate.toFixed(1)}%</div>
          </div>

          <div className="track-metric-card">
            <div className="track-metric-tag">Emergency Fund Goal</div>
            <div className="track-metric-value">R{emergencyFund.toLocaleString()}</div>
          </div>

        </div>

        <div className="recommendation-panel">
          <p className="rec-label">Recommended Next Step</p>
          <p className="rec-text">
            {savingsRate < 10
              ? "Increase your savings rate above 10% before focusing on investments."
              : "You are building a strong financial foundation. Consider increasing your investment contributions."}
          </p>
        </div>

      </div>
    </div>
  );
}

export default LifestyleTrack;
