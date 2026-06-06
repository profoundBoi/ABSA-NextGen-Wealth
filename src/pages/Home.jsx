import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Home.css";
import { calculatePAYE } from "../utils/calculations";

function Home() {
  const { userData } = useContext(UserContext);

  const income = Number(userData.income) || 0;
  const rent = Number(userData.rent) || 0;
  const car = Number(userData.car) || 0;
  const expenses = Number(userData.expenses) || 0;
  const currentSavings = Number(userData.currentSavings) || 0;
  const savingsGoal = Number(userData.savingsGoal) || 0;

  const totalExpenses = rent + car + expenses;
  const tax = calculatePAYE(income);
  const afterTaxIncome = income - tax;
  const netIncome = afterTaxIncome - totalExpenses;

  const savingsRate = income > 0 ? (currentSavings / income) * 100 : 0;
  const savingsProgress = savingsGoal > 0 ? (currentSavings / savingsGoal) * 100 : 0;
  const emergencyFundTarget = totalExpenses * 3;
  const emergencyProgress =
    emergencyFundTarget > 0 ? (currentSavings / emergencyFundTarget) * 100 : 0;
  const hasEmergencyFund = currentSavings > 0;

  const notifications = [
    netIncome < 0 && { type: "danger", icon: "↓", text: "Your expenses exceed your after-tax income" },
    rent > income * 0.3 && income > 0 && { type: "warning", icon: "⌂", text: "Housing costs exceed 30% of gross income" },
    !hasEmergencyFund && { type: "info", icon: "!", text: "No emergency fund detected, start building one" },
  ].filter(Boolean);

  return (
    <div className="home">

      <div className="mesh-bg">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-grid" />
      </div>

      <div className="home-content">

        <header className="home-header">
          <div className="header-left">
            <h1 className="header-title">Dashboard</h1>
            <p className="header-sub">
              Your income, tax, expenses and savings all in one place.
            </p>
          </div>

          <div className="header-right">
            <div className="profile-badge">
              <div className="profile-avatar">
                <span>JD</span>
              </div>
              <div className="profile-info">
                <p className="profile-name">Account Holder</p>
                <p className="profile-status">
                  <span className="status-dot" />
                  Active
                </p>
              </div>
            </div>
          </div>
        </header>

        {notifications.length > 0 && (
          <div className="notifications-strip">
            {notifications.map((n, i) => (
              <div key={i} className={`notif-pill notif-${n.type}`}>
                <span className="notif-icon">{n.icon}</span>
                {n.text}
              </div>
            ))}
          </div>
        )}

        <section className="section">
          <p className="section-label">Key Figures</p>

          <div className="primary-grid">

            <div className="metric-card metric-featured">
              <div className="metric-tag">Monthly Income</div>
              <div className="metric-value">R{income.toLocaleString()}</div>
              <div className="metric-sub">Gross, before tax</div>
              <div className="metric-bar-track">
                <div className="metric-bar-fill" style={{ width: "100%" }} />
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-tag">After Tax Income</div>
              <div className="metric-value">R{Math.round(afterTaxIncome).toLocaleString()}</div>
              <div className="metric-sub">Take-home pay</div>
            </div>

            <div className="metric-card">
              <div className="metric-tag">Estimated PAYE</div>
              <div className="metric-value accent-red">R{Math.round(tax).toLocaleString()}</div>
              <div className="metric-sub">Monthly tax deduction</div>
            </div>

            <div className={`metric-card ${netIncome < 0 ? "metric-danger" : "metric-positive"}`}>
              <div className="metric-tag">Net Income</div>
              <div className="metric-value">R{Math.round(netIncome).toLocaleString()}</div>
              <div className="metric-sub">
                {netIncome >= 0 ? "After all expenses" : "You are overspending"}
              </div>
            </div>

          </div>
        </section>

        <section className="section two-col">

          <div className="panel">
            <p className="section-label">Spending</p>

            <div className="spend-breakdown">
              <div className="spend-row">
                <div className="spend-label">
                  <span className="spend-dot dot-red" />
                  Rent / Bond
                </div>
                <span className="spend-amount">R{rent.toLocaleString()}</span>
              </div>

              <div className="spend-row">
                <div className="spend-label">
                  <span className="spend-dot dot-amber" />
                  Car Payment
                </div>
                <span className="spend-amount">R{car.toLocaleString()}</span>
              </div>

              <div className="spend-row">
                <div className="spend-label">
                  <span className="spend-dot dot-teal" />
                  Living Expenses
                </div>
                <span className="spend-amount">R{expenses.toLocaleString()}</span>
              </div>

              <div className="spend-divider" />

              <div className="spend-row spend-total">
                <span>Total</span>
                <span>R{totalExpenses.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <p className="section-label">Savings</p>

            <div className="savings-stat">
              <span className="savings-big">{Math.round(savingsRate)}%</span>
              <span className="savings-label">Savings rate</span>
            </div>

            <div className="progress-group">
              <div className="progress-header">
                <span>Savings Goal</span>
                <span>R{currentSavings.toLocaleString()} / R{savingsGoal.toLocaleString()}</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(savingsProgress, 100)}%` }}
                />
              </div>
              <div className="progress-pct">{Math.round(savingsProgress)}% complete</div>
            </div>
          </div>

        </section>

        <section className="section">
          <p className="section-label">Emergency Fund</p>

          <div className="emergency-panel">
            <div className="emergency-left">
              <p className="emergency-title">3-Month Expense Buffer</p>
              <p className="emergency-desc">
                Financial advisors recommend holding 3-6 months of expenses in an accessible
                emergency fund. This protects you from unexpected job loss, medical costs, or
                large repairs.
              </p>
            </div>

            <div className="emergency-right">
              <div className="emergency-amounts">
                <span className="e-current">R{currentSavings.toLocaleString()}</span>
                <span className="e-sep">/</span>
                <span className="e-target">R{Math.round(emergencyFundTarget).toLocaleString()}</span>
              </div>

              <div className="emergency-track">
                <div
                  className="emergency-fill"
                  style={{ width: `${Math.min(emergencyProgress, 100)}%` }}
                />
              </div>

              <p className="emergency-pct">{Math.round(emergencyProgress)}% funded</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;
