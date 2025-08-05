import { useState, useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// أيقونة مخصصة للماركر
const gifIcon = L.icon({
  iconUrl: "/assets/marker.png", // تأكد إن الصورة موجودة في public/assets
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// مكون لتحديث الإحداثيات بناءً على نقر المستخدم
const LocationPicker = ({ setCoords, onLocationSelect }) => {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setCoords([lat, lng]);
      onLocationSelect?.({ latitude: lat, longitude: lng }); // ✅ هنا الباس
    },
  });
  return null;
};

const MapView = ({ initialData, onLocationSelect }) => {
  const defaultCoords = [27.9125, 34.308]; // شرم الشيخ
  const [coords, setCoords] = useState(null);

  // أول مرة: لو فيه بيانات مبدئية
  useEffect(() => {
    if (initialData?.latitude && initialData?.longitude) {
      setCoords([
        parseFloat(initialData.latitude),
        parseFloat(initialData.longitude),
      ]);
    }
  }, [initialData]);

  return (
    <MapContainer
      zoom={12}
      center={coords || defaultCoords}
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
      {coords && <Marker position={coords} icon={gifIcon} />}
      <LocationPicker
        setCoords={setCoords}
        onLocationSelect={onLocationSelect}
      />
    </MapContainer>
  );
};

export default MapView;
