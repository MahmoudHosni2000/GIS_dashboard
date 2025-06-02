import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// أيقونة مخصصة للماركر
const gifIcon = L.icon({
  iconUrl: "/assets/marker.png", // تأكد إن الصورة موجودة في public/assets
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// مكون لتحديث الإحداثيات بناءً على نقر المستخدم
const LocationPicker = ({ setCoords }) => {
  useMapEvents({
    click(e) {
      setCoords([e.latlng.lat, e.latlng.lng]);
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

  // كل ما تتغير الإحداثيات، ابعتها للمكون الأب
  useEffect(() => {
    if (coords && onLocationSelect) {
      onLocationSelect({ latitude: coords[0], longitude: coords[1] });
    }
  }, [coords, onLocationSelect]);

  return (
    <MapContainer
      center={coords || defaultCoords}
      zoom={12}
      className="w-full h-full rounded-l-[20px] shadow-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {coords && <Marker position={coords} icon={gifIcon} />}
      <LocationPicker setCoords={setCoords} />
    </MapContainer>
  );
};

export default MapView;
