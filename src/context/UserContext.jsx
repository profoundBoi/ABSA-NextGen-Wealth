import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {

  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("userData");

    return saved
      ? JSON.parse(saved)
      : {
          income: 30000,
          rent: 8000,
          car: 5000,
          expenses: 7000,
          savingsGoal: 20000,
          currentSavings: 4000,
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "userData",
      JSON.stringify(userData)
    );
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}