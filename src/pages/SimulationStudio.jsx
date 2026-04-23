import { useState } from "react";
import "../styles/Simulation.css";

function SimulationStudio() {
  const [salary, setSalary] = useState();
  const [housePrice, setHousePrice] = useState();
  const [interest, setInterest] = useState();
  const [rent, setRent] = useState();

  const [result, setResult] = useState(null);

  function runSimulation() {
    // BUYING
    const bond = housePrice * (1 + interest);
    const monthlyBond = bond / 240; 

    const buyingTotal = monthlyBond * 60; 
    const buyingWealth = housePrice * 1.1; 

    // RENTING
    const rentingTotal = rent * 60;
    const investSavings = (monthlyBond - rent) * 60 * 1.1;

    setResult({
      buyingTotal: Math.round(buyingTotal),
      buyingWealth: Math.round(buyingWealth),
      rentingTotal: Math.round(rentingTotal),
      investingWealth: Math.round(investSavings),
      monthlyBond: Math.round(monthlyBond),
    });
  }

  return (
    <div className="simulation-page">

      <h1 className="page-title">Buy vs Rent Simulation</h1>

      <div className="studio-container">

        {/* BUYING */}
        <div className="studio-side">
          <h3>Buying</h3>

          {result && (
            <>
              <div className="output">Total payments: R{result.buyingTotal}</div>
              <div className="output">Wealth after 5 yrs: R{result.buyingWealth}</div>
            </>
          )}

          <div className="pill">Monthly affordability breakdown</div>
        </div>

        {/* INPUT */}
        <div className="studio-center">

          <h3>Input</h3>

          <input
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <input
            placeholder="House Price"
            value={housePrice}
            onChange={(e) => setHousePrice(e.target.value)}
          />

          <input
            placeholder="Interest Rate"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />

          <input
            placeholder="Rent p/m"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />

          <button onClick={runSimulation}>Run</button>

        </div>

        {/* RENTING */}
        <div className="studio-side">
          <h3>Renting</h3>

          {result && (
            <>
              <div className="output">Total payments: R{result.rentingTotal}</div>
              <div className="output">Wealth after 5 yrs: R{result.investingWealth}</div>
            </>
          )}

          <div className="pill">Monthly affordability breakdown</div>
        </div>

      </div>

    </div>
  );
}

export default SimulationStudio;