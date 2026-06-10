import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const EMPTY_DATA = {
  income: "",
  rent: "",
  car: "",
  expenses: "",
  savingsGoal: "",
  currentSavings: "",
};

function getUserKey(name) {
  return `userData_${name.trim().toLowerCase().replace(/\s+/g, "_")}`;
}

export function UserProvider({ children }) {

  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem("session");
    return saved ? JSON.parse(saved) : null;
  });

  const [userData, setUserData] = useState(() => {
    const savedSession = localStorage.getItem("session");
    if (!savedSession) return EMPTY_DATA;
    const { name } = JSON.parse(savedSession);
    const saved = localStorage.getItem(getUserKey(name));
    return saved ? JSON.parse(saved) : { ...EMPTY_DATA };
  });

  useEffect(() => {
    if (session?.name) {
      localStorage.setItem(getUserKey(session.name), JSON.stringify(userData));
    }
  }, [userData, session]);

  function login(name, pin) {
    const sessionData = { name, pin };
    localStorage.setItem("session", JSON.stringify(sessionData));
    setSession(sessionData);

    const saved = localStorage.getItem(getUserKey(name));
    setUserData(saved ? JSON.parse(saved) : { ...EMPTY_DATA });
  }

  function logout() {
    localStorage.removeItem("session");
    setSession(null);
    setUserData({ ...EMPTY_DATA });
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
