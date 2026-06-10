import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Tracks.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadialBarChart, RadialBar
} from "recharts";

function LifestyleTrack() {
  const { userData } = useContext(UserContext);

  const income         = Number(userData.income) || 0;
  const rent           = Number(userData.rent) || 0;
  const car            = Number(userData.car) || 0;
  const expenses       = Number(userData.expenses) || 0;
  const currentSavings = Number(userData.currentSavings) || 0;

  const totalExpenses  = rent + car + expenses;
  const savingsRate    = income > 0 ? (currentSavings / income) * 100 : 0;
  const emergencyFund  = totalExpenses * 3;
  const emergencyPct   = emergencyFund > 0 ? Math.min((currentSavings / emergencyFund) * 100, 100) : 0;
  const afterTaxApprox = income * 0.75;
  const discretionary  = Math.max(afterTaxApprox - totalExpenses, 0);

  const spendData = [
    { name: "Rent", value: rent, color: "#c0002f" },
    { name: "Car", value: car, color: "#d4862a" },
    { name: "Living", value: expenses, color: "#2aa89a" },
    { name: "Savings", value: currentSavings, color: "#4f7df3" },
  ].filter(d => d.value > 0);

  const savingsGaugeData = [
    { name: "Rate", value: Math.min(savingsRate, 100), fill: savingsRate >= 20 ? "#2aa89a" : savingsRate >= 10 ? "#d4862a" : "#c0002f" }
  ];

  const [milestones, setMilestones] = useState([
    { label: "Open a Tax-Free Savings Account (TFSA)", done: false },
    { label: "Build a 3-month emergency fund", done: false },
    { label: "Keep housing costs below 30% of income", done: false },
    { label: "Achieve a 10% savings rate", done: false },
    { label: "Start a monthly ETF contribution", done: false },
    { label: "Review and cut unnecessary subscriptions", done: false },
  ]);

  function toggle(i) {
    const updated = [...milestones];
    updated[i].done = !updated[i].done;
    setMilestones(updated);
  }

  const completed = milestones.filter(m => m.done).length;
  const progress  = (completed / milestones.length) * 100;

  const rules = [
    { label: "Housing", pct: income > 0 ? (rent / income) * 100 : 0, cap: 30, color: "#c0002f" },
    { label: "Transport", pct: income > 0 ? (car / income) * 100 : 0, cap: 15, color: "#d4862a" },
    { label: "Living", pct: income > 0 ? (expenses / income) * 100 : 0, cap: 30, color: "#2aa89a" },
    { label: "Savings", pct: income > 0 ? (currentSavings / income) * 100 : 0, cap: 20, color: "#4f7df3" },
  ];

  return (
    <div className="tracks-page">
      <div className="mesh-bg">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-grid" />
      </div>

      <div className="tracks-content">

        <div className="tracks-header">
          <p className="track-eyebrow">Strategy Track</p>
          <h1 className="page-title">🌿 Balanced Lifestyle & Investing</h1>
          <p className="page-description">
            This path focuses on creating a healthy balance between enjoying your lifestyle
            today and building long-term wealth. Designed for South Africans who want
            financial stability without sacrificing quality of life.
          </p>
        </div>

        <div className="track-grid" style={{ marginBottom: 16 }}>
          <div className="track-metric-card">
            <div className="track-metric-tag">Monthly Income</div>
            <div className="track-metric-value">R{income.toLocaleString()}</div>
          </div>
          <div className="track-metric-card">
            <div className="track-metric-tag">Total Expenses</div>
            <div className="track-metric-value">R{totalExpenses.toLocaleString()}</div>
          </div>
          <div className="track-metric-card">
            <div className="track-metric-tag">Savings Rate</div>
            <div className="track-metric-value" style={{ color: savingsRate >= 10 ? "#2aa89a" : "#e8193d" }}>
              {savingsRate.toFixed(1)}%
            </div>
          </div>
          <div className="track-metric-card">
            <div className="track-metric-tag">Discretionary Income</div>
            <div className="track-metric-value">R{Math.round(discretionary).toLocaleString()}</div>
          </div>
        </div>

        <div className="two-panel-row">

          <div className="track-panel">
            <p className="panel-label">Monthly Spending Breakdown</p>
            {spendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={spendData} barSize={36}>
                  <XAxis dataKey="name" tick={{ fill: "#4d6b66", fontSize: 11, fontFamily: "Montserrat", fontWeight: 700 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#4d6b66", fontSize: 11, fontFamily: "Montserrat" }} axisLine={false} tickLine={false} tickFormatter={v => `R${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#060d12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontFamily: "Montserrat", fontSize: 12, color: "#f0f4f3" }}
                    formatter={v => [`R${Number(v).toLocaleString()}`, ""]}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {spendData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">Enter your financial details in Money Snapshot to see your breakdown.</div>
            )}
          </div>

          <div className="track-panel">
            <p className="panel-label">Budget Health Check</p>
            <p className="panel-sub">How your spending compares to recommended limits</p>
            <div className="budget-rules">
              {rules.map((r, i) => (
                <div key={i} className="budget-rule-row">
                  <div className="budget-rule-header">
                    <span className="budget-rule-label">{r.label}</span>
                    <span className="budget-rule-pcts">
                      <span style={{ color: r.pct > r.cap ? "#e8193d" : "#2aa89a", fontWeight: 700 }}>{r.pct.toFixed(1)}%</span>
                      <span className="budget-rule-cap"> / {r.cap}% max</span>
                    </span>
                  </div>
                  <div className="budget-rule-track">
                    <div
                      className="budget-rule-fill"
                      style={{ width: `${Math.min(r.pct / r.cap * 100, 100)}%`, background: r.pct > r.cap ? "#c0002f" : r.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>


        <div className="track-progress-panel" style={{ marginBottom: 16 }}>
          <div className="track-progress-header">
            <span>Emergency Fund (3-Month Target)</span>
            <span>R{currentSavings.toLocaleString()} / R{Math.round(emergencyFund).toLocaleString()}</span>
          </div>
          <div className="track-progress-track">
            <div className="track-progress-fill" style={{ width: `${emergencyPct}%` }} />
          </div>
          <p className="track-progress-sub">{emergencyPct.toFixed(0)}% funded — target is 3× your monthly expenses</p>
        </div>

        <div className="track-panel" style={{ marginBottom: 16 }}>
          <p className="panel-label">Track Milestones</p>
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

        <div className="edu-grid">
          <div className="edu-tile">
            <p className="edu-title">What is a TFSA?</p>
            <p className="edu-body">A Tax-Free Savings Account lets you invest up to R36,000/year (R500,000 lifetime) with zero tax on growth or withdrawals. It's the most powerful savings tool available to South Africans.</p>
          </div>
          <div className="edu-tile">
            <p className="edu-title">The 50/30/20 Rule</p>
            <p className="edu-body">A simple budgeting framework: 50% of take-home pay on needs (rent, food, transport), 30% on wants (entertainment, dining), and 20% on savings and debt repayment.</p>
          </div>
          <div className="edu-tile">
            <p className="edu-title">Emergency Fund First</p>
            <p className="edu-body">Before investing, build a 3–6 month emergency fund in an accessible account. This prevents you from selling investments during market downturns when unexpected costs arise.</p>
          </div>
        </div>

        <div className="recommendation-panel">
          <p className="rec-label">Recommended Next Step</p>
          <p className="rec-text">
            {savingsRate < 10
              ? "Your savings rate is below 10%. Focus on reducing expenses — particularly housing and transport — before increasing investment contributions."
              : savingsRate < 20
              ? "Good progress. Aim to push your savings rate toward 20% by gradually increasing your monthly ETF contributions."
              : "Excellent savings rate. Consider maximising your TFSA contribution and exploring offshore ETF exposure for long-term wealth building."}
          </p>
        </div>

      </div>
    </div>
  );
}

export default LifestyleTrack;
