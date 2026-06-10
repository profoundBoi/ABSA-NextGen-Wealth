import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Tracks.css";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { calculateBondRepayment } from "../utils/simulationCalculations";

function PropertyTrack() {
  const { userData } = useContext(UserContext);

  const income         = Number(userData.income) || 0;
  const rent           = Number(userData.rent) || 0;
  const currentSavings = Number(userData.currentSavings) || 0;

  const estimatedPropertyValue = income * 24;
  const depositGoal    = estimatedPropertyValue * 0.10;
  const readiness      = depositGoal > 0 ? Math.min((currentSavings / depositGoal) * 100, 100) : 0;
  const remaining      = Math.max(depositGoal - currentSavings, 0);

  // How many months to reach deposit if saving 20% of income
  const monthlySaving  = income * 0.20;
  const monthsToGoal   = monthlySaving > 0 && remaining > 0 ? Math.ceil(remaining / monthlySaving) : 0;
  const yearsToGoal    = Math.floor(monthsToGoal / 12);
  const leftoverMonths = monthsToGoal % 12;

  // Bond repayment estimate on 90% of property value at 11.5% over 20 years
  const loanAmount     = estimatedPropertyValue * 0.90;
  const monthlyBond    = income > 0 ? calculateBondRepayment(loanAmount, 11.5, 20) : 0;
  const affordability  = income > 0 ? (monthlyBond / income) * 100 : 0;

  // Savings growth chart — project current savings + 20% monthly over 5 years
  const savingsChartData = Array.from({ length: 61 }, (_, i) => {
    const value = currentSavings + monthlySaving * i;
    return {
      month: i,
      savings: Math.round(value),
      target: Math.round(depositGoal),
    };
  });

  const [milestones, setMilestones] = useState([
    { label: "Save 10% deposit for target property", done: false },
    { label: "Check your credit score (TransUnion / Experian)", done: false },
    { label: "Reduce all short-term debt", done: false },
    { label: "Get a pre-qualification from a bond originator", done: false },
    { label: "Research areas and average property prices", done: false },
    { label: "Compare bond rates across SA banks", done: false },
  ]);

  function toggle(i) {
    const updated = [...milestones];
    updated[i].done = !updated[i].done;
    setMilestones(updated);
  }

  const completed = milestones.filter(m => m.done).length;
  const progress  = (completed / milestones.length) * 100;

  return (
    <div className="tracks-page">
      <div className="mesh-bg">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-grid" />
      </div>

      <div className="tracks-content">

        {/* HEADER */}
        <div className="tracks-header">
          <p className="track-eyebrow">Strategy Track</p>
          <h1 className="page-title">🏠 First Property Path</h1>
          <p className="page-description">
            Prepare financially for your first property purchase in South Africa.
            Track your deposit progress, understand bond affordability, and follow
            a clear path to homeownership.
          </p>
        </div>

        {/* KEY METRICS */}
        <div className="track-grid" style={{ marginBottom: 16 }}>
          <div className="track-metric-card">
            <div className="track-metric-tag">Estimated Property Value</div>
            <div className="track-metric-value">R{Math.round(estimatedPropertyValue).toLocaleString()}</div>
          </div>
          <div className="track-metric-card">
            <div className="track-metric-tag">10% Deposit Target</div>
            <div className="track-metric-value">R{Math.round(depositGoal).toLocaleString()}</div>
          </div>
          <div className="track-metric-card">
            <div className="track-metric-tag">Current Savings</div>
            <div className="track-metric-value">R{currentSavings.toLocaleString()}</div>
          </div>
          <div className="track-metric-card track-metric-accent">
            <div className="track-metric-tag">Property Readiness</div>
            <div className="track-metric-value" style={{ color: readiness >= 100 ? "#2aa89a" : readiness >= 50 ? "#d4862a" : "#e8193d" }}>
              {readiness.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* DEPOSIT PROGRESS */}
        <div className="track-progress-panel" style={{ marginBottom: 16 }}>
          <div className="track-progress-header">
            <span>Deposit Progress</span>
            <span>R{currentSavings.toLocaleString()} / R{Math.round(depositGoal).toLocaleString()}</span>
          </div>
          <div className="track-progress-track">
            <div className="track-progress-fill" style={{ width: `${readiness}%` }} />
          </div>
          <p className="track-progress-sub">
            {remaining > 0
              ? `R${Math.round(remaining).toLocaleString()} still needed${monthsToGoal > 0 ? ` — at 20% savings rate: ${yearsToGoal > 0 ? `${yearsToGoal}yr ` : ""}${leftoverMonths > 0 ? `${leftoverMonths}mo` : ""}` : ""}`
              : "Deposit target reached — you may be ready to apply!"}
          </p>
        </div>

        {/* CHARTS ROW */}
        <div className="two-panel-row">

          {/* SAVINGS GROWTH CHART */}
          <div className="track-panel">
            <p className="panel-label">Savings Growth Projection</p>
            <p className="panel-sub">Based on saving 20% of your income monthly</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={savingsChartData}>
                <defs>
                  <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2aa89a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2aa89a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c0002f" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#c0002f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#4d6b66", fontSize: 10, fontFamily: "Montserrat" }} axisLine={false} tickLine={false} tickFormatter={v => v % 12 === 0 ? `Yr ${v/12}` : ""} />
                <YAxis tick={{ fill: "#4d6b66", fontSize: 10, fontFamily: "Montserrat" }} axisLine={false} tickLine={false} tickFormatter={v => `R${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#060d12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontFamily: "Montserrat", fontSize: 12, color: "#f0f4f3" }}
                  formatter={v => [`R${Number(v).toLocaleString()}`, ""]}
                  labelFormatter={l => `Month ${l}`}
                />
                <Area type="monotone" dataKey="target" stroke="#c0002f" strokeDasharray="4 4" strokeWidth={1.5} fill="url(#targetGrad)" name="Deposit Target" />
                <Area type="monotone" dataKey="savings" stroke="#2aa89a" strokeWidth={2} fill="url(#savingsGrad)" name="Your Savings" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* BOND AFFORDABILITY */}
          <div className="track-panel">
            <p className="panel-label">Bond Affordability Estimate</p>
            <p className="panel-sub">Based on 90% bond at 11.5% over 20 years</p>

            <div className="afford-row">
              <div className="afford-item">
                <span className="afford-label">Estimated Bond Repayment</span>
                <span className="afford-value">R{Math.round(monthlyBond).toLocaleString()}/mo</span>
              </div>
              <div className="afford-item">
                <span className="afford-label">As % of Gross Income</span>
                <span className="afford-value" style={{ color: affordability > 35 ? "#e8193d" : affordability > 30 ? "#d4862a" : "#2aa89a" }}>
                  {affordability.toFixed(1)}%
                </span>
              </div>
              <div className="afford-item">
                <span className="afford-label">Rent vs Bond</span>
                <span className="afford-value" style={{ color: rent < monthlyBond ? "#d4862a" : "#2aa89a" }}>
                  {rent < monthlyBond ? "Bond costs more than rent" : "Bond cheaper than rent"}
                </span>
              </div>
            </div>

            <div className="afford-bar-section">
              <div className="afford-bar-header">
                <span>Affordability</span>
                <span style={{ color: affordability > 35 ? "#e8193d" : "#2aa89a" }}>
                  {affordability > 35 ? "High risk" : affordability > 30 ? "Borderline" : "Affordable"}
                </span>
              </div>
              <div className="track-progress-track">
                <div className="track-progress-fill" style={{ width: `${Math.min(affordability / 40 * 100, 100)}%`, background: affordability > 35 ? "#c0002f" : affordability > 30 ? "#d4862a" : "#2aa89a" }} />
              </div>
              <p className="track-progress-sub">SA banks recommend keeping bond repayments below 30% of gross income</p>
            </div>
          </div>

        </div>

        {/* MILESTONES */}
        <div className="track-panel" style={{ marginBottom: 16 }}>
          <p className="panel-label">Property Readiness Checklist</p>
          <div className="milestone-progress-row">
            <div className="milestone-pct">{completed}/{milestones.length} complete</div>
            <div className="milestone-bar-track">
              <div className="milestone-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="milestones">
            {milestones.map((m, i) => (
              <div key={i} className={`milestone ${m.done ? "done" : ""}`} onClick={() => toggle(i)}>
                <span className="milestone-check">{m.done ? "✓" : ""}</span>
                {m.label}
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION TILES */}
        <div className="edu-grid">
          <div className="edu-tile">
            <p className="edu-title">Bond Originators</p>
            <p className="edu-body">Services like ooba and BetterBond submit your home loan application to multiple SA banks simultaneously, increasing your approval chances and negotiating the best interest rate.</p>
          </div>
          <div className="edu-tile">
            <p className="edu-title">Transfer Costs</p>
            <p className="edu-body">Beyond the deposit, budget for transfer duty (paid to SARS on properties over R1.1m), conveyancing attorney fees, and bond registration costs — typically 3–5% of the property value.</p>
          </div>
          <div className="edu-tile">
            <p className="edu-title">Credit Score Matters</p>
            <p className="edu-body">SA banks use your credit score to determine your bond interest rate. A score above 670 is considered good. Pay all accounts on time, reduce credit card balances, and avoid multiple credit applications.</p>
          </div>
        </div>

        {/* RECOMMENDATION */}
        <div className="recommendation-panel">
          <p className="rec-label">Recommended Next Step</p>
          <p className="rec-text">
            {readiness < 25
              ? "Focus on building your deposit savings first. Set up a dedicated savings account and automate a fixed monthly transfer. Avoid taking on new debt."
              : readiness < 75
              ? "Good progress on your deposit. Now focus on improving your credit score and reducing short-term debt to strengthen your bond application."
              : "You're close to your deposit goal. Get pre-qualified with a bond originator and start actively researching properties in your target area."}
          </p>
        </div>

      </div>
    </div>
  );
}

export default PropertyTrack;
