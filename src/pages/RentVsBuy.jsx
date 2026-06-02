import { useState } from "react";
import "../styles/Simulation.css";
import { rentVsBuySimulation } from "../utils/simulationCalculations";

function RentVsBuy() {
  const [salary, setSalary] = useState(35000);
  const [housePrice, setHousePrice] = useState(1500000);
  const [deposit, setDeposit] = useState(150000);
  const [interest, setInterest] = useState(11);
  const [rent, setRent] = useState(12000);

  const [result, setResult] = useState(null);

  function runSimulation() {
    setResult(
      rentVsBuySimulation(
        Number(salary),
        Number(housePrice),
        Number(deposit),
        Number(interest),
        Number(rent)
      )
    );
  }

  return (
    <div className="simulation-page">
      <h1 className="page-title">
        Rent vs Buy Simulation
      </h1>

      <div className="simulation-intro">
        <h2>Property Decision Planner</h2>

        <p>
          Compare the financial impact of buying a property versus renting
          over a 5-year period using South African assumptions.
        </p>

        <div className="intro-highlight">
          💡 Includes bond repayments, maintenance, rates & taxes,
          affordability analysis, and property growth estimates.
        </div>
      </div>

      <div className="studio-container">

        <div className="studio-side">
          <h3>Buying Property</h3>

          {result && (
            <>
              <div className="output">
                Bond Repayment:
                <br />
                R{result.monthlyBond}/month
              </div>

              <div className="output">
                Ownership Cost:
                <br />
                R{result.monthlyOwnershipCost}/month
              </div>

              <div className="output">
                Affordability:
                <br />
                {result.affordability}%
              </div>

              <div className="output">
                5-Year Cost:
                <br />
                R{result.buyingCost5Years}
              </div>

              <div className="output">
                Property Value After 5 Years:
                <br />
                R{result.propertyValue5Years}
              </div>
            </>
          )}
        </div>

<div className="studio-center">
  <h3>Inputs</h3>

  <div className="input-group">
    <label>Monthly Salary (R)</label>
    <input
      type="number"
      value={salary}
      onChange={(e) =>
        setSalary(e.target.value)
      }
    />
    <small>Your gross monthly income before deductions.</small>
  </div>

  <div className="input-group">
    <label>Property Price (R)</label>
    <input
      type="number"
      value={housePrice}
      onChange={(e) =>
        setHousePrice(e.target.value)
      }
    />
    <small>The purchase price of the property.</small>
  </div>

  <div className="input-group">
    <label>Deposit (R)</label>
    <input
      type="number"
      value={deposit}
      onChange={(e) =>
        setDeposit(e.target.value)
      }
    />
    <small>The amount you can pay upfront.</small>
  </div>

  <div className="input-group">
    <label>Bond Interest Rate (%)</label>
    <input
      type="number"
      value={interest}
      onChange={(e) =>
        setInterest(e.target.value)
      }
    />
    <small>Current South African home loan interest rate.</small>
  </div>

  <div className="input-group">
    <label>Monthly Rent (R)</label>
    <input
      type="number"
      value={rent}
      onChange={(e) =>
        setRent(e.target.value)
      }
    />
    <small>The rent you'd pay for a similar property.</small>
  </div>

  <button onClick={runSimulation}>
    Run Simulation
  </button>
</div>

        <div className="studio-side">
          <h3>Renting</h3>

          {result && (
            <>
              <div className="output">
                Rent Cost Over 5 Years:
                <br />
                R{result.rentingCost5Years}
              </div>

              <div className="output">
                Potential Investment Value:
                <br />
                R{result.investedSavings}
              </div>
            </>
          )}
        </div>
      </div>

      {/* RECOMMENDATION */}
      {result && (
        <div className="pill">
          {result.recommendation}
        </div>
      )}
    </div>
  );
}

export default RentVsBuy;