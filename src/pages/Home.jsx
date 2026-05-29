import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Home.css";
import { calculatePAYE } from "../utils/calculations";

function Home() {
  const { userData } = useContext(UserContext);

  const totalExpenses =
  userData.rent + userData.car + userData.expenses;

  const tax = calculatePAYE(userData.income);

  const afterTaxIncome =
  userData.income - tax;

  const netIncome =
  afterTaxIncome - totalExpenses;

  const savingsRate =
  userData.income > 0
    ? (userData.currentSavings / userData.income) * 100
    : 0;

  const savingsProgress =
  userData.savingsGoal > 0
    ? (userData.currentSavings / userData.savingsGoal) * 100
    : 0;

  const emergencyFundTarget = totalExpenses * 3;

  const emergencyProgress =
  emergencyFundTarget > 0
    ? (userData.currentSavings / emergencyFundTarget) * 100
    : 0;

  const hasEmergencyFund = userData.currentSavings > 0;

  return (
    <div className="home">

<div className="home-header">
  <div className="page-description">
    <h1>Welcome 👋</h1>

    <p>
      This is your financial control centre. Here you can track your income,
      expenses, savings progress, and emergency fund in real time.
    </p>

    <p>
      Use the <strong>Dashboard</strong> for your overview, explore
      <strong> Moneysnapshot</strong> for detailed breakdowns,
      build strategies in <strong>Strategy Tracks</strong>, and test decisions
      in the <strong>Simulation Lab</strong>.
    </p>
  </div>
</div>

      <div className="top-section">

        <div className="profile-card">
          <div className="profile-circle"></div>
        </div>

        <div className="notifications">
          <h3>Notifications</h3>

          {netIncome < 0 && (
            <div className="notification warning">
              ⚠️ You are overspending
            </div>
          )}

          {userData.rent > userData.income * 0.3 && (
            <div className="notification warning">
              ⚠️ Housing costs too high
            </div>
          )}
          

          {!hasEmergencyFund && (
            <div className="notification warning">
              ⚠️ Start building an emergency fund
            </div>
          )}
        </div>

        

      </div>


      <div className="stats-grid">

        <div className="stat-card">
          <h4>Monthly Income</h4>
          <p>R{userData.income}</p>
        </div>

        <div className="stat-card">
         <h4>Estimated PAYE</h4>
         <p>R{Math.round(tax).toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h4>Expenses</h4>
          <p>R{totalExpenses}</p>
        </div>

        <div className="stat-card">
          <h4>Saving Rate</h4>
          <p>{Math.round(savingsRate)}%</p>
        </div>

        <div className="stat-card">
          <h4>Net Income</h4>
          <p>R{Math.round(netIncome).toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h4>Emergency Fund</h4>
          <p>Target: R{emergencyFundTarget}</p>

          <div className="mini-bar">
            <div style={{ width: `${emergencyProgress}%` }}></div>
          </div>

          <small>{Math.round(emergencyProgress)}% funded</small>
        </div>

        <div className="stat-card">
        <h4>Savings Goal</h4>
         <div className="mini-bar">
          <div style={{ width: `${Math.min(savingsProgress, 100)}%` }}></div>
         </div>
          <small>{Math.round(savingsProgress)}%</small>
        </div>

      </div>


      <div className="info-tile">
        <h3>What is an Emergency Fund?</h3>
        <p>
          An emergency fund covers 3–6 months of expenses. It protects you
          from unexpected financial shocks like job loss or emergencies.
        </p>
      </div>

    </div>
  );
}

export default Home;