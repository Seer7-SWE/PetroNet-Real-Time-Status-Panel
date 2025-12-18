// NO imports, NO hooks, NO async
export function calculateSensorConfidence(sensor) {
  let score = 100;

  const now = Date.now();
  const ts = sensor.timestamp || 0;
  const ageSec = (now - ts) / 1000;


  if (sensor.temperature == null) score -= 25;
  if (sensor.pressure == null) score -= 25;


  if (ageSec > 60) score -= 15;
  if (ageSec > 300) score -= 30;


  if (sensor.temperature < 0 || sensor.temperature > 150) score -= 15;
  if (sensor.pressure < 0 || sensor.pressure > 500) score -= 15;


  return Math.max(0, Math.min(100, score));
}
