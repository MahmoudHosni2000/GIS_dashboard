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

      <div className="flex flex-col space-y-6 text-right h-[-webkit-fill-available]" dir="rtl">
        
        <div className="flex flex-col gap-2 text-right">
          <h1 className="mx-auto text-3xl font-extrabold p-2.5 bg-white/55 rounded-md backdrop-blur-md w-full flex justify-center">
            لوحة مؤشرات الأداء العام للاستدامة والمرونة المناخية
          </h1>

          {/* ComboBox لتحديد القسم */}
          <div className="mb-4 flex items-center gap-4">
            <label
              htmlFor="category"
              className="font-medium text-gray-700 dark:text-white"
            >
              اختر القسم:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
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
              className="bg-green-500 text-white p-1 rounded text-[10px] sm:text-xs md:text-sm"
            >
              تعديل بيانات الاستدامة
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 flex-1 h-0">
          {/* المحتوى النصفي: 1/3 */}
          <div class="col-span-1 overflow-y-auto pr-2 h-full" dir="ltr">
            {/* هنا تحط المحتوى بتاعك، زي الأقسام اللي انت كتبتها */}
            {(selectedCategory === "الكل" ||
              selectedCategory === "الطاقة والبيئة") && (
              <section>
                <h2 className="text-xl font-bold mb-4">الطاقة والبيئة</h2>
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
                    value={
                      data?.carbon_neutrality_progress_percent + "%" ?? "0%"
                    }
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
                <h2 className="text-xl font-bold mb-4">النقل المستدام</h2>
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
                <h2 className="text-xl font-bold mb-4">
                  تغطية البنية التحتية الخضراء
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
          </div>

          {/* جزء الخريطة 2/3 */}
          <div
            className={`mb-6 md:col-span-2 rounded-xl leaflet-container !bg-transparent h-full`}
          >
            {(selectedCategory === "الكل" ||
              selectedCategory === "إحداثيات الموقع") && (
              <section className="h-[inherit]">
                <h2 className="text-xl font-bold mb-4">إحداثيات الموقع</h2>
                <div className="h-full">
                  {" "}
                  {/* تعطي ارتفاع للخريطة عشان تبان كويس */}
                  <MapView data={data} />
                </div>
              </section>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Sustainability;
