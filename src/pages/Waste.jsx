import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import CustomPieChart from "../components/CustomPieChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Waste = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const stored = localStorage.getItem("wasteFormData");
    const parsed = stored ? JSON.parse(stored) : {};

    setData({
      generation_collection: {
        total_generated_tpd: {
          MSW: Number(parsed.msw) || 0,
          "C&D": Number(parsed.cndWaste) || 0,
          other: Number(parsed.otherWaste) || 0,
        },
        recyclable_generated_tpd: {
          بلاستيك: Number(parsed.recyclableWaste) || 0,
        },
        collection_efficiency_percent: Number(parsed.collectionEfficiency) || 0,
        open_container_overflow_rate_percent: Number(parsed.overflowRate) || 0,
        collected_uco_liters_month: {
          يناير: Number(parsed.biodiesel) || 0,
        },
        collected_uco_liters: {
          يناير: Number(parsed.biodiesel) || 0,
        },
      },
      processing_diversion: {
        overall_diversion_rate_percent: Number(parsed.diversionRate) || 0,
        biodiesel_from_uco_liters: Number(parsed.biodiesel) || 0,
        overall_recycling_rate_percent: Number(parsed.recyclingRate) || 0,
        source_segregation: {
          participation_rate_percent: Number(parsed.sourceSegregation) || 0,
        },
        organic_waste_composting_percent: Number(parsed.compostingRate) || 0,
      },
      hazardous_waste: {
        medical_waste_tpm: Number(parsed.medicalWaste) || 0,
        weee_collected_tpm: Number(parsed.weeeCollected) || 0,
        weee_processing: {
          recycled_refurbished_percent:
            Number(parsed.hazardousWasteRecyclingRate) || 0,
          hazardous_material_removed_percent:
            Number(parsed.hazardousWasteRemovalRate) || 0,
        },
      },
      circular_economy_community_engagement: {
        number_of_active_local_initiatives:
          Number(parsed.localInitiatives) || 0,
        stakeholder_engagement: {
          events_count: Number(parsed.communityEvents) || 0,
          estimated_participants: 0,
        },
      },
    });

    setTimeout(() => setShowSplash(false), 200);
  }, []);

  if (showSplash || !data) return <SplashScreen />;

  const recyclableData = Object.entries(
    data.generation_collection.recyclable_generated_tpd
  ).map(([key, value]) => ({ name: key, value }));

  const ucoMonthlyData = Object.entries(
    data.generation_collection.collected_uco_liters_month
  ).map(([month, value]) => ({ name: month, value }));

  const weeeProcessingData = [
    {
      name: "تم التدوير/التجديد",
      value: data.hazardous_waste.weee_processing.recycled_refurbished_percent,
    },
    {
      name: "تمت إزالة المواد الخطرة",
      value:
        data.hazardous_waste.weee_processing.hazardous_material_removed_percent,
    },
  ];

  const circularEngagementData = [
    {
      name: "المبادرات المحلية",
      value:
        data.circular_economy_community_engagement
          .number_of_active_local_initiatives,
    },
    {
      name: "فعاليات التوعية",
      value:
        data.circular_economy_community_engagement.stakeholder_engagement
          .events_count,
    },
    {
      name: "عدد المشاركين",
      value:
        data.circular_economy_community_engagement.stakeholder_engagement
          .estimated_participants,
    },
  ];

  const filteredData = () => {
    if (filter === "generation") {
      return renderGenerationSection();
    }
    if (filter === "processing") {
      return renderProcessingSection();
    }
    if (filter === "hazardous") {
      return renderHazardousSection();
    }
    if (filter === "circular") {
      return renderCircularSection();
    }
    // default to all
    return (
      <>
        {renderGenerationSection()}
        <br />
        {renderProcessingSection()}
        <br />
        {renderHazardousSection()}
        <br />
        {renderCircularSection()}
      </>
    );
  };

  const renderGenerationSection = () => (
    <section>
      <h2 className="text-2xl font-bold mb-4">I. إنتاج وجمع النفايات</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <StatCard title="نفايات بلدية (طن/يوم)" value={data.generation_collection.total_generated_tpd.MSW} />
        <StatCard title="مخلفات البناء والهدم (طن/يوم)" value={data.generation_collection.total_generated_tpd["C&D"]} />
        <StatCard title="نفايات أخرى (طن/يوم)" value={data.generation_collection.total_generated_tpd.other} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="كفاءة الجمع" value={data.generation_collection.collection_efficiency_percent + "%"} />
        <StatCard title="نسبة امتلاء الحاويات المفتوحة" value={data.generation_collection.open_container_overflow_rate_percent + "%"} />
      </div>
      <div className="mt-6">
        <CustomPieChart data={recyclableData} dataKey="value" nameKey="name" title="أنواع النفايات القابلة للتدوير" colors={["#4ade80", "#60a5fa", "#facc15", "#f87171"]} />
      </div>
      <div className="mt-6">
        <CustomBarChart data={ucoMonthlyData} xKey="name" barKey="value" barColor="#3b82f6" title="زيت الطهي المستخدم المُجمع شهريًا" />
      </div>
    </section>
  );

  const renderProcessingSection = () => (
    <section>
      <h2 className="text-2xl font-bold mb-4">II. معالجة وتحويل النفايات</h2>
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="معدل التحويل" value={data.processing_diversion.overall_diversion_rate_percent + "%"} />
        <StatCard title="وقود حيوي من زيت الطهي" value={data.processing_diversion.biodiesel_from_uco_liters + " لتر"} />
        <StatCard title="معدل التدوير العام" value={data.processing_diversion.overall_recycling_rate_percent + "%"} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <StatCard title="مشاركة فصل المصدر" value={data.processing_diversion.source_segregation.participation_rate_percent + "%"} />
        <StatCard title="معدل التسميد للنفايات العضوية" value={data.processing_diversion.organic_waste_composting_percent + "%"} />
      </div>
    </section>
  );

  const renderHazardousSection = () => (
    <section>
      <h2 className="text-2xl font-bold mb-4">III. إدارة النفايات الخطرة</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="نفايات طبية (طن/شهر)" value={data.hazardous_waste.medical_waste_tpm} />
        <StatCard title="معدات إلكترونية مجمعة (طن/شهر)" value={data.hazardous_waste.weee_collected_tpm} />
      </div>
      <div className="mt-6">
        <CustomPieChart data={weeeProcessingData} dataKey="value" nameKey="name" title="معالجة النفايات الإلكترونية" colors={["#0ea5e9", "#f97316"]} />
      </div>
    </section>
  );

  const renderCircularSection = () => (
    <section>
      <h2 className="text-2xl font-bold mb-4">IV. الاقتصاد الدائري والمشاركة</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="المبادرات المحلية النشطة" value={data.circular_economy_community_engagement.number_of_active_local_initiatives} />
        <StatCard title="عدد الفعاليات" value={data.circular_economy_community_engagement.stakeholder_engagement.events_count} />
      </div>
      <div className="mt-6">
        <CustomBarChart
          data={circularEngagementData}
          xKey="name"
          barKey="value"
          barColor="#d97706"
          title="مشاركة المجتمع في الاقتصاد الدائري"
        />
      </div>
    </section>
  );

  return (
    <div dir="rtl">
      <Helmet>
        <title>لوحة مؤشرات النفايات</title>
      </Helmet>

      <h1 className="text-3xl font-semibold mb-6">لوحة مؤشرات النفايات</h1>

      <div className="mb-6 flex gap-1">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">الكل</option>
          <option value="generation">إنتاج النفايات</option>
          <option value="processing">المعالجة والتحويل</option>
          <option value="hazardous">نفايات خطرة</option>
          <option value="circular">الاقتصاد الدائري</option>
        </select>
        <button
          onClick={() => navigate("/WasteForm")}
          className="bg-green-500 text-white p-2 rounded"
        >
          تعديل بيانات النفايات
        </button>
      </div>

      {filteredData()}
    </div>
  );
};

export default Waste;