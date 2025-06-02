import { useEffect, useState } from "react";
import CustomPieChart from "../components/CustomPieChart";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";

const Water = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("cityA");
  const [selectedYear, setSelectedYear] = useState("all");

  const cities = ["cityA", "cityB", "cityC"];
  const years = ["2021", "2022", "2023", "2024", "all"];

  useEffect(() => {
    const savedData =
      JSON.parse(localStorage.getItem("waterFormDataStack")) || [];
    setData(savedData);
  }, []);

  // فلترة البيانات حسب المدينة
  const cityData = data.filter((item) => item.city === selectedCity);

  // لو المستخدم اختار "all" نحسب المتوسط، غير كده نرجع بيانات السنة
  const getValue = (key) => {
    if (selectedYear === "all") {
      const values = cityData.map((item) => Number(item[key]) || 0);
      if (values.length === 0) return 0;
      const sum = values.reduce((acc, val) => acc + val, 0);
      return Math.round(sum / values.length);
    } else {
      const entry = cityData.find((item) => item.year === selectedYear);
      return entry ? Number(entry[key]) || 0 : 0;
    }
  };

  const desalinationCapacityData = [
    { name: "المدينة", value: getValue("desalinationPlantsCities") },
    { name: "الفنادق", value: getValue("desalinationPlantsHotels") },
  ];

  const productionCapacityData = [
    { name: "للمدينة", value: getValue("productionCapacityCities") },
    { name: "للفنادق", value: getValue("productionCapacityHotels") },
  ];

  const Desalination_plants = [
    {
      name: "عدد محطات التحلية (مدن)",
      value: getValue("desalinationPlantsCities"),
    },
    {
      name: "عدد محطات التحلية (فنادق)",
      value: getValue("desalinationPlantsHotels"),
    },
  ];

  const treatmentVsDesalination = [
    { name: "محطات المعالجة", value: getValue("treatmentPlantsCount") },
    {
      name: "محطات التحلية",
      value:
        getValue("desalinationPlantsCities") +
        getValue("desalinationPlantsHotels"),
    },
  ];

  // أول عنصر من المدينة والسنة المختارة (للخريطة)
  const mapData =
    selectedYear === "all"
      ? cityData[0] // أول إدخال للمدينة
      : cityData.find((item) => item.year === selectedYear);

  // داله لحساب كميه الصرف الصحي
  const getSewageVolume = () => {
    if (selectedYear === "all") {
      const fields = [
        "sewageVolume_2021",
        "sewageVolume_2022",
        "sewageVolume_2023",
        "sewageVolume_2024",
      ];
      const values = cityData
        .map((item) =>
          fields
            .map((field) => Number(item[field]) || 0)
            .filter((val) => val !== 0)
        )
        .flat();

      if (values.length === 0) return 0;
      const sum = values.reduce((acc, val) => acc + val, 0);
      return Math.round(sum / values.length);
    } else {
      const field = `sewageVolume_${selectedYear}`;
      const entry = cityData.find((item) => item[field] !== undefined);
      return entry ? Number(entry[field]) || 0 : 0;
    }
  };

  return (
    <>
      <Helmet>
        <title>المياه | لوحة تحكم GIS</title>
      </Helmet>

      <div
        className="flex flex-col space-y-6 text-right h-[-webkit-fill-available]"
        dir="rtl"
      >
        <h1 className="mx-auto text-3xl font-extrabold p-2.5 bg-white/55 rounded-md backdrop-blur-md w-full flex justify-center">
          لوحة مؤشرات الأداء العام للمياة
        </h1>{" "}
        <div className="flex flex-col gap-2 text-right rtl">
          {" "}
          <div className="flex gap-2">
            <select
              dir="rtl"
              name="city"
              className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              dir="rtl"
              name="year"
              className="border p-1 rounded basis-1/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === "all" ? "جميع السنوات (متوسط)" : year}
                </option>
              ))}
            </select>
          </div>
        <button
          onClick={() => navigate("/WaterForm")}
          className="bg-green-500 text-white p-1 rounded text-[10px] sm:text-xs md:text-sm"
        >
          تعديل بيانات المياه
        </button>
        </div>
        <div className="grid grid-cols-3 gap-2 flex-1 h-0">
          {/* الجزء الأول: 1/3 */}
          <div className="col-span-1 overflow-y-auto pr-2 h-full" dir="ltr">
            <div>
              <h2 className="text-lg font-bold mb-2">
                استهلاك المياه ونسبة التسرب
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="استهلاك المياه"
                  value={`${getValue("waterConsumption")} م³/سنة`}
                />
                <StatCard
                  title="نسبة التسرب"
                  value={`${getValue("leakagePercent")} %`}
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">محطات التحلية</h2>
              <div className="gap-3 grid grid-cols-1">
                <div>
                  <CustomBarChart
                    data={desalinationCapacityData}
                    xKey="name"
                    barKey="value"
                    barColor="#60a5fa"
                    title="سعة التحلية"
                  />
                </div>
                <div>
                  <CustomBarChart
                    data={productionCapacityData}
                    xKey="name"
                    barKey="value"
                    barColor="#34d399"
                    title="القدرة الإنتاجية"
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
                  <CustomPieChart
                    data={treatmentVsDesalination}
                    dataKey="value"
                    nameKey="name"
                    colors={["#34d399", "#facc15"]}
                    title="المعالجة مقابل التحلية"
                  />
                </div>
                <div>
                  <CustomPieChart
                    data={Desalination_plants}
                    dataKey="value"
                    nameKey="name"
                    colors={["#34d399", "#facc15"]}
                    title="عدد محطات المعالجه مقابل التحليه"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">كمية مياه الصرف الصحي</h2>
              <div className="grid grid-cols-1 gap-4">
                <StatCard
                  title="كمية مياه الصرف"
                  value={`${getSewageVolume()} م³/سنة`}
                />
              </div>
            </div>
          </div>

          {/* العمود الخاص بالخريطة - 2/3 */}
          <div className="md:col-span-2 h-full rounded-xl leaflet-container !bg-transparent">
            <h2 className="text-lg font-bold mb-2">عرض الإحداثيات</h2>
            <MapView data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Water;
