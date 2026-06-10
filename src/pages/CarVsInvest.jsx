import { useState } from "react";
import "../styles/Simulation.css";
import { carVsInvestSimulation } from "../utils/simulationCalculations";

function CarVsInvest() {
  const [carPrice, setCarPrice] = useState(500000);
  const [insurance, setInsurance] = useState(1500);
  const [fuelMaintenance, setFuelMaintenance] = useState(3000);
  const [years, setYears] = useState(5);

  const [result, setResult] = useState(null);

  function runSimulation() {
    setResult(
      carVsInvestSimulation(
        Number(carPrice),
        Number(insurance),
        Number(fuelMaintenance),
        Number(years)
      )
    );
  }

  return (
    <div className="simulation-page">
      <div className="mesh-bg">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-grid" />
      </div>

      <div className="simulation-content">
        <h1 className="page-title">
          Car vs Invest Simulation
        </h1>

      <div className="simulation-intro">
        <h2>Vehicle Purchase Opportunity Cost</h2>

        <p>
          Compare buying a vehicle against investing the same money.
          This simulation uses vehicle depreciation and estimated
          investment growth to show the long-term financial impact.
        </p>

        <div className="intro-highlight">
          💡 Many South Africans underestimate the true cost of car
          ownership. Insurance, maintenance and depreciation can
          significantly affect long-term wealth.
        </div>
      </div>

      <div className="studio-container">

        <div className="studio-side">
          <h3>Buy The Car</h3>

          {result && (
            <>
              <div className="output">
                Car Value After {years} Years
                <br />
                R{result.carValue}
              </div>

              <div className="output">
                Running Costs
                <br />
                R{result.runningCosts}
              </div>

              <div className="output">
                Total Cost
                <br />
                R{result.totalCarCost}
              </div>
            </>
          )}
        </div>

       <div className="studio-center">

  <h3>Inputs</h3>

  <div className="input-group">
    <label>Vehicle Purchase Price (R)</label>
    <input
      type="number"
      value={carPrice}
      onChange={(e) =>
        setCarPrice(e.target.value)
      }
    />
    <small>
      The total purchase price of the vehicle.
    </small>
  </div>

  <div className="input-group">
    <label>Monthly Insurance (R)</label>
    <input
      type="number"
      value={insurance}
      onChange={(e) =>
        setInsurance(e.target.value)
      }
    />
    <small>
      Average monthly vehicle insurance premium.
    </small>
  </div>

  <div className="input-group">
    <label>Fuel & Maintenance Per Month (R)</label>
    <input
      type="number"
      value={fuelMaintenance}
      onChange={(e) =>
        setFuelMaintenance(e.target.value)
      }
    />
    <small>
      Estimated monthly fuel, servicing and maintenance costs.
    </small>
  </div>

  <div className="input-group">
    <label>Investment Period (Years)</label>
    <input
      type="number"
      value={years}
      onChange={(e) =>
        setYears(e.target.value)
      }
    />
    <small>
      How long you want to compare the two options.
    </small>
  </div>

  <button onClick={runSimulation}>
    Run Simulation
  </button>

</div>

        <div className="studio-side">
          <h3>Invest Instead</h3>

          {result && (
            <>
              <div className="output">
                Investment Value
                <br />
                R{result.investmentValue}
              </div>

              <div className="output">
                Wealth Difference
                <br />
                R{result.wealthDifference}
              </div>
            </>
          )}
        </div>

      </div>

      {result && (
        <div className="pill">
          {result.recommendation}
        </div>
      )}
      </div>
    </div>
  );
}

export default CarVsInvest;