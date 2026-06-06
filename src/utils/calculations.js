export function calculatePAYE(monthlyIncome) {
  const annualIncome = monthlyIncome * 12;

  let annualTax = 0;

  if (annualIncome <= 237100) {
    annualTax = annualIncome * 0.18;
  } else if (annualIncome <= 370500) {
    annualTax = 42678 + (annualIncome - 237100) * 0.26;
  } else if (annualIncome <= 512800) {
    annualTax = 77362 + (annualIncome - 370500) * 0.31;
  } else if (annualIncome <= 673000) {
    annualTax = 121475 + (annualIncome - 512800) * 0.36;
  } else if (annualIncome <= 857900) {
    annualTax = 179147 + (annualIncome - 673000) * 0.39;
  } else if (annualIncome <= 1817000) {
    annualTax = 251258 + (annualIncome - 857900) * 0.41;
  } else {
    annualTax = 644489 + (annualIncome - 1817000) * 0.45;
  }

  const primaryRebate = 17235;
  annualTax = Math.max(annualTax - primaryRebate, 0);

  return annualTax / 12;
}