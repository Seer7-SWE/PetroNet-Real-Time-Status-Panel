
import { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const canvasRenderer = L.canvas({ padding: 0.5 });

const normalizeStatus = (status) =>
  String(status || "NORMAL").toUpperCase();

const STATUS_STYLE = {
  NORMAL: { core: { radius: 6, color: "#22c55e", fillOpacity: 1 } },
  HIGH: {
    core: { radius: 6, color: "#f59e0b", fillOpacity: 1 },
    ring1: { radius: 12, color: "#fbbf24", fillOpacity: 0.25 },
  },
  CRITICAL: {
    core: { radius: 7, color: "#ef4444", fillOpacity: 1 },
    ring1: { radius: 14, color: "#f87171", fillOpacity: 0.35 },
    ring2: { radius: 20, color: "#fecaca", fillOpacity: 0.18 },
  },
};

const DEFAULT_STYLE = STATUS_STYLE.NORMAL;

export default function MapView({ sensors }) {
  const [pulseTick, setPulseTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseTick((t) => (t + 1) % 20);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  if (!sensors) return null;

  return (
    <div className="panel map">
      <h2>Saudi Arabia Oil Fields</h2>

      <MapContainer
        center={[23.8859, 45.0792]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        preferCanvas
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {Object.values(sensors).map((s) => {
          const status = normalizeStatus(s.status);
          const style = STATUS_STYLE[status] || DEFAULT_STYLE;

          return (
            <Fragment key={s.id}>
              {/* Pulsing CRITICAL ring */}
              {status === "CRITICAL" && style.ring2 && (
                <CircleMarker
                  center={[s.lat, s.lng]}
                  radius={style.ring2.radius + pulseTick * 0.6}
                  pathOptions={{
                    color: style.ring2.color,
                    fillColor: style.ring2.color,
                    fillOpacity: 0.15 + pulseTick * 0.01,
                    stroke: false,
                  }}
                  renderer={canvasRenderer}
                />
              )}

              {/* HIGH or CRITICAL static outer ring */}
              {style.ring1 && (
                <CircleMarker
                  center={[s.lat, s.lng]}
                  radius={style.ring1.radius}
                  pathOptions={{
                    color: style.ring1.color,
                    fillColor: style.ring1.color,
                    fillOpacity: style.ring1.fillOpacity,
                    stroke: false,
                  }}
                  renderer={canvasRenderer}
                />
              )}

              {/* CORE marker with Popup */}
              <CircleMarker
                center={[s.lat, s.lng]}
                radius={style.core.radius}
                pathOptions={{
                  color: style.core.color,
                  fillColor: style.core.color,
                  fillOpacity: style.core.fillOpacity,
                }}
                renderer={canvasRenderer}
              >
                <Popup>
                   <strong>{s.field}</strong><br />
                   Temp: {s.temperature}°C<br />
                   Pressure: {s.pressure}<br />
                   Status: {status}
                </Popup>
              </CircleMarker>
            </Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
