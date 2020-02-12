const calculateLease = (
  downPayment,
  tradeIn,
  creditScoreValue,
  leaseTerm,
  miles,
  msrp,
) => new Promise((resolve) => {
  setTimeout((
  ) => {
    const payment = ((msrp - tradeIn - downPayment) * miles * creditScoreValue)
      / (10000 * leaseTerm);
    resolve(Math.round(payment));
  }, 400);
});

const calculateLoan = (
  downPayment,
  tradeIn,
  creditScoreValue,
  loanTerm,
  apr,
  msrp,
) => new Promise((resolve) => {
  setTimeout(() => {
    const payment = ((msrp - tradeIn - downPayment) * creditScoreValue
      * (1 + apr / 100)) / loanTerm;
    resolve(Math.round(payment));
  }, 400);
});

export {
  calculateLease,
  calculateLoan,
};
