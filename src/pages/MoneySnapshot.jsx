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

  const totalExpenses =
    rent + car + expenses;

  const netIncome =
    income - totalExpenses;

  const tax =
    calculatePAYE(income);

  const afterTax =
    Math.max(income - tax, 0);

  const savingsProgress =
    savingsGoal > 0
      ? (currentSavings / savingsGoal) * 100
      : 0;

  const chartData = [
    { name: "Rent", value: rent },
    { name: "Car", value: car },
    { name: "Living", value: expenses },
    { name: "Savings", value: currentSavings },
  ];

  const COLORS = [
    "#4f7df3",
    "#9c7bd9",
    "#e6b15c",
    "#f2d85c",
  ];

  return (
    <div className="snapshot-page">
      <h1 className="page-title">
        Money Snapshot
      </h1>

      <div className="page-description">
        <p>
          Your Money Snapshot gives you a clear overview
          of your financial situation. By entering your
          income, expenses, and savings, you can
          understand where your money goes each month
          and how much you are able to save or invest.
        </p>

        <p>
          This tool is designed for South African
          professionals, including estimated tax (PAYE),
          living costs, and savings behaviour to help
          you make smarter financial decisions.
        </p>
      </div>

      <div className="top-section">

        <div className="input-card">
          <h3>Enter Your Financial Details</h3>

          <div className="input-group">
            <label>Monthly Income (R)</label>
            <input
              type="number"
              name="income"
              placeholder="e.g. 30000"
              value={userData.income}
              onChange={handleChange}
            />
            <small>Gross income before tax</small>
          </div>

          <div className="input-group">
            <label>Rent / Bond (R)</label>
            <input
              type="number"
              name="rent"
              placeholder="e.g. 8000"
              value={userData.rent}
              onChange={handleChange}
            />
            <small>Monthly housing cost</small>
          </div>

          <div className="input-group">
            <label>Car Payment (R)</label>
            <input
              type="number"
              name="car"
              placeholder="e.g. 5000"
              value={userData.car}
              onChange={handleChange}
            />
            <small>Vehicle repayment and transport</small>
          </div>

          <div className="input-group">
            <label>Living Expenses (R)</label>
            <input
              type="number"
              name="expenses"
              placeholder="e.g. 7000"
              value={userData.expenses}
              onChange={handleChange}
            />
            <small>Food, utilities and daily expenses</small>
          </div>

          <div className="input-group">
            <label>Savings Goal (R)</label>
            <input
              type="number"
              name="savingsGoal"
              placeholder="e.g. 50000"
              value={userData.savingsGoal}
              onChange={handleChange}
            />
            <small>Your target savings amount</small>
          </div>

          <div className="input-group">
            <label>Current Savings (R)</label>
            <input
              type="number"
              name="currentSavings"
              placeholder="e.g. 10000"
              value={userData.currentSavings}
              onChange={handleChange}
            />
            <small>Amount already saved</small>
          </div>
        </div>

        <div className="chart-container">
          <PieChart width={350} height={350}>
            <Pie
              data={chartData.filter(
                (item) => item.value > 0
              )}
              dataKey="value"
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </div>

      </div>

      <div className="tiles-section">

        <div className="tile">
          <h4>Income</h4>
          <p>
            {income > 0
              ? `R${income.toLocaleString()}`
              : "Not entered"}
          </p>
        </div>

        <div className="tile">
          <h4>Expenses</h4>
          <p>
            {totalExpenses > 0
              ? `R${totalExpenses.toLocaleString()}`
              : "Not entered"}
          </p>
        </div>

        <div className="tile">
          <h4>Net Income</h4>
          <p>
            {income > 0
              ? `R${netIncome.toLocaleString()}`
              : "Not entered"}
          </p>
        </div>

        <div className="tile">
          <h4>After Tax</h4>
          <p>
            {income > 0
              ? `R${Math.round(afterTax).toLocaleString()}`
              : "Not entered"}
          </p>
        </div>

        <div className="tile">
          <h4>Savings Progress</h4>
          <p>
            {savingsGoal > 0
              ? `${Math.round(savingsProgress)}%`
              : "No goal set"}
          </p>
        </div>

      </div>
    </div>
  );
}

export default MoneySnapshot;