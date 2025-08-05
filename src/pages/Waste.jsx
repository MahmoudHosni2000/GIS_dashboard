import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import StatCard from "../components/StatCard";
import CustomPieChart from "../components/CustomPieChart";
import CustomBarChart from "../components/CustomBarChart";
import MapView from "../components/MapView";
import SplashScreen from "../components/SplashScreen";
import { useNavigate } from "react-router-dom";
import MapDash from "../components/MapDash";

const Waste = () => {
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showBranchSelect, setShowBranchSelect] = useState(false);
  const [cityBranches, setCityBranches] = useState([]);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  // const [showSplash, setShowSplash] = useState(true);
  const [mapData, setMapData] = useState([]);

  const defaultWasteData = [
    {
      city: "",
      generation_collection: {
        total_generated_tpd: {
          MSW: 0,
          "C&D": 0,
          other: 0,
        },
        collection_efficiency_percent: 0,
        open_container_overflow_rate_percent: 0,
        recyclable_generated_tpd: {
          بلاستيك: 0,
          ورق: 0,
        },
        collected_uco_liters: {
          مطعم_أ: 0,
          مطعم_ب: 0,
        },
        collected_uco_liters_month: {
          يناير: 0,
          فبراير: 0,
        },
      },
      processing_diversion: {
        overall_diversion_rate_percent: 0,
        biodiesel_from_uco_liters: 0,
        overall_recycling_rate_percent: 0,
        source_segregation: {
          participation_rate_percent: 0,
        },
        organic_waste_composting_percent: 0,
      },
      hazardous_waste: {
        medical_waste_tpm: 0,
        weee_collected_tpm: 0,
        weee_processing: {
          recycled_refurbished_percent: 0,
          hazardous_material_removed_percent: 0,
        },
      },
      circular_economy_community_engagement: {
        number_of_active_local_initiatives: 0,
        stakeholder_engagement: {
          events_count: 0,
          estimated_participants: 0,
        },
      },
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem("wasteFormData");

    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) {
          setData(parsed);
          setFilteredData(parsed);
        } else {
          console.warn(
            "بيانات localStorage غير صحيحة، استخدام البيانات الافتراضية."
          );
          setData(defaultWasteData);
          setFilteredData(defaultWasteData);
        }
      } catch (error) {
        console.error("خطأ في تحليل بيانات localStorage:", error);
        setData(defaultWasteData);
        setFilteredData(defaultWasteData);
      }
    } else {
      console.log(
        "لا توجد بيانات في localStorage. استخدام البيانات الافتراضية."
      );
      setData(defaultWasteData);
      setFilteredData(defaultWasteData);
    }
  }, []);
  // دالة لتحويل كل القيم الرقمية النصية إلى أرقام فعلية
  const transformToNumbers = (obj) => {
    for (const key in obj) {
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        transformToNumbers(obj[key]);
      } else if (!isNaN(obj[key]) && obj[key] !== "") {
        obj[key] = Number(obj[key]);
      }
    }
  };

  const mergeDataForCity = (entries) => {
    if (entries.length === 1) return entries;
    setMapData(entries);
    // تحويل كل القيم لرقمية
    entries.forEach((entry) => transformToNumbers(entry));

    const merged = JSON.parse(JSON.stringify(entries[0]));

    for (let i = 1; i < entries.length; i++) {
      const current = entries[i];

      const deepMerge = (target, source) => {
        for (const key in source) {
          if (
            typeof source[key] === "object" &&
            source[key] !== null &&
            !Array.isArray(source[key])
          ) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
          } else if (typeof source[key] === "number") {
            target[key] = (target[key] || 0) + source[key];
          }
        }
      };

      deepMerge(merged, current);
    }

    return [merged];
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    if (city) {
      const filtered = data.filter((item) => item.city === city);

      if (filtered.length > 1) {
        setShowBranchSelect(true);
        setCityBranches(filtered);
      } else {
        setShowBranchSelect(false);
      }

      const merged = mergeDataForCity(filtered);
      console.log("✅ بيانات مدموجة:", merged); // لمراقبة الدمج في الكونسول
      setFilteredData(merged);
    } else {
      setFilteredData(data);
      setShowBranchSelect(false);
    }
  };

  if (!Array.isArray(filteredData)) {
    return <SplashScreen />;
  }

  const cities = Array.from(new Set(data.map((item) => item.city)));
  const filteredCities = cities.filter((city) => city);

  useEffect(() => {
    if (filteredCities.length > 0 && !selectedCity) {
      setSelectedCity(filteredCities[0]);
      const initialFiltered = data.filter(
        (item) => item.city === filteredCities[0]
      );
      setFilteredData(mergeDataForCity(initialFiltered));
    }
  }, [filteredCities, selectedCity, data]);

  // تجهيز بيانات الرسوم البيانية
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
  console.log("Filtered Dataa:", filteredData);

  return (
    <>
      <Helmet>
        <title>لوحة معلومات مؤشرات النفايات</title>
      </Helmet>

      <div className="flex flex-col space-y-6 text-right h-[-webkit-fill-available] w-[-webkit-fill-available]">
        <div className="flex flex-col gap-2 text-right">
          <h1 className="mx-auto text-3xl font-extrabold p-2.5 bg-white/55 rounded-md backdrop-blur-md w-full flex justify-center">
            لوحة مؤشرات الأداء العام للنفايات
          </h1>
          {/* اختيار المدينة */}
          <div className="flex flex-col gap-2 text-right rtl">
            <select
              onChange={handleCityChange}
              value={selectedCity}
              className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm w-full"
            >
              <option className="#fff" disabled value="">
                اختر مدينة
              </option>
              {filteredCities.map((city, idx) => (
                <option key={idx} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {showBranchSelect && (
              <select
                className="border w-full p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
                onChange={(e) =>
                  setSelectedBranchIndex(parseInt(e.target.value))
                }
                value={selectedBranchIndex ?? ""}
              >
                <option disabled value="">
                  اختر فرع المدينة
                </option>
                {cityBranches.map((item, idx) => (
                  <option key={idx} value={idx}>
                    {item.city} - {idx + 1}
                  </option>
                ))}
              </select>
            )}

            {/* زر التعديل */}
            <button
              onClick={() => navigate("/WasteForm")}
              className="bg-green-500 text-white p-1 rounded text-[10px] sm:text-xs md:text-sm"
            >
              تعديل بيانات النفايات
            </button>
          </div>
        </div>

        {/* عرض البيانات */}
        {/* عرض البيانات */}
        <div className="grid grid-cols-3 gap-2 flex-1 h-0">
          {/* العمود الأول */}
          <div
            className="col-span-1 overflow-y-auto pr-2 h-full flex flex-col gap-2"
            dir="ltr"
          >
            {(showBranchSelect && selectedBranchIndex !== null
              ? [filteredData[selectedBranchIndex]]
              : filteredData
            ).map((item, index) => (
              <div key={index}>
                {/* توليد النفايات وجمعها */}
                <section>
                  <h2 className="text-lg font-bold mb-2">
                    توليد النفايات وجمعها
                  </h2>
                  <div className="grid grid-cols-3 mb-4 gap-2">
                    <StatCard
                      title="النفايات الصلبة (طن/يوم)"
                      value={
                        item.generation_collection?.total_generated_tpd?.MSW ??
                        0
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
                  <div className="grid grid-cols-2 mb-4 gap-2">
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
                  <div className="grid grid-cols-1 mb-4 gap-2">
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
                  <div className="grid grid-cols-1">
                    <CustomPieChart
                      data={recyclableData}
                      dataKey="value"
                      nameKey="name"
                      title="النفايات القابلة لإعادة التدوير"
                    />
                  </div>
                </section>

                {/* معالجة النفايات وتحويلها */}
                <section className="mt-5">
                  <h2 className="text-lg font-bold mb-2">
                    معالجة النفايات وتحويلها
                  </h2>
                  <div className="grid grid-cols-3 gap-2 mb-4">
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
                        item.processing_diversion?.biodiesel_from_uco_liters ??
                        0
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
                  <div className="grid grid-cols-2 gap-2">
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

                {/* إدارة النفايات الخطرة */}
                <section className="mt-5">
                  <h2 className="text-lg font-bold mb-2">
                    إدارة النفايات الخطرة
                  </h2>

                  <div className="grid grid-cols-1 gap-2">
                    <div className="grid grid-cols-2 gap-2 h-auto">
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
                  </div>

                  {/* Pie chart في صف وحده */}
                  <div className="mt-2">
                    <CustomPieChart
                      data={weeeProcessingData}
                      dataKey="value"
                      nameKey="name"
                      title="معالجة النفايات الإلكترونية والكهربائية"
                    />
                  </div>
                </section>

                {/* المشاركة في الاقتصاد الدائري */}
                <section className="mt-5">
                  <h2 className="text-lg font-bold mb-2">
                    المشاركة في الاقتصاد الدائري
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                    <CustomBarChart
                      data={circularEngagementData}
                      xKey="name"
                      barKey="value"
                      title="مؤشرات المشاركة المجتمعية"
                    />{" "}
                    <div className="grid grid-cols-2 gap-2 h-auto">
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
              </div>
            ))}
          </div>

          {/* العمود الثاني - الخريطة مرة واحدة فقط */}
          <div className="col-span-2 h-full rounded-xl leaflet-container !bg-transparent">
            <MapDash initialData={mapData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Waste;
