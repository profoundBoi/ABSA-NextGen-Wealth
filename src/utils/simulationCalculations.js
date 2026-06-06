export function calculateBondRepayment(loanAmount, annualInterestRate, years = 20) {
  const monthlyRate = annualInterestRate / 100 / 12;
  const months = years * 12;

  return (
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}

export function rentVsBuySimulation(salary, housePrice, deposit, interestRate, rent) {
  const loanAmount = housePrice - deposit;
  const monthlyBond = calculateBondRepayment(loanAmount, interestRate);

  const ratesAndTaxes = housePrice * 0.001;
  const maintenance = (housePrice * 0.01) / 12;
  const monthlyOwnershipCost = monthlyBond + ratesAndTaxes + maintenance;

  const affordability = (monthlyOwnershipCost / salary) * 100;

  const buyingCost5Years = monthlyOwnershipCost * 60;
  const propertyValue5Years = housePrice * Math.pow(1.06, 5);
  const rentingCost5Years = rent * 60;

  const monthlySaving = Math.max(monthlyOwnershipCost - rent, 0);

  const monthlyRate = 0.10 / 12;
  const months = 5 * 12;
  const investedSavings =
    monthlySaving * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  let recommendation = "";
  if (affordability > 35) {
    recommendation = "Buying may be risky — housing costs exceed 35% of your income.";
  } else if (affordability > 30) {
    recommendation = "Buying is possible but above the recommended affordability range.";
  } else {
    recommendation = "Buying appears affordable based on your income.";
  }

  return {
    monthlyBond: Math.round(monthlyBond),
    monthlyOwnershipCost: Math.round(monthlyOwnershipCost),
    affordability: Math.round(affordability),
    buyingCost5Years: Math.round(buyingCost5Years),
    propertyValue5Years: Math.round(propertyValue5Years),
    rentingCost5Years: Math.round(rentingCost5Years),
    investedSavings: Math.round(investedSavings),
    recommendation,
  };
}

export function carVsInvestSimulation(
  carPrice,
  insurance,        
  fuelMaintenance,  
  years,
  annualReturn = 10
) {
  const depreciationRate = 0.15;

  const carValue = carPrice * Math.pow(1 - depreciationRate, years);

  const runningCosts = (insurance + fuelMaintenance) * 12 * years;

  const totalCarCost = carPrice + runningCosts;

  const investmentValue = carPrice * Math.pow(1 + annualReturn / 100, years);

  const wealthDifference = investmentValue - (carValue - runningCosts);

  const recommendation =
    investmentValue > carValue
      ? "Investing the purchase price creates significantly greater long-term wealth."
      : "Buying the car may be financially reasonable given your inputs.";

  return {
    carValue: Math.round(carValue),
    runningCosts: Math.round(runningCosts),
    totalCarCost: Math.round(totalCarCost),
    investmentValue: Math.round(investmentValue),
    wealthDifference: Math.round(wealthDifference),
    recommendation,
  };
}

export function localVsOffshoreSimulation(
  investment,
  monthlyContribution,
  years,
  randDepreciation
) {
  let localValue = investment;
  let offshoreValue = investment;

  const localReturn = 0.09 / 12;                            
  const offshoreReturn = (0.10 + randDepreciation / 100) / 12; 

  const months = years * 12;

  for (let i = 0; i < months; i++) {
    localValue = localValue * (1 + localReturn) + monthlyContribution;
    offshoreValue = offshoreValue * (1 + offshoreReturn) + monthlyContribution;
  }

  const difference = offshoreValue - localValue;

  let recommendation = "";
  if (difference > 500000) {
    recommendation =
      "Offshore investing produced significantly higher returns due to stronger market growth and currency diversification.";
  } else if (difference > 100000) {
    recommendation =
      "Offshore investing outperformed local investing, but diversification remains important.";
  } else {
    recommendation =
      "Both options produced similar results. A diversified portfolio may be the best approach.";
  }

  const suggestedAllocation =
    years >= 10
      ? "Suggested Allocation: 70% Offshore / 30% Local"
      : "Suggested Allocation: 60% Offshore / 40% Local";

  return {
    localValue: Math.round(localValue),
    offshoreValue: Math.round(offshoreValue),
    difference: Math.round(difference),
    recommendation,
    suggestedAllocation,
  };
}