export default (score) => {
  if (score >= 750) return 0.95;
  if (score >= 700) return 1;
  if (score >= 640) return 1.05;
  return 1.2;
};
