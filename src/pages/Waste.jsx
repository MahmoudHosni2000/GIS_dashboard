import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import StatCard from "../components/StatCard";
import CustomPieChart from "../components/CustomPieChart";
import CustomBarChart from "../components/CustomBarChart";
import MapView from "../components/MapView";
import SplashScreen from "../components/SplashScreen";
import { useNavigate } from "react-router-dom";

const Waste = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const theme = localStorage.getItem("theme") || "dark";
  const navigate = useNavigate();

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
    const localData = localStorage.getItem("wasteFormData");

    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) {
          setData(parsed);
          setFilteredData(parsed);
        } else {
          console.warn("بيانات localStorage غير صحيحة، استخدام مصفوفة فارغة.");
        }
      } catch (error) {
        console.error("خطأ في تحليل بيانات localStorage:", error);
      }
    } else {
      console.log("لا توجد بيانات في localStorage.");
    }
  }, []);

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    if (city) {
      setFilteredData(data.filter((item) => item.city === city));
    } else {
      setFilteredData(data);
    }
  };

  // إذا البيانات لسة مش جاهزة أو مش مصفوفة
  if (!Array.isArray(filteredData)) {
    return (
      <div>
        {" "}
        <SplashScreen />{" "}
      </div>
    );
  }

  const cities = Array.from(new Set(data.map((item) => item.city)));

  // تصفية المدن التي لا تحتوي على قيمة فارغة
  const filteredCities = cities.filter((city) => city);

  useEffect(() => {
    if (filteredCities.length > 0 && !selectedCity) {
      setSelectedCity(filteredCities[0]);
      setFilteredData(data.filter((item) => item.city === filteredCities[0]));
    }
  }, [filteredCities, selectedCity, data]);

  // تجهيز بيانات الرسوم
  const recyclableData = Object.entries(
    filteredData[0]?.generation_collection?.recyclable_generated_tpd || {}
  ).map(([name, value]) => ({ name, value }));

  const ucoData = Object.entries(
    filteredData[0]?.generation_collection?.collected_uco_liters || {}
  ).map(([name, value]) => ({ name, value }));

  const ucoMonthlyData = Object.entries(
    filteredData[0]?.generation_collection?.collected_uco_liters_month || {}
  ).map(([name, value]) => ({ name, value }));

  const weeeProcessingData = [
    {
      name: "مُعاد تدويره/مُجدد",
      value:
        filteredData[0]?.hazardous_waste?.weee_processing
          ?.recycled_refurbished_percent ?? 0,
    },
    {
      name: "تمت إزالة المواد الخطرة",
      value:
        filteredData[0]?.hazardous_waste?.weee_processing
          ?.hazardous_material_removed_percent ?? 0,
    },
  ];

  const circularEngagementData = [
    {
      name: "المبادرات المحلية",
      value:
        filteredData[0]?.circular_economy_community_engagement
          ?.number_of_active_local_initiatives ?? 0,
    },
    {
      name: "أحداث المشاركة",
      value:
        filteredData[0]?.circular_economy_community_engagement
          ?.stakeholder_engagement?.events_count ?? 0,
    },
    {
      name: "مشاركون",
      value:
        filteredData[0]?.circular_economy_community_engagement
          ?.stakeholder_engagement?.estimated_participants ?? 0,
    },
  ];

  return (
    <>
      <Helmet>
        <title>لوحة معلومات مؤشرات النفايات</title>
      </Helmet>

      <div className="flex flex-col space-y-4 text-right rtl" dir="rtl">
        <h1 className="mx-auto text-3xl font-extrabold">
          لوحة مؤشرات الأداء العام للنفايات
        </h1>
        <section>
          {/* اختيار المدينة */}
          <div className="flex flex-col space-y-4 text-right rtl" dir="rtl">
            <select
              onChange={handleCityChange}
              value={selectedCity}
              className="p-2 border rounded-md dark:bg-gray-600 dark:text-white bg-white"
              style={{ width: "-webkit-fill-available" }}
            >
              <option disabled value="">
                اختر مدينة
              </option>
              {filteredCities.map((city, idx) => (
                <option key={idx} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {/* زر التعديل */}
            <button
              onClick={() => navigate("/WasteForm")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              تعديل بيانات النفايات
            </button>
          </div>

          {/* عرض البيانات */}
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => {
              return (
                <div key={index}>
                  {/* I. توليد النفايات وجمعها */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">
                      I. توليد النفايات وجمعها
                    </h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <StatCard
                        title="النفايات الصلبة (طن/يوم)"
                        value={
                          item.generation_collection?.total_generated_tpd
                            ?.MSW ?? 0
                        }
                      />
                      <StatCard
                        title="نفايات البناء والهدم (طن/يوم)"
                        value={
                          item.generation_collection?.total_generated_tpd?.[
                            "C&D"
                          ] ?? 0
                        }
                      />
                      <StatCard
                        title="النفايات الأخرى (طن/يوم)"
                        value={
                          item.generation_collection?.total_generated_tpd
                            ?.other ?? 0
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <StatCard
                        title="كفاءة التحصيل"
                        value={`${
                          item.generation_collection
                            ?.collection_efficiency_percent ?? 0
                        }%`}
                      />
                      <StatCard
                        title="معدل فيضان الحاوية المفتوحة"
                        value={`${
                          item.generation_collection
                            ?.open_container_overflow_rate_percent ?? 0
                        }%`}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <CustomPieChart
                        data={recyclableData}
                        dataKey="value"
                        nameKey="name"
                        title="النفايات القابلة لإعادة التدوير"
                      />
                      <CustomBarChart
                        data={ucoMonthlyData}
                        xKey="name"
                        barKey="value"
                        title="UCO المُجمّع بمرور الوقت"
                      />
                      <CustomBarChart
                        data={ucoData}
                        xKey="name"
                        barKey="value"
                        title="الديزل الحيوي المُنتج من UCO"
                      />
                    </div>
                  </section>

                  {/* II. معالجة النفايات وتحويلها */}
                  <section className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">
                      II. معالجة النفايات وتحويلها
                    </h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <StatCard
                        title="معدل التحويل"
                        value={`${
                          item.processing_diversion
                            ?.overall_diversion_rate_percent ?? 0
                        }%`}
                      />
                      <StatCard
                        title="وقود الديزل الحيوي من UCO"
                        value={`${
                          item.processing_diversion
                            ?.biodiesel_from_uco_liters ?? 0
                        } L`}
                      />
                      <StatCard
                        title="معدل إعادة التدوير الإجمالي"
                        value={`${
                          item.processing_diversion
                            ?.overall_recycling_rate_percent ?? 0
                        }%`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <StatCard
                        title="مشاركة فصل المصدر"
                        value={`${
                          item.processing_diversion?.source_segregation
                            ?.participation_rate_percent ?? 0
                        }%`}
                      />
                      <StatCard
                        title="تحويل النفايات العضوية إلى سماد"
                        value={`${
                          item.processing_diversion
                            ?.organic_waste_composting_percent ?? 0
                        }%`}
                      />
                    </div>
                  </section>

                  {/* III. إدارة النفايات الخطرة */}
                  <section className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">
                      III. إدارة النفايات الخطرة
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="grid grid-cols-1 gap-4 h-auto">
                        <StatCard
                          title="النفايات الطبية (طن/شهر)"
                          value={item.hazardous_waste?.medical_waste_tpm ?? 0}
                          className="flex items-center justify-center flex-col"
                        />
                        <StatCard
                          title="النفايات الكهربائية والإلكترونية (طن/شهر)"
                          value={item.hazardous_waste?.weee_collected_tpm ?? 0}
                          className="flex items-center justify-center flex-col"
                        />
                      </div>
                      <CustomPieChart
                        data={weeeProcessingData}
                        dataKey="value"
                        nameKey="name"
                        title="معالجة النفايات الإلكترونية والكهربائية"
                      />
                    </div>
                  </section>

                  {/* IV. المشاركة في الاقتصاد الدائري */}
                  <section className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">
                      IV. المشاركة في الاقتصاد الدائري
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <CustomBarChart
                        data={circularEngagementData}
                        xKey="name"
                        barKey="value"
                        title="مؤشرات المشاركة المجتمعية"
                      />{" "}
                      <div className="grid grid-cols-1 gap-4 h-auto">
                        <StatCard
                          title="المبادرات المحلية النشطة"
                          value={
                            item.circular_economy_community_engagement
                              ?.number_of_active_local_initiatives ?? 0
                          }
                        />
                        <StatCard
                          title="أحداث المشاركة"
                          value={
                            item.circular_economy_community_engagement
                              ?.stakeholder_engagement?.events_count ?? 0
                          }
                        />
                      </div>
                    </div>
                  </section>
                  {/* V. عرض الإحداثيات */}
                  <section className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">
                      V. عرض الإحداثيات
                    </h2>
                    <MapView data={item} />
                  </section>
                </div>
              );
            })
          ) : (
            <p>لا توجد بيانات لعرضها لهذه المدينة.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default Waste;
