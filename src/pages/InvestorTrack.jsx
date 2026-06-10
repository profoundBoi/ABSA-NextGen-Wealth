import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/Tracks.css";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

function InvestorTrack() {
  const { userData } = useContext(UserContext);

  const income         = Number(userData.income) || 0;
  const currentSavings = Number(userData.currentSavings) || 0;

  const monthlyInvesting = Math.round(currentSavings * 0.3);
  const offshore = Math.round(monthlyInvesting * 0.7);
  const local    = Math.round(monthlyInvesting * 0.3);

  // Monthly annuity projection at 10% p.a.
  const monthlyRate = 0.10 / 12;
  const projectedValue = monthlyInvesting > 0
    ? monthlyInvesting * ((Math.pow(1 + monthlyRate, 120) - 1) / monthlyRate)
    : 0;

  // Growth chart — year by year over 10 years
  const growthData = Array.from({ length: 11 }, (_, yr) => {
    const months = yr * 12;
    const value = currentSavings * Math.pow(1 + monthlyRate, months) +
      (monthlyInvesting > 0 ? monthlyInvesting * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) : 0);
    const offshoreRate = (0.10 + 0.04) / 12;
    const offshoreValue = currentSavings * Math.pow(1 + offshoreRate, months) +
      (monthlyInvesting > 0 ? monthlyInvesting * ((Math.pow(1 + offshoreRate, months) - 1) / monthlyRate) : 0);
    return { year: `Yr ${yr}`, local: Math.round(value), offshore: Math.round(offshoreValue) };
  });

  // ETF allocation bar data
  const allocationData = [
    { name: "Global ETF", pct: 40, color: "#2aa89a" },
    { name: "SA ETF", pct: 30, color: "#4f7df3" },
    { name: "US ETF", pct: 20, color: "#d4862a" },
    { name: "Bonds", pct: 10, color: "#c0002f" },
  ];

  const [milestones, setMilestones] = useState([
    { label: "Open a Tax-Free Savings Account (TFSA)", done: false },
    { label: "Set up a monthly debit order for ETF contributions", done: false },
    { label: "Open an offshore investment account (e.g. EasyEquities USD)", done: false },
    { label: "Diversify across at least 3 different ETFs", done: false },
    { label: "Reinvest all dividends automatically", done: false },
    { label: "Review and rebalance portfolio every 6 months", done: false },
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
          <h1 className="page-title">📈 Aggressive Global Investor</h1>
          <p className="page-description">
            Maximise long-term wealth through disciplined ETF investing, offshore
            diversification, and the power of compound growth. Built for South Africans
            who want to build serious wealth over the next decade.
          </p>
        </div>

        {/* KEY METRICS */}
        <div className="track-grid" style={{ marginBottom: 16 }}>
          <div className="track-metric-card">
            <div className="track-metric-tag">Current Savings</div>
            <div className="track-metric-value">R{currentSavings.toLocaleString()}</div>
          </div>
          <div className="track-metric-card">
            <div className="track-metric-tag">Suggested Monthly Investment</div>
            <div className="track-metric-value">R{monthlyInvesting.toLocaleString()}</div>
          </div>
          <div className="track-metric-card track-metric-accent">
            <div className="track-metric-tag">10-Year Projection</div>
            <div className="track-metric-value" style={{ color: "#2aa89a" }}>
              R{Math.round(projectedValue).toLocaleString()}
            </div>
          </div>
          <div className="track-metric-card">
            <div className="track-metric-tag">TFSA Annual Allowance</div>
            <div className="track-metric-value">R36,000</div>
          </div>
        </div>

        {/* CHARTS ROW */}
        <div className="two-panel-row">

          {/* GROWTH PROJECTION CHART */}
          <div className="track-panel">
            <p className="panel-label">10-Year Growth Projection</p>
            <p className="panel-sub">Local (10% p.a.) vs Offshore (14% p.a. incl. rand depreciation)</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="localGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f7df3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f7df3" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="offshoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2aa89a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2aa89a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: "#4d6b66", fontSize: 10, fontFamily: "Montserrat" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#4d6b66", fontSize: 10, fontFamily: "Montserrat" }} axisLine={false} tickLine={false} tickFormatter={v => `R${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#060d12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontFamily: "Montserrat", fontSize: 12, color: "#f0f4f3" }}
                  formatter={v => [`R${Number(v).toLocaleString()}`, ""]}
                />
                <Area type="monotone" dataKey="local" stroke="#4f7df3" strokeWidth={2} fill="url(#localGrad)" name="Local" />
                <Area type="monotone" dataKey="offshore" stroke="#2aa89a" strokeWidth={2} fill="url(#offshoreGrad)" name="Offshore" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* SUGGESTED ALLOCATION */}
          <div className="track-panel">
            <p className="panel-label">Suggested ETF Allocation</p>
            <p className="panel-sub">Diversified portfolio for long-term growth</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={allocationData} layout="vertical" barSize={18}>
                <XAxis type="number" tick={{ fill: "#4d6b66", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#8fa8a3", fontSize: 11, fontFamily: "Montserrat", fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{ background: "#060d12", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontFamily: "Montserrat", fontSize: 12, color: "#f0f4f3" }}
                  formatter={v => [`${v}%`, ""]}
                />
                <Bar dataKey="pct" radius={[0, 6, 6, 0]}>
                  {allocationData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="allocation-row" style={{ marginTop: 16 }}>
              <div className="allocation-item">
                <span className="alloc-dot dot-teal" />
                <span className="alloc-label">Offshore (70%)</span>
                <span className="alloc-value">R{offshore.toLocaleString()}/mo</span>
              </div>
              <div className="allocation-item">
                <span className="alloc-dot dot-red" />
                <span className="alloc-label">Local (30%)</span>
                <span className="alloc-value">R{local.toLocaleString()}/mo</span>
              </div>
            </div>
          </div>

        </div>

        {/* MILESTONES */}
        <div className="track-panel" style={{ marginBottom: 16 }}>
          <p className="panel-label">Investor Milestones</p>
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
            <p className="edu-title">What is an ETF?</p>
            <p className="edu-body">An Exchange-Traded Fund tracks an index (like the JSE Top 40 or S&P 500) and trades on a stock exchange. ETFs offer instant diversification, low fees, and are accessible through platforms like EasyEquities.</p>
          </div>
          <div className="edu-tile">
            <p className="edu-title">Compound Growth</p>
            <p className="edu-body">Compound growth means your returns earn returns. R1,000/month invested at 10% p.a. for 20 years grows to over R750,000 — most of which is pure growth, not your own contributions.</p>
          </div>
          <div className="edu-tile">
            <p className="edu-title">Rand Hedging</p>
            <p className="edu-body">The rand historically weakens against major currencies. Investing offshore through ETFs like the Satrix S&P 500 protects your wealth from rand depreciation and gives you exposure to global markets.</p>
          </div>
        </div>

        {/* RECOMMENDATION */}
        <div className="recommendation-panel">
          <p className="rec-label">Recommended Next Step</p>
          <p className="rec-text">
            {currentSavings === 0
              ? "Start by opening a TFSA on EasyEquities and making your first R500 investment into a global ETF. The most important step is simply starting."
              : monthlyInvesting < 1000
              ? "Your suggested monthly investment is low. Consider increasing your income or reducing expenses to free up more capital for investment."
              : "You have a solid base. Open an EasyEquities USD account for offshore exposure and maximise your R36,000 TFSA allowance before investing in a taxable account."}
          </p>
        </div>

      </div>
    </div>
  );
}

export default InvestorTrack;
