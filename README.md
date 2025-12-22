

# **PetroNet — Real-Time Oilfield Monitoring Dashboard**

A real-time operational dashboard for oilfield sensor monitoring, built with React, Firebase, and Recharts. The platform ingests live data, visualizes key sensor metrics, and highlights anomalous conditions for field engineers and managers. It is designed with industrial dashboards in mind, offering map visuals, data tables, confidence indicators, and operational charting.

Live Demo:
🔗 [https://0b7499b3.petronet-real-time-status-panel.pages.dev/](https://0b7499b3.petronet-real-time-status-panel.pages.dev/)

---

## **Project Overview**

PetroNet is an interactive frontend dashboard that provides real-time insights into oilfield performance metrics such as temperature and pressure across multiple sensor nodes. It uses Firebase Realtime Database to stream live sensor and alert data, and visualizes them through a responsive interface with maps, charts, and analytic indicators. The goal is to enable quick awareness and decision-making for technical and operational teams.

---

## **Core Features**

### 📍 Real-Time Geospatial Monitoring

* Displays all active oilfield sensors on a map.
* Sensors are color-coded by status (Normal, High, Critical).
* Location-aware popup panels for sensor details.

### 📊 Pressure vs Temperature Correlation Chart

* Highlights the relationship between pressure and temperature readings.
* Color-coded by sensor severity.
* Helps detect anomalous sensor behavior.

### 📋 Sensor Table with Confidence Indicator

* Shows all sensor data in a sortable table.
* Includes calculated confidence metrics based on freshness and data validity.
* Row heat shading indicates confidence levels: high, medium, low.

### 🚨 Alerts Panel

* Lists current alerts with severity indicators.
* Shows alert details and age.
* Designed for real-time awareness.

### 💓 System-Level Health Indicator

* KPI bar summarizing overall health of active sensors.
* Provides a quick visual on system degradation.

### 🧠 Real-Time Data Streaming

* Firebase Realtime Database powers two-way live updates.
* UI automatically reflects changes as data streams in.

---

## **Tech Stack**

| Layer             | Technology                 |
| ----------------- | -------------------------- |
| Frontend          | React.js (Vite)            |
| Data Storage      | Firebase Realtime Database |
| Visualizations    | Recharts, React-Leaflet    |
| Deployment        | Cloudflare Pages           |
| Real-Time Updates | Firebase listeners         |

---

## **Getting Started**

### **Prerequisites**

Before getting started, you need:

* Node.js (v18+ recommended)
* npm (or yarn)
* Firebase project with Realtime Database
* Firebase configuration information

---

## **Project Structure**

```
petronet-real-time-status-panel/
├── public/
├── src/
│   ├── components/
│   │   ├── AlertsPanel.jsx
│   │   ├── KPIHealth.jsx
│   │   ├── MapView.jsx
│   │   ├── SensorTable.jsx
│   │   ├── TempPressureScatter.jsx
│   ├── utils/
│   │   ├── sensorConfidence.js
│   │   └── alertAge.js
│   ├── firebaseConfig.js
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── firebase.json
├── README.md
└── vite.config.js
```

---

## **Installation & Running Locally**

1. **Clone the repository**

```bash
git clone https://github.com/Seer7-SWE/PetroNet-Real-Time-Status-Panel.git
cd PetroNet-Real-Time-Status-Panel
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Firebase**

Create a Firebase project and enable Realtime Database.
Add your config to:

```js
src/firebaseConfig.js
```

Example:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "https://<your-db>.firebaseio.com",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

4. **Start local development server**

```bash
npm run dev
```

5. **Open in browser**

[http://localhost:5173](http://localhost:5173)

---

## **Firebase Setup**

1. Create a Firebase project in the Firebase Console.
2. Enable **Realtime Database**.
3. Structure your database like:

```json
{
  "sensors": {
    "sensor-001": {
      "id": "sensor-001",
      "field": "Ghawar",
      "lat": 25.43,
      "lng": 49.62,
      "temperature": 78,
      "pressure": 250,
      "status": "NORMAL",
      "timestamp": 1720000000000
    }
  },
  "alerts": {
    "alert-001": {
      "sensorId": "sensor-ghawar-01",
      "message": "High temperature detected",
      "severity": "CRITICAL",
      "timestamp": 1720000000000
    }
  }
}
```


No Firebase rules adjustments are required for development mode.

---

## **Usage Notes**

* Real-time view updates whenever sensor or alert data changes in Firebase.
* Dashboards can be filtered and extended easily with new components.
* Confidence score is computed in frontend without additional backend logic.

---

## **Design Decisions**

* **React + Vite:** For fast local development and easy deployment.
* **Firebase Realtime DB:** Simple, lightweight streaming database.
* **Leaflet Map:** Open-source geospatial visualization.
* **Recharts:** Declarative, responsive charting.

---

## **Future Improvements**

* Authentication + role-based access
* Alert acknowledgment and lifecycle management
* Data history & playback
* Exportable reports (CSV/PDF)
* Sensor trend mini-charts per row

---

## **Contributing**

Contributions are welcome!
Please open an issue first if you want to enhance features or fix a bug.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## **License**

This project is open-source and available under the MIT License.

---

## **Contact**

If you have questions, feedback, or want to collaborate, reach out!
 Let’s build something useful for real-world operational monitoring.

---

