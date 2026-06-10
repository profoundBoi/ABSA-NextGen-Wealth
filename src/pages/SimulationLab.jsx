import { Link } from "react-router-dom";
import "../styles/Simulation.css";

function SimulationLab() {
  return (
    <div className="simulation-page">
      <div className="mesh-bg">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-grid" />
      </div>

      <div className="simulation-content">
        <h1 className="page-title">Simulation Lab</h1>

      <div className="simulation-intro">
        <h2>Test Your Financial Decisions</h2>

        <p>
          The Simulation Lab allows you to experiment with real-world financial
          choices and see their long-term impact before committing in real life.
        </p>

        <div className="intro-highlight">
          💡 Adjust inputs, compare scenarios, and understand trade-offs in a
          South African financial context.
        </div>
      </div>

      <div className="simulation-cards">

        <div className="sim-card">
          <div className="icon">📍</div>

          <h3>Rent vs Buy</h3>

          <p>
            Explore whether renting or buying property in Johannesburg makes
            more financial sense based on your income, deposit, and interest rates.
          </p>

          <Link to="/simulation/property">
            <button>Start Simulation</button>
          </Link>
        </div>

        <div className="sim-card">
          <div className="icon">🚗</div>

          <h3>Car vs Invest</h3>

          <p>
            Compare the long-term impact of buying a car versus investing that
            money. See how opportunity cost affects your wealth over 5 years.
          </p>

          <Link to="/simulation/car">
            <button>Start Simulation</button>
          </Link>
        </div>

        <div className="sim-card">
          <div className="icon">📈</div>

          <h3>Local vs Offshore</h3>

          <p>
            Simulate how investing locally vs offshore can impact your returns,
            considering exchange rates and global market growth.
          </p>

          <Link to="/simulation/invest">
            <button>Start Simulation</button>
          </Link>
        </div>

      </div>
      </div>
    </div>
  );
}

export default SimulationLab;