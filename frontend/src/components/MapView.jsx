import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ sensors }) {
  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden border">
      <MapContainer
        center={[24.7136, 46.6753]} // Saudi Arabia
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sensors &&
          Object.values(sensors).map((s) => (
            <Marker key={s.id} position={[s.lat, s.lng]}>
              <Popup>
                <strong>{s.field}</strong><br />
                Temp: {s.temperature}°C<br />
                Pressure: {s.pressure}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
