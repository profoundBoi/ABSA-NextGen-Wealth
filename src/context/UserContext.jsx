import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    income: 0,
    rent: 0,
    car: 0,
    expenses: 0,
    savingsGoal: 0,
    currentSavings: 0,
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}