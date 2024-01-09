export default function creationTimeSec(time: number) {
  const t = new Date(0).setUTCSeconds(time);
  return (Date.now() - t) / 1000;
}