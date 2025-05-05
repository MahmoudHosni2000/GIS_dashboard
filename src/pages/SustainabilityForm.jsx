import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getSustainabilityIndicators } from "../api/indicatorsAPI";
import SplashScreen from "../components/SplashScreen";

const SustainabilityForm = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSustainabilityIndicators()
      .then((res) => {
        setFormData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load indicators:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (fieldPath, value) => {
    setFormData((prev) => {
      const newData = { ...prev };
      const path = fieldPath.split(".");
      let target = newData;
      for (let i = 0; i < path.length - 1; i++) {
        target = target[path[i]];
      }
      target[path[path.length - 1]] = value;
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    alert("Form submitted!");
  };

  if (loading || !formData) return <SplashScreen />;

  return (
    <>
      <Helmet>
        <title>Edit Sustainability Data | GIS Dashboard</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Edit Sustainability Indicators
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Section 1: Energy & Environment */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Energy & Environment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Solar Capacity (MW)"
                value={formData.solar_capacity_mw}
                onChange={(e) =>
                  handleChange("solar_capacity_mw", e.target.value)
                }
              />
              <InputField
                label="Waste to Energy (MWh/year)"
                value={formData.waste_to_energy_mwh_per_year}
                onChange={(e) =>
                  handleChange("waste_to_energy_mwh_per_year", e.target.value)
                }
              />
              <InputField
                label="Climate Risk Index"
                value={formData.climate_risk_index}
                onChange={(e) =>
                  handleChange("climate_risk_index", e.target.value)
                }
              />
              <InputField
                label="Circular Economy Score (%)"
                value={formData.circular_economy_score_percent}
                onChange={(e) =>
                  handleChange("circular_economy_score_percent", e.target.value)
                }
              />
              <InputField
                label="Carbon Neutrality Progress (%)"
                value={formData.carbon_neutrality_progress_percent}
                onChange={(e) =>
                  handleChange(
                    "carbon_neutrality_progress_percent",
                    e.target.value
                  )
                }
              />
              <InputField
                label="Water-Energy Efficiency (kWh/m³)"
                value={
                  formData.water_energy_nexus_efficiency.energy_per_m3_water_kwh
                }
                onChange={(e) =>
                  handleChange(
                    "water_energy_nexus_efficiency.energy_per_m3_water_kwh",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* Section 2: Sustainable Transport */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Sustainable Transport
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Public Transport Share (%)"
                value={
                  formData.sustainable_transport_index
                    .public_transport_share_percent
                }
                onChange={(e) =>
                  handleChange(
                    "sustainable_transport_index.public_transport_share_percent",
                    e.target.value
                  )
                }
              />
              <InputField
                label="Bike Lanes (km)"
                value={formData.sustainable_transport_index.bike_lanes_km}
                onChange={(e) =>
                  handleChange(
                    "sustainable_transport_index.bike_lanes_km",
                    e.target.value
                  )
                }
              />
              <InputField
                label="Pedestrian Zones (km)"
                value={formData.sustainable_transport_index.pedestrian_zones_km}
                onChange={(e) =>
                  handleChange(
                    "sustainable_transport_index.pedestrian_zones_km",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// Reusable input field component
const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  </div>
);

export default SustainabilityForm;
