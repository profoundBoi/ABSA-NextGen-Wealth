import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/MoneySnapshot.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { calculatePAYE } from "../utils/calculations";

function MoneySnapshot() {
  const { userData, setUserData } = useContext(UserContext);

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const income = Number(userData.income) || 0;
  const rent = Number(userData.rent) || 0;
  const car = Number(userData.car) || 0;
  const expenses = Number(userData.expenses) || 0;
  const savingsGoal = Number(userData.savingsGoal) || 0;
  const currentSavings = Number(userData.currentSavings) || 0;

  const totalExpenses = rent + car + expenses;
  const netIncome = income - totalExpenses;
  const tax = calculatePAYE(income);
  const afterTax = Math.max(income - tax, 0);
  const savingsProgress = savingsGoal > 0 ? (currentSavings / savingsGoal) * 100 : 0;

  const chartData = [
    { name: "Rent", value: rent },
    { name: "Car", value: car },
    { name: "Living", value: expenses },
    { name: "Savings", value: currentSavings },
  ];

  const COLORS = ["#c0002f", "#2aa89a", "#d4862a", "#4f7df3"];

  return (
    <div className="snapshot-page">

      <div className="mesh-bg">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-grid" />
      </div>

      <div className="snapshot-content">

        <div className="snapshot-header">
          <h1 className="page-title">Money Snapshot</h1>
          <p className="page-description">
            A clear overview of your monthly finances, income, expenses, tax and savings
            built for South African professionals.
          </p>
        </div>

        <div className="top-section">

          <div className="input-card">
            <p className="card-label">Your Financial Details</p>

            <div className="input-group">
              <label>Monthly Income (R)</label>
              <input type="number" name="income" placeholder="e.g. 30000" value={userData.income} onChange={handleChange} />
              <small>Gross income before tax</small>
            </div>

            <div className="input-group">
              <label>Rent / Bond (R)</label>
              <input type="number" name="rent" placeholder="e.g. 8000" value={userData.rent} onChange={handleChange} />
              <small>Monthly housing cost</small>
            </div>

            <div className="input-group">
              <label>Car Payment (R)</label>
              <input type="number" name="car" placeholder="e.g. 5000" value={userData.car} onChange={handleChange} />
              <small>Vehicle repayment and transport</small>
            </div>

            <div className="input-group">
              <label>Living Expenses (R)</label>
              <input type="number" name="expenses" placeholder="e.g. 7000" value={userData.expenses} onChange={handleChange} />
              <small>Food, utilities and daily expenses</small>
            </div>

            <div className="input-group">
              <label>Savings Goal (R)</label>
              <input type="number" name="savingsGoal" placeholder="e.g. 50000" value={userData.savingsGoal} onChange={handleChange} />
              <small>Your target savings amount</small>
            </div>

            <div className="input-group">
              <label>Current Savings (R)</label>
              <input type="number" name="currentSavings" placeholder="e.g. 10000" value={userData.currentSavings} onChange={handleChange} />
              <small>Amount already saved</small>
            </div>
          </div>

          <div className="chart-container">
            <p className="card-label">Expense Breakdown</p>
            <PieChart width={320} height={320}>
              <Pie
                data={chartData.filter((item) => item.value > 0)}
                dataKey="value"
                outerRadius={110}
                innerRadius={50}
                paddingAngle={3}
                label={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0c1a21",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  color: "#f0f4f3",
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontFamily: "Montserrat",
                  fontSize: "12px",
                  color: "#8fa8a3",
                }}
              />
            </PieChart>
          </div>

        </div>

        <div className="tiles-section">

          <div className="tile">
            <h4>Income</h4>
            <p>{income > 0 ? `R${income.toLocaleString()}` : "—"}</p>
          </div>

          <div className="tile">
            <h4>Total Expenses</h4>
            <p>{totalExpenses > 0 ? `R${totalExpenses.toLocaleString()}` : "—"}</p>
          </div>

          <div className="tile">
            <h4>After-Tax Income</h4>
            <p>{income > 0 ? `R${Math.round(afterTax).toLocaleString()}` : "—"}</p>
          </div>

          <div className="tile tile-accent">
            <h4>Net Income</h4>
            <p className={netIncome < 0 ? "tile-danger" : ""}>
              {income > 0 ? `R${Math.round(netIncome).toLocaleString()}` : "—"}
            </p>
          </div>

          <div className="tile">
            <h4>Savings Progress</h4>
            <p>{savingsGoal > 0 ? `${Math.round(savingsProgress)}%` : "—"}</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MoneySnapshot;
