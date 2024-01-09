export default function getQueryRange(page: number, rangeStep = 10) {
  const startRange = rangeStep * (page - 1);
  const endRange = startRange + rangeStep + 1;

  return [startRange, endRange, rangeStep];
}