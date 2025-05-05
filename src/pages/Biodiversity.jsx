import { useEffect, useState } from "react";
import { getBiodiversityIndicators } from "../api/indicatorsAPI";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Biodiversity = () => {
  const navigate = useNavigate();  // استخدام useNavigate بدلاً من useHistory

  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState("all"); // all, tourism, training, reef, conservation

  useEffect(() => {
    getBiodiversityIndicators()
      .then((res) => {
        setData(res);
        setTimeout(() => setShowSplash(false), 200);
      })
      .catch((err) => {
        console.error("فشل تحميل البيانات:", err);
      });
  }, []);

  if (showSplash || !data) return <SplashScreen />;

  const boatsData = Object.entries(data.tourism_boats_daily).map(
    ([site, value]) => ({ site, value })
  );
  const mooringsData = Object.entries(data.operational_moorings).map(
    ([site, value]) => ({ site, value })
  );
  const visitorsData = Object.entries(data.visitors_per_site).map(
    ([site, value]) => ({ site, value })
  );

  return (
    <>
      <Helmet>
        <title>Biodiversity | GIS Dashboard</title>
      </Helmet>

      <div className="space-y-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("tourism")}
            className={`px-4 py-2 rounded ${
              filter === "tourism" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            Tourism
          </button>
          <button
            onClick={() => setFilter("training")}
            className={`px-4 py-2 rounded ${
              filter === "training" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            Training & Eco
          </button>
          <button
            onClick={() => setFilter("reef")}
            className={`px-4 py-2 rounded ${
              filter === "reef" ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            Reef & Marine
          </button>
          <button
            onClick={() => setFilter("conservation")}
            className={`px-4 py-2 rounded ${
              filter === "conservation"
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Conservation
          </button>
          {/* زر التعديل */}
          <button
            onClick={() => navigate("/BiodiversityForm")}
            className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2 m-0"
          >
            Edit Sustainability Data
          </button>
        </div>

        {/* Tourism Sites */}
        {(filter === "all" || filter === "tourism") && (
          <>
            <h2 className="text-xl font-bold">Tourism Sites</h2>
            <div className="grid grid-cols-3 gap-4">
              <CustomBarChart
                data={boatsData}
                xKey="site"
                barKey="value"
                title="# Daily Tourism Boats"
                barColor="#3b82f6"
              />
              <CustomBarChart
                data={mooringsData}
                xKey="site"
                barKey="value"
                title="Operational Moorings"
                barColor="#22c55e"
              />
              <CustomBarChart
                data={visitorsData}
                xKey="site"
                barKey="value"
                title="Visitors per Site"
                barColor="#facc15"
              />
            </div>
          </>
        )}

        {/* Training & Eco Practices */}
        {(filter === "all" || filter === "training") && (
          <>
            <h2 className="text-xl font-bold">Training & Eco Practices</h2>
            <div className="grid grid-cols-4 gap-4">
              <StatCard
                title="Coral Change"
                value={data.coral_change_percent + "%"}
              />
              <StatCard
                title="Trained Crew"
                value={data.trained_crew_percent + "%"}
              />
              <StatCard
                title="Trained Guides"
                value={data.trained_guides_percent + "%"}
              />
              <StatCard
                title="Eco-friendly water sports"
                value={data.eco_friendly_sports_percent + "%"}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                title="Sustainability Incentives"
                value={data.sustainability_incentives}
              />
              <StatCard
                title="Green Fins Growth"
                value={data.green_fins_growth_percent + "%"}
              />
              <StatCard
                title="Green Fins Incentives"
                value={data.green_fins_operator_incentives}
              />
            </div>
          </>
        )}

        {/* Reef & Marine Impact */}
        {(filter === "all" || filter === "reef") && (
          <>
            <h2 className="text-xl font-bold">Reef & Marine Impact</h2>
            <div className="grid grid-cols-4 gap-4">
              <StatCard
                title="Reef Species Change"
                value={data.reef_species_change_percent + "%"}
              />
              <StatCard
                title="PAs Trained Staff"
                value={data.pa_trained_personnel_percent + "%"}
              />
              <StatCard
                title="PA Budget Growth"
                value={data.pa_budget_growth_percent + "%"}
              />
              <StatCard
                title="Enforcement Patrols"
                value={data.enforcement_patrols}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                title="Boats w/ Holding Tanks"
                value={data.boats_with_holding_tanks}
              />
              <StatCard
                title="Nutrient Reduction"
                value={data.nutrient_level_reduction_percent + "%"}
              />
              <StatCard
                title="Pump-out Facility Boats"
                value={data.pump_out_facility_boats}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                title="Effluent Quality Improvement"
                value={data.effluent_quality_improvement_percent + "%"}
              />
              <StatCard
                title="Grey Water Reduction"
                value={data.grey_water_reduction_percent + "%"}
              />
              <StatCard
                title="Reef-safe Product Operators"
                value={data.reef_safe_product_operators}
              />
            </div>
          </>
        )}

        {/* Conservation Actions */}
        {(filter === "all" || filter === "conservation") && (
          <>
            <h2 className="text-xl font-bold">Conservation Actions</h2>
            <div className="grid grid-cols-4 gap-4">
              <StatCard title="voluntary coastal& Marine Cleanups" value={data.marine_cleanups} />
              <StatCard
                title="Coastal Damage Reports"
                value={data.coastal_damage_reports}
              />
              <StatCard
                title="Illegal Fishing Reports"
                value={data.illegal_fishing_reports}
              />
              <StatCard
                title="Enforcement Actions& and patrols"
                value={data.enforcement_actions}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <StatCard
                title="Bird Mortality ↓"
                value={data.bird_mortality_decrease_percent + "%"}
              />
              <StatCard
                title="Bird Rehab Actions"
                value={data.bird_rehab_actions}
              />
              <StatCard
                title="Turtle Nesting Sites"
                value={data.protected_turtle_sites}
              />
              <StatCard title="Rescued Turtles" value={data.rescued_turtles} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Biodiversity;
