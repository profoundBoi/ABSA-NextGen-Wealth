import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
  income: 30000,
  rent: 8000,
  car: 5000,
  expenses: 7000,
  savingsGoal: 20000,
  currentSavings: 4000,
});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}