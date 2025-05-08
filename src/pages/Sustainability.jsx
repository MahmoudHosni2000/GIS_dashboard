import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
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
    const storedData = localStorage.getItem("sustainabilityData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData({
        solar_capacity_mw: 0,
        sustainable_transport_index: {
          public_transport_share_percent: 0,
          bike_lanes_km: 0,
          pedestrian_zones_km: 0,
        },
        green_infra_coverage_percent: {
          parks: 0,
          green_roofs: 0,
          urban_forests: 0,
        },
        waste_to_energy_mwh_per_year: 0,
        climate_risk_index: 0,
        circular_economy_score_percent: 0,
        water_energy_nexus_efficiency: {
          energy_per_m3_water_kwh: 0,
        },
        carbon_neutrality_progress_percent: 0,
      });
    }
    setTimeout(() => setShowSplash(false), 200);
  }, []);

  if (showSplash || !data) return <SplashScreen />;

  const transportData = [
    {
      label: "نسبة النقل العام",
      value: data.sustainable_transport_index.public_transport_share_percent,
    },
    {
      label: "مسارات الدراجات (كم)",
      value: data.sustainable_transport_index.bike_lanes_km,
    },
    {
      label: "مناطق المشاة (كم)",
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
        <title>الاستدامة | لوحة المعلومات الجغرافية</title>
      </Helmet>

      <div className="p-6 space-y-8 text-right">
        <h2 className="text-xl font-bold mb-2">مؤشرات الاستدامة والمرونة المناخية</h2>

        {/* خيارات عرض المؤشرات */}
        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { key: "solar", label: "القدرة الشمسية" },
            { key: "waste", label: "تحويل النفايات إلى طاقة" },
            { key: "climate", label: "مؤشر مخاطر المناخ" },
            { key: "transport", label: "مؤشر النقل المستدام" },
            { key: "greenInfra", label: "البنية التحتية الخضراء" },
            { key: "circular", label: "الاقتصاد الدائري" },
            { key: "waterEnergy", label: "كفاءة الماء والطاقة" },
            { key: "carbon", label: "التقدم نحو الحياد الكربوني" },
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
          <button
            onClick={() => navigate("/SustainabilityForm")}
            className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2 m-0"
          >
            تعديل بيانات الاستدامة
          </button>
        </div>

        {/* بطاقات الإحصائيات والمخططات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedIndicators.solar && (
            <StatCard
              title="القدرة الشمسية (ميغاواط)"
              value={data.solar_capacity_mw}
            />
          )}
          {selectedIndicators.waste && (
            <StatCard
              title="تحويل النفايات إلى طاقة (ميغاواط ساعة/سنة)"
              value={data.waste_to_energy_mwh_per_year}
            />
          )}
          {selectedIndicators.climate && (
            <StatCard
              title="مؤشر مخاطر المناخ"
              value={data.climate_risk_index}
            />
          )}
        </div>

        {selectedIndicators.transport && (
          <CustomBarChart
            title="مؤشر النقل المستدام"
            data={transportData}
            xKey="label"
            barKey="value"
            barColor="#3b82f6"
          />
        )}

        {selectedIndicators.greenInfra && (
          <CustomBarChart
            title="نسبة تغطية البنية التحتية الخضراء"
            data={greenInfraData}
            xKey="label"
            barKey="value"
            barColor="#22c55e"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedIndicators.circular && (
            <StatCard
              title="مؤشر الاقتصاد الدائري"
              value={data.circular_economy_score_percent + "%"}
            />
          )}
          {selectedIndicators.waterEnergy && (
            <StatCard
              title="كفاءة الماء والطاقة (ك.و.س/م³)"
              value={data.water_energy_nexus_efficiency.energy_per_m3_water_kwh}
            />
          )}
        </div>

        {selectedIndicators.carbon && (
          <StatCard
            title="معدل التقدم نحو الحياد الكربوني"
            value={data.carbon_neutrality_progress_percent + "%"}
          />
        )}
      </div>
    </>
  );
};

export default Sustainability;
