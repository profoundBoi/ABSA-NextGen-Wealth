import { useState } from "react";
import "../styles/Simulation.css";
import { localVsOffshoreSimulation } from "../utils/simulationCalculations";

function LocalVsOffshore() {
  const [investment, setInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [years, setYears] = useState("");
  const [randDepreciation, setRandDepreciation] = useState("");

  const [result, setResult] = useState(null);

  function runSimulation() {
    setResult(
      localVsOffshoreSimulation(
        Number(investment),
        Number(monthlyContribution),
        Number(years),
        Number(randDepreciation)
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
          Local vs Offshore Investing
        </h1>

      <div className="simulation-intro">
        <h2>Investment Diversification Planner</h2>

        <p>
          Compare the potential growth of investing
          locally versus offshore using realistic
          South African assumptions.
        </p>

        <div className="intro-highlight">
          💡 Offshore investments may benefit from
          global market growth and a weakening rand,
          while local investments provide exposure to
          South African companies and assets.
        </div>
      </div>

      <div className="studio-container">

        <div className="studio-side">
          <h3>Local Investment</h3>

          {result && (
            <>
              <div className="output">
                Final Value
                <br />
                R{result.localValue.toLocaleString()}
              </div>
            </>
          )}
        </div>

        <div className="studio-center">

  <h3>Inputs</h3>

  <div className="input-group">
    <label>Initial Investment (R)</label>
    <input
      type="number"
      value={investment}
      placeholder="e.g. 100000"
      onChange={(e) =>
        setInvestment(e.target.value)
      }
    />
    <small>
      The amount you already have available to invest.
    </small>
  </div>

  <div className="input-group">
    <label>Monthly Contribution (R)</label>
    <input
      type="number"
      value={monthlyContribution}
      placeholder="e.g. 2000"
      onChange={(e) =>
        setMonthlyContribution(e.target.value)
      }
    />
    <small>
      The amount you plan to invest every month.
    </small>
  </div>

  <div className="input-group">
    <label>Investment Period (Years)</label>
    <input
      type="number"
      value={years}
      placeholder="e.g. 10"
      onChange={(e) =>
        setYears(e.target.value)
      }
    />
    <small>
      How long you plan to keep the investment.
    </small>
  </div>

  <div className="input-group">
    <label>Expected Rand Depreciation (%)</label>
    <input
      type="number"
      value={randDepreciation}
      placeholder="e.g. 4"
      onChange={(e) =>
        setRandDepreciation(e.target.value)
      }
    />
    <small>
      Estimated annual weakening of the Rand against major currencies.
    </small>
  </div>

  <button onClick={runSimulation}>
    Run Simulation
  </button>

</div>

        <div className="studio-side">
          <h3>Offshore Investment</h3>

          {result && (
            <>
              <div className="output">
                Final Value
                <br />
                R{result.offshoreValue.toLocaleString()}
              </div>

              <div className="output">
                Difference
                <br />
                R{result.difference.toLocaleString()}
              </div>
            </>
          )}
        </div>

      </div>

      {result && (
        <>
          <div className="pill">
            {result.recommendation}
          </div>

          <div className="pill">
            {result.suggestedAllocation}
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default LocalVsOffshore;