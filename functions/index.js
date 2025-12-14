const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.database();

/**
 * EXACT SAUDI OIL FIELDS (50)
 */
const OIL_FIELDS = [
  { id: "ghawar-001", field: "Ghawar", lat: 25.43, lng: 49.62 },
  { id: "ain-dar-002", field: "Ain Dar", lat: 25.60, lng: 49.55 },
  { id: "shedgum-003", field: "Shedgum", lat: 25.70, lng: 49.65 },
  { id: "haradh-004", field: "Haradh", lat: 24.85, lng: 49.10 },
  { id: "hawiyah-005", field: "Hawiyah", lat: 25.35, lng: 49.45 },

  { id: "abqaiq-006", field: "Abqaiq", lat: 25.93, lng: 49.67 },
  { id: "khurais-007", field: "Khurais", lat: 25.50, lng: 48.90 },
  { id: "shaybah-008", field: "Shaybah", lat: 22.52, lng: 53.99 },
  { id: "safaniya-009", field: "Safaniya", lat: 27.47, lng: 48.52 },
  { id: "manifa-010", field: "Manifa", lat: 26.85, lng: 49.80 },

  { id: "zuluf-011", field: "Zuluf", lat: 26.62, lng: 50.15 },
  { id: "marjan-012", field: "Marjan", lat: 26.30, lng: 50.80 },
  { id: "qatif-013", field: "Qatif", lat: 26.47, lng: 50.10 },
  { id: "abu-safa-014", field: "Abu Safa", lat: 26.52, lng: 50.27 },
  { id: "berri-015", field: "Berri", lat: 26.35, lng: 50.05 },

  { id: "khafji-016", field: "Khafji", lat: 28.43, lng: 48.55 },
  { id: "umm-gudair-017", field: "Umm Gudair", lat: 28.10, lng: 48.90 },
  { id: "wafra-018", field: "Wafra", lat: 28.70, lng: 47.90 },
  { id: "neutral-zone-019", field: "Neutral Zone Offshore", lat: 28.25, lng: 48.80 },

  { id: "abu-hadriya-020", field: "Abu Hadriya", lat: 26.90, lng: 49.20 },
  { id: "fursan-021", field: "Fursan", lat: 26.75, lng: 49.10 },
  { id: "mazalij-022", field: "Mazalij", lat: 26.80, lng: 49.30 },

  { id: "nuayyim-023", field: "Nuayyim", lat: 26.20, lng: 48.80 },
  { id: "damman-024", field: "Dammam", lat: 26.43, lng: 50.10 },
  { id: "uthmaniyah-025", field: "Uthmaniyah", lat: 25.35, lng: 49.75 },

  { id: "huraymila-026", field: "Huraymila", lat: 25.15, lng: 47.20 },
  { id: "khursaniyah-027", field: "Khursaniyah", lat: 26.15, lng: 49.75 },
  { id: "janah-028", field: "Janah", lat: 26.05, lng: 49.60 },

  { id: "tinat-029", field: "Tinat", lat: 26.10, lng: 49.90 },
  { id: "hasbah-030", field: "Hasbah", lat: 26.80, lng: 50.40 },
  { id: "arabiyah-031", field: "Arabiyah", lat: 26.90, lng: 50.55 },

  { id: "ribyan-032", field: "Ribyan", lat: 27.05, lng: 50.65 },
  { id: "midyan-033", field: "Midyan", lat: 28.00, lng: 34.80 },
  { id: "duba-034", field: "Duba", lat: 27.35, lng: 35.70 },

  { id: "samah-035", field: "Samah", lat: 25.80, lng: 48.60 },
  { id: "jawf-036", field: "Jawf", lat: 29.90, lng: 39.50 },
  { id: "qurayyah-037", field: "Qurayyah", lat: 28.40, lng: 36.50 },

  { id: "shaden-038", field: "Shaden", lat: 26.00, lng: 47.90 },
  { id: "dawadmi-039", field: "Dawadmi", lat: 24.50, lng: 44.40 },
  { id: "afif-040", field: "Afif", lat: 23.90, lng: 42.90 },

  { id: "wadi-sirhan-041", field: "Wadi Sirhan", lat: 31.10, lng: 38.40 },
  { id: "tabuk-basin-042", field: "Tabuk Basin", lat: 28.30, lng: 36.10 },
  { id: "qassim-043", field: "Qassim", lat: 26.40, lng: 43.90 },

  { id: "sharurah-044", field: "Sharurah", lat: 17.50, lng: 47.10 },
  { id: "rub-al-khali-045", field: "Rub al Khali Central", lat: 21.00, lng: 51.00 },

  { id: "kidan-046", field: "Kidan", lat: 26.95, lng: 49.40 },
  { id: "lawhah-047", field: "Lawhah", lat: 27.10, lng: 49.60 },
  { id: "shurayrah-048", field: "Shurayrah", lat: 26.85, lng: 49.45 },

  { id: "jalameed-049", field: "Jalameed", lat: 31.50, lng: 39.30 },
  { id: "thar-050", field: "Thar", lat: 20.20, lng: 50.90 },
];

/**
 * Generate realistic sensor state
 */
function generateSensorState(field) {
  const temperature = Math.round(65 + Math.random() * 55); // 65–120°C
  const pressure = Math.round(180 + Math.random() * 220);  // 180–400 bar
  const value = Math.round(Math.random() * 100);

  let status = "normal";
  if (temperature > 100 || pressure > 330) status = "high";
  if (temperature > 112 || pressure > 370) status = "critical";

  return {
    ...field,
    temperature,
    pressure,
    value,
    status,
    timestamp: Date.now(),
  };
}

/**
 * Generate alert if abnormal
 */
function generateAlert(sensor) {
  if (sensor.status === "normal") return null;

  return {
    sensorId: sensor.id,
    field: sensor.field,
    severity: sensor.status.toUpperCase(),
    message:
      sensor.status === "critical"
        ? `CRITICAL condition at ${sensor.field}`
        : `High threshold breach at ${sensor.field}`,
    timestamp: Date.now(),
  };
}

/**
 * SIMULATION ENGINE — runs every 30 seconds
 */
exports.simulationEngine = functions.pubsub
  .schedule("every 30 seconds")
  .onRun(async () => {
    const sensorsRef = db.ref("sensors");
    const alertsRef = db.ref("alerts");

    await alertsRef.remove(); // clear previous cycle alerts

    for (const field of OIL_FIELDS) {
      const sensor = generateSensorState(field);
      await sensorsRef.child(sensor.id).set(sensor);

      const alert = generateAlert(sensor);
      if (alert) {
        await alertsRef.push(alert);
      }
    }

    console.log("Saudi oilfield simulation tick completed");
    return null;
  });
