import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Tracks.css";

function TrackDetails() {
  const { userData } = useContext(UserContext);

  const [milestones, setMilestones] = useState([
    { name: "Build Emergency Fund (3 months)", done: false },
    { name: "Start Investing (TFSA / ETF)", done: false },
    { name: "Reduce High-Interest Debt", done: false },
    { name: "Increase Savings Rate to 20%", done: false },
  ]);

  function toggleMilestone(index) {
    const updated = [...milestones];
    updated[index].done = !updated[index].done;
    setMilestones(updated);
  }


  const totalExpenses =
    userData.rent + userData.car + userData.expenses;

  const savingsRate =
    (userData.currentSavings / userData.income);


  const completed = milestones.filter(m => m.done).length;
  const progress = (completed / milestones.length) * 100;


  let recommendation = "";

  if (totalExpenses > userData.income * 0.7) {
    recommendation = "⚠️ Your expenses are too high. Reduce spending.";
  } else if (savingsRate < 0.1) {
    recommendation = "⚠️ Increase your savings rate to at least 10%.";
  } else {
    recommendation = "✅ You are on a balanced financial path.";
  }

  return (
    <div className="track-detail-page">

      <h1 className="page-title">Balanced Lifestyle & Investing</h1>


      <div className="track-overview">
        <p>
          This track helps you balance lifestyle and investing in your first 5 years.
        </p>
      </div>


      <div className="progress-section">
        <h3>Track Progress</h3>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p>{Math.round(progress)}% complete</p>
      </div>


      <div className="milestones">
        <h3>Milestones</h3>

        {milestones.map((item, index) => (
          <div
            key={index}
            className={`milestone ${item.done ? "done" : ""}`}
            onClick={() => toggleMilestone(index)}
          >
            {item.done ? "✅" : "⬜"} {item.name}
          </div>
        ))}
      </div>


      <div className="recommendation">
        <h3>Personal Recommendation</h3>
        <p>{recommendation}</p>
      </div>


      <div className="info-tile">
        <h3>Why this track works</h3>
        <p>
          In South Africa, balancing spending and investing early helps build long-term stability.
        </p>
      </div>

    </div>
  );
}

export default TrackDetails;