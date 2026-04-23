export function carVsInvest(carPrice, rate, years = 5) {
  const carCost = carPrice * (1 + rate);

  const investValue = carPrice * Math.pow(1.08, years);

  return {
    carCost,
    investValue,
  };
}