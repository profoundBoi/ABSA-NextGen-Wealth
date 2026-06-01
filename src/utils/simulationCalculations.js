export function calculateBondRepayment(
  loanAmount,
  annualInterestRate,
  years = 20
) {
  const monthlyRate =
    annualInterestRate / 100 / 12;

  const months = years * 12;

  return (
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}

export function rentVsBuySimulation(
  salary,
  housePrice,
  deposit,
  interestRate,
  rent
) {
  const loanAmount =
    housePrice - deposit;

  const monthlyBond =
    calculateBondRepayment(
      loanAmount,
      interestRate
    );

  const ratesAndTaxes =
    housePrice * 0.001;

  const maintenance =
    housePrice * 0.01 / 12;

  const monthlyOwnershipCost =
    monthlyBond +
    ratesAndTaxes +
    maintenance;

  const affordability =
    (monthlyOwnershipCost / salary) * 100;

  const buyingCost5Years =
    monthlyOwnershipCost * 60;

  const propertyValue5Years =
    housePrice * Math.pow(1.06, 5);

  const rentingCost5Years =
    rent * 60;

  const investDifference =
    Math.max(
      monthlyOwnershipCost - rent,
      0
    );

  const investedSavings =
    investDifference *
    ((Math.pow(1.10, 5) - 1) / 0.10);

  let recommendation = "";

  if (affordability > 35) {
    recommendation =
      "Buying may be risky because housing costs exceed 35% of income.";
  }
  else if (affordability > 30) {
    recommendation =
      "Buying is possible but above the recommended affordability range.";
  }
  else {
    recommendation =
      "Buying appears affordable based on your income.";
  }

  return {
    monthlyBond: Math.round(monthlyBond),
    monthlyOwnershipCost:
      Math.round(monthlyOwnershipCost),

    affordability:
      Math.round(affordability),

    buyingCost5Years:
      Math.round(buyingCost5Years),

    propertyValue5Years:
      Math.round(propertyValue5Years),

    rentingCost5Years:
      Math.round(rentingCost5Years),

    investedSavings:
      Math.round(investedSavings),

    recommendation,
  };
}

export function carVsInvestSimulation(
  carPrice,
  annualReturn = 10,
  years = 5
) {
  const depreciation =
    0.15;

  const carValue =
    carPrice *
    Math.pow(
      1 - depreciation,
      years
    );

  const insurance =
    carPrice * 0.02;

  const maintenance =
    carPrice * 0.015;

  const fuel =
    30000;

  const totalCarCost =
    carPrice +
    insurance * years +
    maintenance * years +
    fuel * years;

  const investmentValue =
    carPrice *
    Math.pow(
      1 + annualReturn / 100,
      years
    );

  const wealthDifference =
    investmentValue -
    carValue;

  return {
    carValue:
      Math.round(carValue),

    investmentValue:
      Math.round(investmentValue),

    totalCarCost:
      Math.round(totalCarCost),

    wealthDifference:
      Math.round(wealthDifference),

    recommendation:
      investmentValue > carValue
        ? "Investing creates greater long-term wealth."
        : "Buying the car may be financially reasonable.",
  };
}

export function localVsOffshoreSimulation(
  investment,
  monthlyContribution,
  years = 10
) {
  let localValue =
    investment;

  let offshoreValue =
    investment;

  const localReturn =
    0.09 / 12;

  const offshoreReturn =
    0.12 / 12;

  for (
    let i = 0;
    i < years * 12;
    i++
  ) {
    localValue =
      localValue *
        (1 + localReturn) +
      monthlyContribution;

    offshoreValue =
      offshoreValue *
        (1 + offshoreReturn) +
      monthlyContribution;
  }

  const difference =
    offshoreValue -
    localValue;

  return {
    localValue:
      Math.round(localValue),

    offshoreValue:
      Math.round(offshoreValue),

    difference:
      Math.round(difference),

    recommendation:
      offshoreValue > localValue
        ? "Offshore investing may provide stronger growth and diversification."
        : "Local investing remains competitive.",
  };
}