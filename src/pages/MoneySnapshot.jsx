import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/MoneySnapshot.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function MoneySnapshot() {
  const { userData, setUserData } = useContext(UserContext);

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: Number(e.target.value),
    });
  }

  const totalExpenses =
    userData.rent + userData.car + userData.expenses;

  const netIncome = userData.income - totalExpenses;

  const tax = userData.income * 0.18;
  const afterTax = userData.income - tax;

  const savingsProgress =
    (userData.currentSavings / userData.savingsGoal) * 100;

  const chartData = [
    { name: "Rent", value: userData.rent },
    { name: "Car", value: userData.car },
    { name: "Living", value: userData.expenses },
    { name: "Savings", value: userData.currentSavings },
  ];

  const COLORS = ["#4f7df3", "#9c7bd9", "#e6b15c", "#f2d85c"];

  return (
    <div className="snapshot-page">
      <h1 className="page-title">Money Snapshot</h1>

  
      <div className="page-description">
        <p>
          Your Money Snapshot gives you a clear overview of your financial
          situation. By entering your income, expenses, and savings, you can
          understand where your money goes each month and how much you are
          able to save or invest.
        </p>

        <p>
          This tool is designed for South African professionals, including
          estimated tax (PAYE), living costs, and savings behaviour to help
          you make smarter financial decisions.
        </p>
      </div>

      <div className="top-section">

        <div className="input-card">

          <h3>Enter Your Financial Details</h3>

          {[
            ["income", "Monthly Income", "Gross income before tax"],
            ["rent", "Rent / Bond", "Housing cost"],
            ["car", "Car Payment", "Vehicle costs"],
            ["expenses", "Living Expenses", "Food, utilities"],
            ["savingsGoal", "Savings Goal", "Target amount"],
            ["currentSavings", "Current Savings", "Saved so far"],
          ].map(([name, label, desc]) => (
            <div className="input-group" key={name}>
              <label>{label} (R)</label>
              <input
                name={name}
                value={userData[name]}
                onChange={handleChange}
              />
              <small>{desc}</small>
            </div>
          ))}

        </div>

        <div className="chart-container">
          <PieChart width={350} height={350}>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
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
          <p>R{userData.income}</p>
        </div>

        <div className="tile">
          <h4>Expenses</h4>
          <p>R{totalExpenses}</p>
        </div>

        <div className="tile">
          <h4>Net</h4>
          <p>R{netIncome}</p>
        </div>

        <div className="tile">
          <h4>After Tax</h4>
          <p>R{afterTax}</p>
        </div>

      </div>

    </div>
  );
}

export default MoneySnapshot;