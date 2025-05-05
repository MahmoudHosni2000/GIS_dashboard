import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import CustomPieChart from "../components/CustomPieChart";
import { getWasteIndicators } from "../api/indicatorsAPI";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Waste = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getWasteIndicators()
      .then((res) => {
        setData(res);
        setTimeout(() => setShowSplash(false), 200);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      });
  }, []);

  if (showSplash) return <SplashScreen />;

  const recyclableData = Object.entries(
    data.generation_collection.recyclable_generated_tpd
  ).map(([key, value]) => ({
    name: key,
    value,
  }));

  const ucoData = Object.entries(
    data.generation_collection.collected_uco_liters
  ).map(([month, value]) => ({
    name: month,
    value,
  }));

  const ucoMonthlyData = Object.entries(
    data.generation_collection.collected_uco_liters_month
  ).map(([month, value]) => ({
    name: month,
    value,
  }));

  const weeeProcessingData = [
    {
      name: "Recycled/Refurbished",
      value: data.hazardous_waste.weee_processing.recycled_refurbished_percent,
    },
    {
      name: "Haz. Materials Removed",
      value:
        data.hazardous_waste.weee_processing.hazardous_material_removed_percent,
    },
  ];

  const circularEngagementData = [
    {
      name: "Local Initiatives",
      value:
        data.circular_economy_community_engagement
          .number_of_active_local_initiatives,
    },
    {
      name: "Engagement Events",
      value:
        data.circular_economy_community_engagement.stakeholder_engagement
          .events_count,
    },
    {
      name: "Participants",
      value:
        data.circular_economy_community_engagement.stakeholder_engagement
          .estimated_participants,
    },
  ];

  const filteredData = () => {
    if (filter === "generation") {
      return (
        <section>
          <h2 className="text-2xl font-bold mb-4">
            I. Waste Generation & Collection
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatCard
              title="MSW (tons/day)"
              value={data.generation_collection.total_generated_tpd.MSW}
            />
            <StatCard
              title="C&D Waste (tons/day)"
              value={data.generation_collection.total_generated_tpd["C&D"]}
            />
            <StatCard
              title="Other Waste (tons/day)"
              value={data.generation_collection.total_generated_tpd.other}
            />
          </div>
          <CustomPieChart
            data={recyclableData}
            dataKey="value"
            nameKey="name"
            title="Recyclable Waste Streams"
            colors={["#4ade80", "#60a5fa", "#facc15", "#f87171"]}
          />
          <div className="mt-6">
            <CustomBarChart
              data={ucoMonthlyData}
              xKey="name"
              barKey="value"
              barColor="#3b82f6"
              title="UCO Collected Over Time"
            />
          </div>
        </section>
      );
    }
    if (filter === "processing") {
      return (
        <section>
          <h2 className="text-2xl font-bold mb-4">
            II. Waste Processing & Diversion
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              title="Diversion Rate"
              value={
                data.processing_diversion.overall_diversion_rate_percent + "%"
              }
            />
            <StatCard
              title="Biodiesel from UCO"
              value={data.processing_diversion.biodiesel_from_uco_liters + " L"}
            />
            <StatCard
              title="Overall Recycling Rate"
              value={
                data.processing_diversion.overall_recycling_rate_percent + "%"
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <StatCard
              title="Source Segregation Participation"
              value={
                data.processing_diversion.source_segregation
                  .participation_rate_percent + "%"
              }
            />
            <StatCard
              title="Organic Waste Composting Rate"
              value={
                data.processing_diversion.organic_waste_composting_percent + "%"
              }
            />
          </div>
        </section>
      );
    }
    if (filter === "hazardous") {
      return (
        <section>
          <h2 className="text-2xl font-bold mb-4">
            III. Hazardous Waste Management
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Medical Waste (tons/month)"
              value={data.hazardous_waste.medical_waste_tpm}
            />
            <StatCard
              title="WEEE Collected (tons/month)"
              value={data.hazardous_waste.weee_collected_tpm}
            />
          </div>
          <div className="mt-6">
            <CustomPieChart
              data={weeeProcessingData}
              dataKey="value"
              nameKey="name"
              title="WEEE Processing Breakdown"
              colors={["#0ea5e9", "#f97316"]}
            />
          </div>
        </section>
      );
    }
    if (filter === "circular") {
      return (
        <section>
          <h2 className="text-2xl font-bold mb-4">
            IV. Circular Economy Engagement
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Active Local Initiatives"
              value={
                data.circular_economy_community_engagement
                  .number_of_active_local_initiatives
              }
            />
            <StatCard
              title="Engagement Events"
              value={
                data.circular_economy_community_engagement
                  .stakeholder_engagement.events_count
              }
            />
          </div>
          <div className="mt-6">
            <CustomBarChart
              data={circularEngagementData}
              dataKey="value"
              nameKey="name"
              title="Circular Economy Community Engagement"
              colors={["#d97706", "#16a34a", "#e11d48"]}
            />
          </div>
        </section>
      );
    }
    return (
      <>
        <section>
          <h2 className="text-2xl font-bold mb-4">
            I. Waste Generation & Collection
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatCard
              title="MSW (tons/day)"
              value={data.generation_collection.total_generated_tpd.MSW}
            />
            <StatCard
              title="C&D Waste (tons/day)"
              value={data.generation_collection.total_generated_tpd["C&D"]}
            />
            <StatCard
              title="Other Waste (tons/day)"
              value={data.generation_collection.total_generated_tpd.other}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Collection Efficiency"
              value={
                data.generation_collection.collection_efficiency_percent + "%"
              }
            />
            <StatCard
              title="Open Container Overflow Rate"
              value={
                data.generation_collection
                  .open_container_overflow_rate_percent + "%"
              }
            />
          </div>
          <div className="mt-6">
            <CustomPieChart
              data={recyclableData}
              dataKey="value"
              nameKey="name"
              title="Recyclable Waste Streams"
              colors={["#4ade80", "#60a5fa", "#facc15", "#f87171"]}
            />
          </div>
          <div className="mt-6">
            <CustomBarChart
              data={ucoMonthlyData}
              xKey="name"
              barKey="value"
              barColor="#3b82f6"
              title="UCO Collected Over Time"
            />
          </div>
        </section>
        <br />
        <section>
          <h2 className="text-2xl font-bold mb-4">
            II. Waste Processing & Diversion
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              title="Diversion Rate"
              value={
                data.processing_diversion.overall_diversion_rate_percent + "%"
              }
            />
            <StatCard
              title="Biodiesel from UCO"
              value={data.processing_diversion.biodiesel_from_uco_liters + " L"}
            />
            <StatCard
              title="Overall Recycling Rate"
              value={
                data.processing_diversion.overall_recycling_rate_percent + "%"
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <StatCard
              title="Source Segregation Participation"
              value={
                data.processing_diversion.source_segregation
                  .participation_rate_percent + "%"
              }
            />
            <StatCard
              title="Organic Waste Composting Rate"
              value={
                data.processing_diversion.organic_waste_composting_percent + "%"
              }
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            III. Hazardous Waste Management
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Medical Waste (tons/month)"
              value={data.hazardous_waste.medical_waste_tpm}
            />
            <StatCard
              title="WEEE Collected (tons/month)"
              value={data.hazardous_waste.weee_collected_tpm}
            />
          </div>
          <div className="mt-6">
            <CustomPieChart
              data={weeeProcessingData}
              dataKey="value"
              nameKey="name"
              title="WEEE Processing Breakdown"
              colors={["#0ea5e9", "#f97316"]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            IV. Circular Economy Engagement
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Active Local Initiatives"
              value={
                data.circular_economy_community_engagement
                  .number_of_active_local_initiatives
              }
            />
            <StatCard
              title="Engagement Events"
              value={
                data.circular_economy_community_engagement
                  .stakeholder_engagement.events_count
              }
            />
          </div>
          <div className="mt-6">
            <CustomBarChart
              data={circularEngagementData}
              dataKey="value"
              nameKey="name"
              title="Circular Economy Community Engagement"
              colors={["#d97706", "#16a34a", "#e11d48"]}
            />
          </div>
        </section>
      </>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Waste Indicators Dashboard</title>
      </Helmet>

      <h1 className="text-3xl font-semibold mb-6">
        Waste Indicators Dashboard
      </h1>

      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="generation">Generation</option>
          <option value="processing">Processing</option>
          <option value="hazardous">Hazardous Waste</option>
          <option value="circular">Circular Economy</option>
        </select>
      </div>

      {filteredData()}
    </div>
  );
};

export default Waste;
