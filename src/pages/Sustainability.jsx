import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import CustomBarChart from '../components/CustomBarChart';
import { getSustainabilityIndicators } from '../api/indicatorsAPI';
import SplashScreen from '../components/SplashScreen';

const Sustainability = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    getSustainabilityIndicators()
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

  const transportData = [
    { label: 'Public Transport %', value: data.sustainable_transport_index.public_transport_share_percent },
    { label: 'Bike Lanes (km)', value: data.sustainable_transport_index.bike_lanes_km },
    { label: 'Pedestrian Zones (km)', value: data.sustainable_transport_index.pedestrian_zones_km }
  ];

  const greenInfraData = Object.entries(data.green_infra_coverage_percent).map(([key, val]) => ({
    label: key.replace('_', ' ').toUpperCase(),
    value: val
  }));

  return (
    <div className="p-6 space-y-8">

      <h2 className="text-xl font-bold mb-2">Sustainability & Climate Resilience</h2>

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Solar Capacity (MW)" value={data.solar_capacity_mw} />
        <StatCard title="Waste to Energy (MWh/year)" value={data.waste_to_energy_mwh_per_year} />
        <StatCard title="Climate Risk Index" value={data.climate_risk_index} />
      </div>

      <CustomBarChart
        title="Sustainable Transport Index"
        data={transportData}
        xKey="label"
        barKey="value"
        barColor="#3b82f6"
      />

      <CustomBarChart
        title="Green Infrastructure Coverage (%)"
        data={greenInfraData}
        xKey="label"
        barKey="value"
        barColor="#22c55e"
      />

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Circular Economy Score" value={data.circular_economy_score_percent + '%'} />
        <StatCard title="Water-Energy Efficiency (kWh/m³)" value={data.water_energy_nexus_efficiency.energy_per_m3_water_kwh} />
      </div>

      <StatCard title="Carbon Neutrality Progress" value={data.carbon_neutrality_progress_percent + '%'} />
    </div>
  );
};

export default Sustainability;
