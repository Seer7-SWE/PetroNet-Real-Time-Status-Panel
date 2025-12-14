import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const statusColor = {
  NORMAL: "green",
  HIGH: "orange",
  CRITICAL: "red",
};

export default function MapView({ sensors }) {
  if (!sensors) return null;

  return (
    <div className="card">
      <h2>Saudi Arabia Oil Fields</h2>

      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer center={[23.8859, 45.0792]} zoom={6} style={{ height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {Object.values(sensors).map((s) => (
            <CircleMarker
              key={s.id}
              center={[s.lat, s.lng]}
              radius={10}
              color={statusColor[s.status]}
            >
              <Popup>
                <strong>{s.field}</strong><br />
                Temp: {s.temperature}°C<br />
                Pressure: {s.pressure}<br />
                Status: {s.status}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
