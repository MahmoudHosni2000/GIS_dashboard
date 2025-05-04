import { useEffect, useState } from 'react';
import CustomPieChart from '../components/CustomPieChart';
import StatCard from '../components/StatCard';
import CustomBarChart from "../components/CustomBarChart";
import SplashScreen from '../components/SplashScreen';
import { getWaterIndicators } from '../api/indicatorsAPI';

const Water = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    getWaterIndicators()
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

  const desalinationCapacityData = [
    { name: 'City', value: data.desalination_capacity_m3.city },
    { name: 'Hotels', value: data.desalination_capacity_m3.hotels },
  ];

  const treatmentVsDesalination = [
    { name: 'Treatment Plants', value: data.treatment_plants },
    { name: 'Desalination Plants', value: data.desalination_plants.city + data.desalination_plants.hotels }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select className="border p-2 rounded basis-3/4">
          <option>Select City</option>
          <option>City A</option>
          <option>City B</option>
        </select>
        <input
          type="number"
          placeholder="Select Year"
          className="border p-2 rounded basis-1/4"
        />
      </div>



      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Per Capita Use" value={data.water_consumption_per_capita + ' m³/yr'} />
        <StatCard title="Leak %" value={data.leakage_percent + '%'} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <CustomBarChart
          data={desalinationCapacityData}
          xKey="name"
          barKey="value"
          barColor="#60a5fa"
          title="Desalination Capacity"
        />

        <CustomPieChart
          data={treatmentVsDesalination}
          dataKey="value"
          nameKey="name"
          colors={['#34d399', '#facc15']}
          title="Treatment vs Desalination"
        />
      </div>
    </div>
  );
};

export default Water;
