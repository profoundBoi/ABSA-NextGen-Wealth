import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/Login.css";

function LoginPage() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName]             = useState("");
  const [pin, setPin]               = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError]           = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (pin.length < 4) {
      setError("PIN must be at least 4 digits.");
      return;
    }

    if (isRegister) {
      if (pin !== confirmPin) {
        setError("PINs do not match.");
        return;
      }
      // Save profile to localStorage
      localStorage.setItem("profile", JSON.stringify({ name: name.trim(), pin }));
      login(name.trim(), pin);
      navigate("/");
      return;
    }

    // Login — check against saved profile
    const saved = localStorage.getItem("profile");
    if (!saved) {
      setError("No account found. Please register first.");
      return;
    }
    const profile = JSON.parse(saved);
    if (profile.name.toLowerCase() !== name.trim().toLowerCase() || profile.pin !== pin) {
      setError("Incorrect name or PIN.");
      return;
    }

    login(profile.name, pin);
    navigate("/");
  }

  return (
    <div className="login-page">

      {/* MESH BACKGROUND */}
      <div className="mesh-bg">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-grid" />
      </div>

      <div className="login-container">

        {/* LOGO / BRAND */}
        <div className="login-brand">
          <div className="login-logo-ring">
            <span>A</span>
          </div>
          <p className="login-brand-name">Absa Financial Planner</p>
        </div>

        {/* CARD */}
        <div className="login-card">

          <h1 className="login-title">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="login-sub">
            {isRegister
              ? "Set up your profile to get started."
              : "Sign in to access your financial dashboard."}
          </p>

          <form className="login-form" onSubmit={handleSubmit}>

            <div className="login-input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Dlamini"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="login-input-group">
              <label>PIN</label>
              <input
                type="password"
                placeholder="Enter your PIN"
                value={pin}
                onChange={e => setPin(e.target.value)}
                maxLength={8}
                inputMode="numeric"
              />
              <small>Minimum 4 digits</small>
            </div>

            {isRegister && (
              <div className="login-input-group">
                <label>Confirm PIN</label>
                <input
                  type="password"
                  placeholder="Re-enter your PIN"
                  value={confirmPin}
                  onChange={e => setConfirmPin(e.target.value)}
                  maxLength={8}
                  inputMode="numeric"
                />
              </div>
            )}

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-btn">
              {isRegister ? "Create Account" : "Sign In"}
            </button>

          </form>

          <div className="login-switch">
            {isRegister ? (
              <>Already have an account?{" "}
                <span onClick={() => { setIsRegister(false); setError(""); }}>Sign in</span>
              </>
            ) : (
              <>New user?{" "}
                <span onClick={() => { setIsRegister(true); setError(""); }}>Create an account</span>
              </>
            )}
          </div>

        </div>

        <p className="login-disclaimer">
          This app uses local storage only. No data is sent to any server.
        </p>

      </div>
    </div>
  );
}

export default LoginPage;
