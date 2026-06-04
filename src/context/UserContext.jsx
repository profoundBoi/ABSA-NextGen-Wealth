import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
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