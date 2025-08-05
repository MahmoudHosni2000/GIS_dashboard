import { useEffect, useState } from "react";
import CustomPieChart from "../components/CustomPieChart";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapDash from "../components/MapDash";

const Water = () => {
  const [data, setData] = useState([]);
  const [selectedCity, setselectedCity] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const savedData =
      JSON.parse(localStorage.getItem("waterFormDataStack")) || [];
    setData(savedData);
  }, []);

  const filteredData =
    selectedCity === "all"
      ? data
      : data.filter((item) => item.city?.trim() === selectedCity.trim());

  const cityNames = [
    "all",
    ...new Set(data.map((item) => item.city?.trim()).filter(Boolean)),
  ];

  const getFilteredAvg = (key) => {
    const values = filteredData.map((item) => Number(item[key]) || 0);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / values.length);
  };

  const getFilteredSewageVolume = () => {
    const fields = [
      "sewageVolume_2021",
      "sewageVolume_2022",
      "sewageVolume_2023",
      "sewageVolume_2024",
    ];
    const values = filteredData
      .map((item) =>
        fields
          .map((field) => Number(item[field]) || 0)
          .filter((val) => val !== 0)
      )
      .flat();

    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / values.length);
  };

  const desalinationCapacityData = [
    { name: "المدينة", value: getFilteredAvg("desalinationPlantsCities") },
    { name: "الفنادق", value: getFilteredAvg("desalinationPlantsHotels") },
  ];

  const productionCapacityData = [
    { name: "للمدينة", value: getFilteredAvg("productionCapacityCities") },
    { name: "للفنادق", value: getFilteredAvg("productionCapacityHotels") },
  ];

  const Desalination_plants = [
    {
      name: "عدد محطات التحلية (مدن)",
      value: getFilteredAvg("desalinationPlantsCities"),
    },
    {
      name: "عدد محطات التحلية (فنادق)",
      value: getFilteredAvg("desalinationPlantsHotels"),
    },
  ];

  const treatmentVsDesalination = [
    { name: "محطات المعالجة", value: getFilteredAvg("treatmentPlantsCount") },
    {
      name: "محطات التحلية",
      value:
        getFilteredAvg("desalinationPlantsCities") +
        getFilteredAvg("desalinationPlantsHotels"),
    },
  ];

  const getResponseStatusCount = () => {
    const statusCount = { مقبول: 0, مرفوض: 0 };
  
    filteredData.forEach((item) => {
      const status = item.responseStatus?.trim();
      if (status === "مقبول") statusCount.مقبول += 1;
      else if (status === "مرفوض") statusCount.مرفوض += 1;
    });
  
    return statusCount;
  };
  const responseStats = getResponseStatusCount();
  
  console.log(getFilteredAvg("waterConsumption"));

  return (
    <>
      <Helmet>
        <title>المياه | لوحة تحكم GIS</title>
      </Helmet>

      <div
        className="flex flex-col space-y-6 text-right h-[-webkit-fill-available] w-[-webkit-fill-available]"
        dir="rtl"
      >
        <div className="flex flex-col gap-2 text-right">
          <h1 className="mx-auto text-3xl font-extrabold p-2.5 bg-white/55 rounded-md backdrop-blur-md w-full flex justify-center">
            لوحة مؤشرات الأداء العام للمياة
          </h1>
          <div className="flex flex-col gap-2 text-right rtl">
            <select
              dir="rtl"
              name="station"
              className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
              value={selectedCity}
              onChange={(e) => setselectedCity(e.target.value)}
            >
              {cityNames.map((city, index) => (
                <option key={index} value={city}>
                  {city === "all" ? "جميع المدن (متوسط)" : city}
                </option>
              ))}
            </select>

            <button
              onClick={() => navigate("/WaterForm")}
              className="bg-green-500 text-white p-1 rounded text-[10px] sm:text-xs md:text-sm"
            >
              تعديل بيانات المياه
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 flex-1 min-h-[400px]">
          {/* الجزء الأول: 1/3 */}
          <div className="col-span-1 overflow-y-auto pr-2 h-full" dir="ltr">
            <div>
              <h2 className="text-lg font-bold mb-2">
                استهلاك المياه ونسبة التسرب
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="استهلاك المياه"
                  value={`${getFilteredAvg("waterConsumption")} م³/سنة`}
                />
                <StatCard
                  title="نسبة التسرب"
                  value={`${getFilteredAvg("leakagePercent")} %`}
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">محطات التحلية</h2>
              <div className="gap-3 grid grid-cols-1">
                <div>
                  <StatCard
                    title="عدد السكان المستفيدين"
                    value={`${getFilteredAvg("beneficiaryPopulation")} %`}
                  />
                </div>
                <div>
                  <StatCard
                    title="كمية المياه الداخلة للمحطة (م³)"
                    value={`${getFilteredAvg("inputWaterVolume")} %`}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">
                محطات المعالجة مقابل التحلية
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <StatCard
                    title="كمية المياه المفقودة (م³)"
                    value={`${getFilteredAvg("lostWaterVolume")} %`}
                  />
                </div>
                <div>
                  <StatCard
                    title="الكمية المعالجة فعليًا (م³)"
                    value={`${getFilteredAvg("actualTreatedVolume")} %`}
                  />
                </div>
                <StatCard
                  title="عدد الحالات المقبولة"
                  value={`${responseStats.مقبول}`}
                />

                <StatCard
                  title="عدد الحالات المرفوضة"
                  value={`${responseStats.مرفوض}`}
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">كمية مياه الصرف الصحي</h2>
              <div className="grid grid-cols-1 gap-4">
                <StatCard
                  title="كمية مياه الصرف"
                  value={`${getFilteredSewageVolume()} م³/سنة`}
                />
              </div>
            </div>
          </div>

          {/* العمود الخاص بالخريطة - 2/3 */}
          <div className="md:col-span-2 h-full rounded-xl leaflet-container !bg-transparent">
            <MapDash initialData={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Water;
