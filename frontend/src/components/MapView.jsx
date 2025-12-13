import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { database } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";


export default function MapView() {
  const [sensors, setSensors] = useState({});

  useEffect(() => {
    const sensorRef = ref(database, "sensors/");
    onValue(sensorRef, (snapshot) => {
      setSensors(snapshot.val() || {});
    });
  }, []);

  return (
    <MapContainer
      center={[23.8859, 45.0792]} // Saudi Arabia center
      zoom={6}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {Object.values(sensors).map((s) => (
        <Marker key={s.id} position={[s.lat, s.lng]}>
          <Popup>
           <b>{s.field}</b><br/>
           Temp: {s.temperature} °C<br/>
           Pressure: {s.pressure} psi<br/>
           Status: {s.status}
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}
