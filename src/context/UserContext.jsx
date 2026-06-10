import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {

  // Financial data
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved
      ? JSON.parse(saved)
      : {
          income: "",
          rent: "",
          car: "",
          expenses: "",
          savingsGoal: "",
          currentSavings: "",
        };
  });

  // Session / user name
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem("session");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  function login(name, pin) {
    const sessionData = { name, pin };
    localStorage.setItem("session", JSON.stringify(sessionData));
    setSession(sessionData);
  }

  function logout() {
    localStorage.removeItem("session");
    setSession(null);
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        session,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
