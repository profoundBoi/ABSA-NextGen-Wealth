export function calculatePAYE(monthlyIncome) {
  const annualIncome = monthlyIncome * 12;

  let annualTax = 0;

  if (annualIncome <= 237100) {
    annualTax = annualIncome * 0.18;
  }

  else if (annualIncome <= 370500) {
    annualTax =
      42678 +
      (annualIncome - 237100) * 0.26;
  }

  else if (annualIncome <= 512800) {
    annualTax =
      77362 +
      (annualIncome - 370500) * 0.31;
  }

  else if (annualIncome <= 673000) {
    annualTax =
      121475 +
      (annualIncome - 512800) * 0.36;
  }

  else if (annualIncome <= 857900) {
    annualTax =
      179147 +
      (annualIncome - 673000) * 0.39;
  }

  else if (annualIncome <= 1817000) {
    annualTax =
      251258 +
      (annualIncome - 857900) * 0.41;
  }

  else {
    annualTax =
      644489 +
      (annualIncome - 1817000) * 0.45;
  }
  return annualTax / 12;
}

export function carVsInvest(
  carPrice,
  annualReturn = 0.10,
  years = 5
) {
  const depreciationRate = 0.15;

  const futureCarValue =
    carPrice * Math.pow(1 - depreciationRate, years);

  const investmentValue =
    carPrice * Math.pow(1 + annualReturn, years);

  return {
    futureCarValue: Math.round(futureCarValue),
    investmentValue: Math.round(investmentValue),
  };
}