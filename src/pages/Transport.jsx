import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomPieChart from "../components/CustomPieChart";
import { getTransportIndicators } from "../api/indicatorsAPI";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Transport = () => {
  const navigate = useNavigate(); // استخدام useNavigate بدلاً من useHistory
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState("all"); // Store the filter state

  useEffect(() => {
    getTransportIndicators()
      .then((res) => {
        setData(res);
        setTimeout(() => setShowSplash(false), 200);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      });
  }, []);

  if (showSplash) return <SplashScreen />;

  // Tourist vehicle data
  const touristVehicleData = [
    { name: "Cars", value: data.tourist_vehicles.cars },
    { name: "Minibuses", value: data.tourist_vehicles.minibuses },
    { name: "Buses", value: data.tourist_vehicles.buses },
  ];

  // Filter data based on selected filter
  const filteredData = () => {
    if (filter === "electric") {
      return {
        eBuses: data.public_e_buses,
        electricVehicles: data.electric_vehicles,
        chargingPoints: data.charging_points,
      };
    }
    if (filter === "cars") {
      return {
        cars: data.tourist_vehicles.cars,
        minibuses: data.tourist_vehicles.minibuses,
        buses: data.tourist_vehicles.buses,
      };
    }
    return data; // If filter is "all", return all data
  };

  const filtered = filteredData();

  return (
    <>
      <Helmet>
        <title>Transport | GIS Dashboard</title>
      </Helmet>

      {/* Filter dropdown */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">Show All Data</option>
          <option value="electric">Electric Transport</option>
          <option value="cars">Tourist Vehicles (Cars)</option>
        </select>
        {/* زر التعديل */}
        <button
          onClick={() => navigate("/TransportForm")}
          className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2 mx-2"
        >
          Edit Transport Data
        </button>
      </div>

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="e-Buses" value={filtered.eBuses || "-"} />
          <StatCard title="CNG Stations" value={filtered.cng_stations || "-"} />
          <StatCard
            title="% Microbuses (CNG)"
            value={
              filtered.microbuses_cng_percent
                ? `${filtered.microbuses_cng_percent}%`
                : "-"
            }
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Electric Vehicles"
            value={filtered.electricVehicles || "-"}
          />
          <StatCard
            title="Charging Points"
            value={filtered.chargingPoints || "-"}
          />
          <StatCard
            title="Bike&pedestrian infrastructure (km)"
            value={filtered.bike_lanes_km || "-"}
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Bike Trips / Day"
            value={filtered.bike_trips_per_day || "-"}
          />
          <StatCard
            title="Bike Trips (Total)"
            value={filtered.bike_trips_total || "-"}
          />
          <StatCard
            title="% Taxis (CNG)"
            value={
              filtered.taxis_cng_percent
                ? `${filtered.taxis_cng_percent}%`
                : "-"
            }
          />
        </div>

        {/* Row 4 - Charts */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Bike Sharing Stations"
            value={filtered.bike_sharing_stations || "-"}
          />
          <CustomPieChart
            data={touristVehicleData}
            dataKey="value"
            nameKey="name"
            colors={["#60a5fa", "#34d399", "#f59e0b"]}
            title="Number of tourists"
          />
        </div>
      </div>
    </>
  );
};

export default Transport;
