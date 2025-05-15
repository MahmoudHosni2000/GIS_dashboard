import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// أيقونة مخصصة للماركر
const gifIcon = L.icon({
  iconUrl: "/assets/Marker.png", // تأكد إن الصورة موجودة في public/assets
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// مكون لإعادة تركيز الخريطة عند تغيير الإحداثيات
const RecenterMap = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 12);
    }
  }, [coords, map]);
  return null;
};

const MapView = ({ data }) => {
  const defaultCoords = [27.9125, 34.308]; // شرم الشيخ
  const [coords, setCoords] = useState(null);

  // تحديث الإحداثيات بناءً على البيانات
  useEffect(() => {
    if (data?.latitude && data?.longitude) {
      setCoords([parseFloat(data.latitude), parseFloat(data.longitude)]);
    }
  }, [data]);

  // جلب اسم المدينة (اختياري)
  useEffect(() => {
    const fetchCityName = async () => {
      if (data?.latitude && data?.longitude) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.latitude}&lon=${data.longitude}`;
        try {
          const response = await fetch(url);
          const result = await response.json();
          if (result && result.address) {
            console.log(
              "City Name:",
              result.address.city ||
                result.address.town ||
                result.address.village
            );
          }
        } catch (error) {
          console.error("Error fetching city name:", error);
        }
      }
    };

    fetchCityName();
  }, [data]);

  return (
    <div className="w-full h-96 relative pb-1">
      <MapContainer
        center={coords || defaultCoords}
        zoom={12}
        className="w-full h-full rounded-xl shadow-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {coords && <Marker position={coords} icon={gifIcon} />}
        {coords && <RecenterMap coords={coords} />}
      </MapContainer>
    </div>
  );
};

export default MapView;
