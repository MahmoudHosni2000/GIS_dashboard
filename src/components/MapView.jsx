import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

const gifIcon = L.icon({
  iconUrl: '/assets/marker.gif', // يجب أن تكون في مجلد public
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const RecenterMap = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 10);
  return null;
};

const MapView = () => {
  const [searchValue, setSearchValue] = useState('');
  const [coords, setCoords] = useState([30.0444, 31.2357]);
  const inputRef = useRef();

  const handleSearch = () => {
    if (searchValue.toLowerCase() === 'riyadh') {
      setCoords([24.7136, 46.6753]);
    } else if (searchValue.toLowerCase() === 'jeddah') {
      setCoords([21.4858, 39.1925]);
    } else {
      alert('Location not found. Try "Riyadh" or "Jeddah".');
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 right-4 z-[1000] flex gap-2 shadow">
        <input
          type="text"
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search location"
          className="px-2 py-1 border rounded text-sm"
        />
        <button
          onClick={handleSearch}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
        >
          Search
        </button>
      </div>

      <MapContainer center={coords} zoom={6} className="w-full h-full rounded-xl shadow-lg">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coords} icon={gifIcon}>
          <Popup>Current Location</Popup>
        </Marker>
        <RecenterMap coords={coords} />
      </MapContainer>
    </div>
  );
};

export default MapView;
