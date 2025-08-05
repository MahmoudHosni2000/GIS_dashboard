"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// أيقونة مخصصة
const gifIcon = L.icon({
  iconUrl: "/assets/marker.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// مكون لتكبير الخريطة تلقائيًا على النقاط الصالحة
function FitBounds({ data }) {
  const map = useMap();

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const bounds = data
        .map((d) => {
          const lat = parseFloat(d.latitude);
          const lng = parseFloat(d.longitude);
          return !isNaN(lat) && !isNaN(lng) ? [lat, lng] : null;
        })
        .filter(Boolean);

      if (bounds.length === 1) {
        map.setView(bounds[0], 16); // تكبير لموقع واحد فقط
      } else if (bounds.length > 1) {
        map.fitBounds(bounds); // تكبير لعدة نقاط
      }
    }
  }, [data, map]);

  return null;
}

export default function MapDash({ initialData }) {
  // useEffect(() => {
  //   console.log("Initial Data:", initialData);
  // }, [initialData]);

  // دالة للتحقق من صحة الإحداثيات
  const isValidCoordinate = (val) =>
    (typeof val === "string" || typeof val === "number") &&
    !isNaN(parseFloat(val));

  return (
    <MapContainer
      zoom={12}
      center={[27.9125, 34.308]} // شرم الشيخ 
      className="w-full h-full rounded-l-[20px] shadow-lg"
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Satellite">
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Topographic">
          <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Dark Mode">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        </LayersControl.BaseLayer>
      </LayersControl>

      {/* تكبير تلقائي على النقاط */}
      <FitBounds data={initialData} />

      {/* عرض الماركرات */}
      {Array.isArray(initialData) &&
        initialData.map((item, index) => {
          const lat = isValidCoordinate(item.latitude)
            ? parseFloat(item.latitude)
            : null;
          const lng = isValidCoordinate(item.longitude)
            ? parseFloat(item.longitude)
            : null;

          if (lat !== null && lng !== null) {
            return (
              <Marker
                key={index}
                position={[lat, lng]}
                icon={gifIcon}
                draggable={false}
              >
                <Popup>
                  {item.city && (
                    <div>
                      <strong>{item.city}</strong>
                    </div>
                  )}
                  Lat: {lat}
                  <br />
                  Lng: {lng}
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
    </MapContainer>
  );
}
