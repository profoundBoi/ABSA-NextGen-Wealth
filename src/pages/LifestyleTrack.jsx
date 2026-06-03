import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Tracks.css";

function LifestyleTrack() {
  const { userData } = useContext(UserContext);

  const totalExpenses =
    userData.rent +
    userData.car +
    userData.expenses;

  const savingsRate =
    (userData.currentSavings /
      userData.income) *
    100;

  const emergencyFund =
    totalExpenses * 3;

  return (
    <div className="track-detail-page">

      <h1 className="page-title">
        🌿 Balanced Lifestyle & Investing
      </h1>

      <div className="track-overview">
        <p>
          This path focuses on creating a healthy balance
          between enjoying your lifestyle today and
          building wealth for the future.
        </p>
      </div>

      <div className="track-grid">

        <div className="info-tile">
          <h3>Monthly Income</h3>
          <p>R{userData.income.toLocaleString()}</p>
        </div>

        <div className="info-tile">
          <h3>Total Expenses</h3>
          <p>R{totalExpenses.toLocaleString()}</p>
        </div>

        <div className="info-tile">
          <h3>Savings Rate</h3>
          <p>{savingsRate.toFixed(1)}%</p>
        </div>

        <div className="info-tile">
          <h3>Emergency Fund Goal</h3>
          <p>R{emergencyFund.toLocaleString()}</p>
        </div>

      </div>

      <div className="recommendation">
        <h3>Recommended Next Step</h3>

        <p>
          {savingsRate < 10
            ? "Increase your savings rate above 10%."
            : "You are building a strong financial foundation."}
        </p>
      </div>

    </div>
  );
}

export default LifestyleTrack;