import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";

const Sustainability = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const theme = localStorage.getItem("theme") || "dark";

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else if (theme === "light") {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      html.classList.toggle("dark", isDark);
      html.classList.toggle("light", !isDark);
    }
  }, [theme]);

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
      value:
        data?.sustainable_transport_index?.public_transport_share_percent ?? 0,
    },
    {
      label: "مسارات الدراجات (كم)",
      value: data?.sustainable_transport_index?.bike_lanes_km ?? 0,
    },
    {
      label: "مناطق المشاة (كم)",
      value: data?.sustainable_transport_index?.pedestrian_zones_km ?? 0,
    },
  ];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>الاستدامة | لوحة المعلومات الجغرافية</title>
      </Helmet>

      <div className="flex flex-col space-y-4 text-right p-4" dir="rtl">
        <h1 className="mx-auto text-3xl font-extrabold mb-5">
          لوحة مؤشرات الأداء العام للاستدامة والمرونة المناخية
        </h1>

        {/* ComboBox لتحديد القسم */}
        <div className="mb-4 flex items-center gap-4">
          <label htmlFor="category" className="font-medium text-gray-700 dark:text-white">
            اختر القسم:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white bg-white"
          >
            <option value="الكل">الكل</option>
            <option value="الطاقة والبيئة">الطاقة والبيئة</option>
            <option value="النقل المستدام">النقل المستدام</option>
            <option value="تغطية البنية التحتية الخضراء">
              تغطية البنية التحتية الخضراء
            </option>
            <option value="إحداثيات الموقع">إحداثيات الموقع</option>
          </select>

          <button
            onClick={() => navigate("/SustainabilityForm")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            تعديل بيانات الاستدامة
          </button>
        </div>

        {/* المحتوى حسب القسم */}
        {(selectedCategory === "الكل" ||
          selectedCategory === "الطاقة والبيئة") && (
          <section>
            <h2 className="text-2xl font-bold mb-4">I. الطاقة والبيئة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard
                title="القدرة الشمسية (ميغاواط)"
                value={data?.solar_capacity_mw ?? 0}
              />
              <StatCard
                title="تحويل النفايات إلى طاقة (ميغاواط ساعة/سنة)"
                value={data?.waste_to_energy_mwh_per_year ?? 0}
              />
              <StatCard
                title="مؤشر مخاطر المناخ"
                value={data?.climate_risk_index ?? 0}
              />
              <StatCard
                title="كفاءة الماء والطاقة (ك.و.س/م³)"
                value={
                  data?.water_energy_nexus_efficiency
                    ?.energy_per_m3_water_kwh ?? 0
                }
              />
              <StatCard
                title="معدل التقدم نحو الحياد الكربوني"
                value={data?.carbon_neutrality_progress_percent + "%" ?? "0%"}
              />
              <StatCard
                title="مؤشر الاقتصاد الدائري"
                value={data?.circular_economy_score_percent + "%" ?? "0%"}
              />
            </div>
          </section>
        )}

        {(selectedCategory === "الكل" ||
          selectedCategory === "النقل المستدام") && (
          <section>
            <h2 className="text-2xl font-bold mb-4">II. النقل المستدام</h2>
            <CustomBarChart
              title="مؤشر النقل المستدام"
              data={transportData}
              xKey="label"
              barKey="value"
              barColor="#3b82f6"
            />
          </section>
        )}

        {(selectedCategory === "الكل" ||
          selectedCategory === "تغطية البنية التحتية الخضراء") && (
          <section>
            <h2 className="text-2xl font-bold mb-4">
              III. تغطية البنية التحتية الخضراء
            </h2>
            <StatCard
              title="نسبة تغطية البنية التحتية الخضراء"
              value={
                data?.green_infrastructure_coverage_percent
                  ? `${data.green_infrastructure_coverage_percent}%`
                  : "0%"
              }
            />
          </section>
        )}

        {(selectedCategory === "الكل" ||
          selectedCategory === "إحداثيات الموقع") && (
          <section>
            <h2 className="text-2xl font-bold mb-4">IV. إحداثيات الموقع</h2>
            <div className="grid grid-cols-1 gap-4">
              <MapView data={data} />
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Sustainability;
