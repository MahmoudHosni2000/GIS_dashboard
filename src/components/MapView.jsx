import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const gifIcon = L.icon({
  iconUrl: '/assets/Marker.png', // تأكد من أن هذا الملف موجود في public
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const RecenterMap = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 12); // ضبط التكبير إلى 12 لعرض شرم الشيخ بشكل أفضل
  return null;
};

const MapView = ({ data }) => {
  const [coords, setCoords] = useState([27.9125, 34.3080]); // نقطة البداية لشرم الشيخ (Naama Bay)

  return (
    <div className="w-full h-full relative">
      <MapContainer center={coords} zoom={12} className="w-full h-full rounded-xl shadow-lg">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {data.geolocation && data.geolocation.map((location, index) => (
          <Marker key={index} position={location.coords} icon={gifIcon}>
          </Marker>
        ))}
        
        <RecenterMap coords={coords} />
      </MapContainer>
    </div>
  );
};

export default MapView;


