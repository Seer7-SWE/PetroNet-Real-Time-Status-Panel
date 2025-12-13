import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function MapView() {
  const [sensors, setSensors] = useState({});

  useEffect(() => {
    const sensorRef = ref(db, "sensors/");
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

      {Object.keys(sensors).map((id) => (
        <Marker key={id} position={[sensors[id].lat, sensors[id].lng]}>
          <Popup>
            <b>ID:</b> {id}<br/>
            <b>Value:</b> {sensors[id].value}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
