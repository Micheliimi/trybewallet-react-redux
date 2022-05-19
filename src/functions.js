export default function sumExpenses(expenses) {
  const sumValue = expenses.reduce((acumulador, valorAtual) => {
    const result = Number(valorAtual
      .value) * Number(valorAtual
      .exchangeRates[valorAtual.currency].ask);
    acumulador += result;
    return acumulador;
  }, 0);
  return sumValue.toFixed(2);
}
