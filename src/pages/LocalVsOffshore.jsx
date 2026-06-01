import { useState } from "react";
import "../styles/Simulation.css";
import { localVsOffshoreSimulation } from "../utils/simulationCalculations";

function LocalVsOffshore() {
  const [amount, setAmount] = useState(100000);
  const [result, setResult] = useState(null);

  function runSimulation() {
    setResult(
      localVsOffshoreSimulation(
        Number(amount)
      )
    );
  }

  return (
    <div className="simulation-page">
      <h1 className="page-title">
        Local vs Offshore
      </h1>

      <div className="studio-container">

        <div className="studio-side">
          <h3>JSE Investment</h3>

          {result && (
            <div className="output">
              R{result.localValue}
            </div>
          )}
        </div>

        <div className="studio-center">

          <input
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <button onClick={runSimulation}>
            Run Simulation
          </button>

        </div>

        <div className="studio-side">
          <h3>Offshore ETF</h3>

          {result && (
            <div className="output">
              R{result.offshoreValue}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default LocalVsOffshore;