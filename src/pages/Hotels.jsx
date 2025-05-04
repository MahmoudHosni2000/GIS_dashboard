import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import CustomBarChart from '../components/CustomBarChart';
import CustomLineChart from '../components/CustomLineChart';
import SplashScreen from "../components/SplashScreen";
import { getHotelsData } from '../api/indicatorsAPI';

const Hotels = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    getHotelsData()
      .then((res) => {
        setData(res);
        // setShowSplash(false); // Hide splash screen after data is loaded
        setTimeout(() => setShowSplash(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to load hotel data:", err);
      });
  }, []);

  if (showSplash || !data?.hotel) return <SplashScreen />;

  const hotel = data.hotel;

  const electricityData = Object.entries(hotel.electricity_consumption_kw_per_year).map(
    ([year, value]) => ({
      year,
      electricity: value,
    })
  );

  const accommodationData = Object.entries(hotel.accommodation_percentage).map(
    ([year, value]) => ({
      year,
      percentage: value,
    })
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <input type="text" placeholder="Search by Name" className="border p-2 rounded w-1/3" />
        <input type="text" placeholder="Search by Sector" className="border p-2 rounded w-1/3" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Rooms" value={hotel.number_of_rooms} />
        <StatCard title="Plane Trips" value={hotel.plane_trips} />
        <StatCard title="Visitors" value={hotel.visitors} />
        <StatCard title="5-Star" value={hotel.star_rating.five_stars} />
        <StatCard title="4-Star" value={hotel.star_rating.four_stars} />
        <StatCard title="PV Capacity (kW)" value={hotel.pv_capacity_kw} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Solar Water Heater" value={hotel.solar_water_heater ? "Yes" : "No"} />
        <StatCard title="Desalination Plant" value={hotel.has_desalination_plant ? "Yes" : "No"} />
        <StatCard title="Treatment Plant" value={hotel.has_treatment_plant ? "Yes" : "No"} />
        <StatCard title="Waste Separation" value={hotel.separates_waste ? "Yes" : "No"} />
      </div>

      {/* Charts */}
      <CustomBarChart
        data={electricityData}
        xKey="year"
        barKey="electricity"
        barColor="#f59e0b"
        title="Electricity Consumption (kW/year)"
      />

      <CustomLineChart
        data={accommodationData}
        xKey="year"
        yKeys={[{ name: 'percentage', color: '#3b82f6' }]}
        title="Accommodation Percentage Over Years"
      />
    </div>
  );
};

export default Hotels;
