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
    { name: "(للمدينة)", value: getValue("productionCapacityCities") },
    { name: "(للفنادق)", value: getValue("productionCapacityHotels") },
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

      <div className="flex flex-col h-full space-y-4 text-right rtl">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">اختيار المدينة والسنة</h2>
          <div className="flex gap-4">
            <select
              dir="rtl"
              name="city"
              className="border p-2 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white"
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
              className="border p-2 rounded basis-1/4 dark:bg-gray-600 dark:text-white bg-white"
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
            className="bg-green-500 text-white p-2 rounded col-span-2 mt-4"
          >
            تعديل بيانات المياه
          </button>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
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
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">محطات التحلية</h2>
          <div className="flex gap-6">
            <div className="w-1/2">
              <CustomBarChart
                data={desalinationCapacityData}
                xKey="name"
                barKey="value"
                barColor="#60a5fa"
                title="سعة التحلية"
              />
            </div>
            <div className="w-1/2">
              <CustomBarChart
                data={productionCapacityData}
                xKey="name"
                barKey="value"
                barColor="#34d399"
                title="القدرة الإنتاجية"
              />
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            محطات المعالجة مقابل التحلية
          </h2>
          <div className="flex gap-6">
            <div className="w-1/2">
              <CustomPieChart
                data={treatmentVsDesalination}
                dataKey="value"
                nameKey="name"
                colors={["#34d399", "#facc15"]}
                title="المعالجة مقابل التحلية"
              />
            </div>
            <div className="w-1/2">
              <CustomPieChart
                data={Desalination_plants}
                dataKey="value"
                nameKey="name"
                colors={["#34d399", "#facc15"]}
                title="عدد محطات المعالجه مقابل التحليه"
              />
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">كمية مياه الصرف الصحي</h2>
          <div className="grid grid-cols-1 gap-4">
            <StatCard
              title="كمية مياه الصرف"
              value={`${getSewageVolume()} م³/سنة`}
            />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">الإحداثيات</h2>
          <div className="h-96">
            <MapView data={mapData || {}} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Water;
