import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import { getSustainabilityIndicators } from "../api/indicatorsAPI";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Sustainability = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [selectedIndicators, setSelectedIndicators] = useState({
    solar: true,
    waste: true,
    climate: true,
    transport: true,
    greenInfra: true,
    circular: true,
    waterEnergy: true,
    carbon: true,
  });

  useEffect(() => {
    getSustainabilityIndicators()
      .then((res) => {
        setData(res);
        setTimeout(() => setShowSplash(false), 200);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      });
  }, []);

  if (showSplash || !data) return <SplashScreen />;

  const transportData = [
    {
      label: "Public Transport %",
      value: data.sustainable_transport_index.public_transport_share_percent,
    },
    {
      label: "Bike Lanes (km)",
      value: data.sustainable_transport_index.bike_lanes_km,
    },
    {
      label: "Pedestrian Zones (km)",
      value: data.sustainable_transport_index.pedestrian_zones_km,
    },
  ];

  const greenInfraData = Object.entries(data.green_infra_coverage_percent).map(
    ([key, val]) => ({
      label: key.replace("_", " ").toUpperCase(),
      value: val,
    })
  );

  const toggleIndicator = (key) => {
    setSelectedIndicators((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <Helmet>
        <title>Sustainability | GIS Dashboard</title>
      </Helmet>

      <div className="p-6 space-y-8">
        <h2 className="text-xl font-bold mb-2">
          Sustainability & Climate Resilience
        </h2>

        {/* Indicator Filter */}
        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { key: "solar", label: "Solar Capacity" },
            { key: "waste", label: "Waste to Energy" },
            { key: "climate", label: "Climate Risk Index" },
            { key: "transport", label: "Transport Index" },
            { key: "greenInfra", label: "Green Infrastructure" },
            { key: "circular", label: "Circular Economy" },
            { key: "waterEnergy", label: "Water-Energy Efficiency" },
            { key: "carbon", label: "Carbon Neutrality" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedIndicators[key]}
                onChange={() => toggleIndicator(key)}
              />
              <span>{label}</span>
            </label>
          ))}
          {/* زر التعديل */}
          <button
            onClick={() => navigate("/SustainabilityForm")}
            className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2 m-0"
          >
            Edit Sustainability Data
          </button>
        </div>

        {/* Stat Cards and Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedIndicators.solar && (
            <StatCard
              title="Solar Capacity (MW)"
              value={data.solar_capacity_mw}
            />
          )}
          {selectedIndicators.waste && (
            <StatCard
              title="Waste to Energy (MWh/year)"
              value={data.waste_to_energy_mwh_per_year}
            />
          )}
          {selectedIndicators.climate && (
            <StatCard
              title="Climate Risk Index"
              value={data.climate_risk_index}
            />
          )}
        </div>

        {selectedIndicators.transport && (
          <CustomBarChart
            title="Sustainable Transport Index"
            data={transportData}
            xKey="label"
            barKey="value"
            barColor="#3b82f6"
          />
        )}

        {selectedIndicators.greenInfra && (
          <CustomBarChart
            title="Green Infrastructure Coverage (%)"
            data={greenInfraData}
            xKey="label"
            barKey="value"
            barColor="#22c55e"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedIndicators.circular && (
            <StatCard
              title="Circular Economy Score"
              value={data.circular_economy_score_percent + "%"}
            />
          )}
          {selectedIndicators.waterEnergy && (
            <StatCard
              title="Water-Energy Efficiency (kWh/m³)"
              value={data.water_energy_nexus_efficiency.energy_per_m3_water_kwh}
            />
          )}
        </div>

        {selectedIndicators.carbon && (
          <StatCard
            title="Carbon Neutrality Progress"
            value={data.carbon_neutrality_progress_percent + "%"}
          />
        )}
      </div>
    </>
  );
};

export default Sustainability;
