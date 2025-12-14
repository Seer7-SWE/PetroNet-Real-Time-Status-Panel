import { OIL_FIELDS } from "./oilFields";

const FIREBASE_DB =
  "https://petronet-real-time-statuspanel-default-rtdb.firebaseio.com";

function randomBetween(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

function computeStatus(temp, pressure) {
  if (temp > 90 || pressure > 350) return "critical";
  if (temp > 75 || pressure > 300) return "high";
  return "normal";
}

async function writeFirebase(path, payload) {
  await fetch(`${FIREBASE_DB}/${path}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export default {
  async scheduled(event, env, ctx) {
    const timestamp = Date.now();
    const sensors = {};
    const alerts = {};

    OIL_FIELDS.forEach((field) => {
      const temperature = randomBetween(55, 110);
      const pressure = randomBetween(200, 380);
      const status = computeStatus(temperature, pressure);

      sensors[field.id] = {
        ...field,
        temperature,
        pressure,
        status,
        value: randomBetween(40, 95),
        timestamp,
      };

      if (status !== "normal") {
        alerts[`alert-${field.id}`] = {
          sensorId: field.id,
          field: field.field,
          severity: status.toUpperCase(),
          message:
            status === "critical"
              ? "CRITICAL condition detected"
              : "High operational anomaly",
          timestamp,
        };
      }
    });

    await writeFirebase("sensors", sensors);
    await writeFirebase("alerts", alerts);

    console.log(
      `[SIMULATION] Updated ${Object.keys(sensors).length} sensors`
    );
  },

  async fetch() {
    return new Response("PetroNet Simulator Running", { status: 200 });
  },
};
