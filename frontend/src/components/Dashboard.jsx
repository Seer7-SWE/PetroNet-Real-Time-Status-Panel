//1. import { useEffect, useState } from "react";
// import { ref, onValue } from "firebase/database";
// import { database } from "../firebaseConfig";

// import MapView from "./MapView";
// import SensorTable from "./SensorTable";
// import AlertsPanel from "./AlertsPanel";
// import RechartsPanel from "./RechartsPanel";

// export default function Dashboard() {
//   const [sensors, setSensors] = useState({});
//   const [alerts, setAlerts] = useState({});

//   useEffect(() => {
//     onValue(ref(database, "sensors"), (snap) => {
//       setSensors(snap.val() || {});
//     });

//     onValue(ref(database, "alerts"), (snap) => {
//       setAlerts(snap.val() || {});
//     });
//   }, []);

//   return (
//     <div className="dashboard-grid">
//       <MapView sensors={sensors} />
//       <AlertsPanel alerts={alerts} />
//       <SensorTable sensors={sensors} />
//       <RechartsPanel sensors={sensors} />
//     </div>
//   );
// }




// 2. import { useEffect, useState } from "react";
// import { ref, onValue } from "firebase/database";
// import { database } from "../firebaseConfig";

// import MapView from "./MapView";
// import SensorTable from "./SensorTable";
// import AlertsPanel from "./AlertsPanel";
// import RechartsPanel from "./RechartsPanel";

// export default function Dashboard() {
//   const [sensors, setSensors] = useState({});
//   const [alerts, setAlerts] = useState({});

//   useEffect(() => {
//     const sensorsRef = ref(database, "sensors");
//     const alertsRef = ref(database, "alerts");

//     onValue(sensorsRef, (snap) => {
//       setSensors(snap.val() || {});
//     });

//     onValue(alertsRef, (snap) => {
//       setAlerts(snap.val() || {});
//     });
//   }, []);

//   return (
//     <div className="scada-root">
//       {/* TOP STATUS BAR */}
//       <div className="scada-topbar">
//         <h2>PetroNet — Saudi Oilfield Operations</h2>
//         <span>Live Monitoring</span>
//       </div>

//       {/* MAIN GRID */}
//       <div className="scada-grid">
//         <div className="panel map">
//           <MapView sensors={sensors} />
//         </div>

//         <div className="panel alerts">
//           <AlertsPanel alerts={alerts} />
//         </div>

//         <div className="panel table">
//           <SensorTable sensors={sensors} />
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";

import MapView from "./MapView";
import SensorTable from "./SensorTable";
import AlertsPanel from "./AlertsPanel";
import RechartsPanel from "./RechartsPanel";

export default function Dashboard() {
  const [sensors, setSensors] = useState({});
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    const sensorsRef = ref(database, "sensors");
    const alertsRef = ref(database, "alerts");

    onValue(ref(database, "sensors"), (snap) => {
      setSensors(snap.val() || {});
    });

    onValue(ref(database, "alerts"), (snap) => {
      setAlerts(snap.val() || {});
    });
  }, []);

  return (
    <div className="scada-root">
      {/* TOP STATUS BAR */}
      <div className="scada-topbar">
        <h2>PetroNet — Saudi Oilfield Operations</h2>
        <span>Live Monitoring</span>
      </div>

      {/* MAIN GRID */}
      <div className="scada-grid">
        <div className="panel map">
          <MapView sensors={sensors} />
        </div>

        <div className="panel alerts">
          <AlertsPanel alerts={alerts} />
        </div>

        <div className="panel table">
          <SensorTable sensors={sensors} />
        </div>
      </div>

         <div className="dashboard-grid">
            <RechartsPanel sensors={sensors} />
         </div>

    </div>
  );
}