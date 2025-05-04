import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import CustomPieChart from '../components/CustomPieChart';
import { getTransportIndicators } from '../api/indicatorsAPI';
import SplashScreen from '../components/SplashScreen';

const Transport = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    getTransportIndicators()
      .then((res) => {
        setData(res);
        // setShowSplash(false); // Hide splash screen after data is loaded
        setTimeout(() => setShowSplash(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      });
  }, []);
  
  if (showSplash) return <SplashScreen />;

  const touristVehicleData = [
    { name: 'Cars', value: data.tourist_vehicles.cars },
    { name: 'Minibuses', value: data.tourist_vehicles.minibuses },
    { name: 'Buses', value: data.tourist_vehicles.buses }
  ];

  return (
    <div className="space-y-6">
      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="e-Buses" value={data.public_e_buses} />
        <StatCard title="CNG Stations" value={data.cng_stations} />
        <StatCard title="% Microbuses (CNG)" value={data.microbuses_cng_percent + '%'} />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Electric Vehicles" value={data.electric_vehicles} />
        <StatCard title="Charging Points" value={data.charging_points} />
        <StatCard title="Bike Lanes (km)" value={data.bike_lanes_km} />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Bike Trips / Day" value={data.bike_trips_per_day} />
        <StatCard title="Bike Trips (Total)" value={data.bike_trips_total} />
        <StatCard title="% Taxis (CNG)" value={data.taxis_cng_percent + '%'} />
      </div>

      {/* Row 4 - Charts */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Bike Sharing Stations" value={data.bike_sharing_stations} />
        <CustomPieChart
          data={touristVehicleData}
          dataKey="value"
          nameKey="name"
          colors={['#60a5fa', '#34d399', '#f59e0b']}
          title="Tourist Vehicle Distribution"
        />
      </div>
    </div>
  );
};

export default Transport;
