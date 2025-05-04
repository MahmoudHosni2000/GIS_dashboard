import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import CustomBarChart from '../components/CustomBarChart';
import CustomPieChart from '../components/CustomPieChart';
import { getWasteIndicators } from '../api/indicatorsAPI';
import SplashScreen from '../components/SplashScreen';

const Waste = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    getWasteIndicators()
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

  const recyclableData = Object.entries(data.generation_collection.recyclable_generated_tpd).map(([key, value]) => ({
    name: key,
    value
  }));

  const ucoData = Object.entries(data.generation_collection.collected_uco_liters).map(([month, value]) => ({
    name: month,
    value
  }));

  const weeeProcessingData = [
    { name: 'Recycled/Refurbished', value: data.hazardous_waste.weee_processing.recycled_refurbished_percent },
    { name: 'Haz. Materials Removed', value: data.hazardous_waste.weee_processing.hazardous_material_removed_percent }
  ];

  return (
    <div className="space-y-10">

      {/* I. Waste Generation & Collection */}
      <section>
        <h2 className="text-2xl font-bold mb-4">I. Waste Generation & Collection</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <StatCard title="MSW (tons/day)" value={data.generation_collection.total_generated_tpd.MSW} />
          <StatCard title="C&D Waste (tons/day)" value={data.generation_collection.total_generated_tpd['C&D']} />
          <StatCard title="Other Waste (tons/day)" value={data.generation_collection.total_generated_tpd.other} />
        </div>

        <CustomPieChart
          data={recyclableData}
          dataKey="value"
          nameKey="name"
          title="Recyclable Waste Streams"
          colors={['#4ade80', '#60a5fa', '#facc15', '#f87171']}
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <StatCard title="Collection Efficiency" value={data.generation_collection.collection_efficiency_percent + '%'} />
          <StatCard title="Open Container Overflow" value={data.generation_collection.overflow_rate_percent + '%'} />
        </div>

        <div className="mt-6">
          <CustomBarChart
            data={ucoData}
            xKey="name"
            barKey="value"
            title="Used Cooking Oil (liters/month)"
            barColor="#6366f1"
          />
        </div>
      </section>

      {/* II. Waste Processing & Diversion */}
      <section>
        <h2 className="text-2xl font-bold mb-4">II. Waste Processing & Diversion</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Diversion Rate" value={data.processing_diversion.overall_diversion_rate_percent + '%'} />
          <StatCard title="Biodiesel from UCO" value={data.processing_diversion.biodiesel_from_uco_liters + ' L'} />
          <StatCard title="Overall Recycling Rate" value={data.processing_diversion.overall_recycling_rate_percent + '%'} />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <StatCard title="Source Segregation Participation" value={data.processing_diversion.source_segregation.participation_rate_percent + '%'} />
          <StatCard title="Composting Rate" value={data.processing_diversion.organic_waste_composting_percent + '%'} />
        </div>
      </section>

      {/* III. Hazardous Waste Management */}
      <section>
        <h2 className="text-2xl font-bold mb-4">III. Hazardous Waste Management</h2>
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Medical Waste (tons/month)" value={data.hazardous_waste.medical_waste_tpm} />
          <StatCard title="WEEE Collected (tons/month)" value={data.hazardous_waste.weee_collected_tpm} />
        </div>
        <div className="mt-6">
          <CustomPieChart
            data={weeeProcessingData}
            dataKey="value"
            nameKey="name"
            title="WEEE Processing Breakdown"
            colors={['#0ea5e9', '#f97316']}
          />
        </div>
      </section>

      {/* IV. Circular Economy & Engagement */}
      <section>
        <h2 className="text-2xl font-bold mb-4">IV. Circular Economy & Community Engagement</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Local Initiatives" value={data.circular_engagement.local_initiatives} />
          <StatCard title="Engagement Events" value={data.circular_engagement.stakeholder_engagement_events} />
          <StatCard title="Participants" value={data.circular_engagement.estimated_participants} />
        </div>
      </section>
    </div>
  );
};

export default Waste;
