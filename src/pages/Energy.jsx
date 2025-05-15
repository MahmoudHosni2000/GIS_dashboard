import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Zap, Lightbulb, LayoutGrid } from "lucide-react";
import MapView from "../components/MapView";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Energy = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [diffs, setDiffs] = useState({});
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

  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem("energyFormData");

    if (localData) {
      const parsed = JSON.parse(localData);

      // تحويل القيم إلى أرقام
      const dataObj = {
        pv_capacity_mwp: parseFloat(parsed.pv_capacity_mwp),
        latitude: parseFloat(parsed.latitude),
        longitude: parseFloat(parsed.longitude),
        solar_energy_production: parseFloat(parsed.solar_energy_production),
        electricity_consumption: parseFloat(parsed.electricity_consumption),
        solar_coverage_percent: parseFloat(parsed.solar_coverage_percent),
        daily_consumption_per_guest: parseFloat(
          parsed.daily_consumption_per_guest
        ),
        smart_rooms: parseInt(parsed.smart_rooms),
        dimmable_area_percent: parseFloat(parsed.dimmable_area_percent),
      };
      console.log("Data from localStorage:", dataObj);

      setData(dataObj);
    } else {
      // إذا لم توجد بيانات في localStorage
      setData({
        pv_capacity_mwp: 0,
        solar_energy_production: 0,
        electricity_consumption: 0,
        solar_coverage_percent: 0,
        daily_consumption_per_guest: 0,
        smart_rooms: 0,
        dimmable_area_percent: 0,
        monthly_generation_mwh: 0,
      });
    }

    setTimeout(() => setShowSplash(false), 200);
  }, []);

  useEffect(() => {
    const storedDiffs = JSON.parse(localStorage.getItem("energyFormDataDiff"));
    if (storedDiffs) {
      setDiffs(storedDiffs);
    }
  }, []);

  console.log("Diffs from localStorage:", diffs);

  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (showSplash || !data) return <SplashScreen />;

  // تقسيم الكروت حسب الفئة
  const solarEnergyCards = [
    {
      label: "القدرة الشمسية المركبة",
      value: `${data.pv_capacity_mwp} ميغاواط بيك`,
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      percentage: diffs.pv_capacity_mwp,
    },
    {
      label: "نسبة التغطية بالطاقة الشمسية",
      value: `${data.solar_coverage_percent}%`,
      icon: <Zap className="w-6 h-6 text-green-600" />,
      percentage: diffs.solar_coverage_percent,
    },
    {
      label: "الطاقة الكهربائية المنتجة من الطاقة الشمسية (MWh/سنة أو شهر)",
      value: `${data.solar_energy_production}%`,
      icon: <LayoutGrid className="w-6 h-6 text-green-500" />,
      percentage: diffs.solar_energy_production,
    },
  ];

  const electricityCards = [
    {
      label: "استهلاك الطاقة الكهربائية (MWh/سنة أو شهر)",
      value: `${data.electricity_consumption}%`,
      icon: <LayoutGrid className="w-6 h-6 text-green-500" />,
      percentage: diffs.electricity_consumption,
    },
    {
      label: "متوسط استهلاك النزيل",
      value: `${data.daily_consumption_per_guest} ك.و.س/يوم`,
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      percentage: diffs.daily_consumption_per_guest,
    },
  ];

  const smartRoomCards = [
    {
      label: "عدد الغرف الذكية",
      value: data.smart_rooms,
      icon: <Lightbulb className="w-6 h-6 text-blue-500" />,
      percentage: diffs.smart_rooms,
    },
    {
      label: "نسبة المساحات القابلة للتعتيم",
      value: `${data.dimmable_area_percent}%`,
      icon: <LayoutGrid className="w-6 h-6 text-green-500" />,
      percentage: diffs.dimmable_area_percent,
    },
  ];

  console.log(diffs.dimmable_area_percent);

  return (
    <>
      <Helmet>
        <title>الطاقة | لوحة المؤشرات</title>
      </Helmet>
      <div className="flex flex-col space-y-4 text-right" dir="rtl">
        <h1 className="mx-auto text-3xl font-extrabold">
          لوحة مؤشرات الأداء العام للطاقة
        </h1>
        {/* فلتر الصفحة */}
        <div className="flex flex-col space-y-4 text-right rtl">
          <select
            dir="rtl"
            className="border p-2 rounded-lg dark:bg-gray-600 dark:text-white bg-white"
            value={selectedCategory}
            onChange={handleFilterChange}
          >
            <option value="all">عرض الكل</option>
            <option value="solar_energy">الطاقة الشمسية</option>
            <option value="electricity_consunption">استهلاك الكهرباء</option>
            <option value="smart_rooms">
              الغرف الذكية والمساحات القابلة للتعتيم
            </option>
            <option value="map">عرض الإحداثيات</option>
          </select>
          <button
            onClick={() => navigate("/EnergyForm")}
            className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2 m-0"
          >
            تعديل بيانات الطاقة
          </button>
        </div>

        {/* كروت الطاقة الشمسية */}
        {(selectedCategory === "all" ||
          selectedCategory === "solar_energy") && (
          <>
            <h2 className="text-2xl font-bold text-right rtl mt-6">
              I. الطاقة الشمسية
            </h2>
            <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {solarEnergyCards.map((item, i) => (
                <Card
                  key={i}
                  icon={item.icon}
                  value={item.value}
                  label={item.label}
                  percentage={item.percentage}
                />
              ))}
            </div>
          </>
        )}

        {/* كروت استهلاك الكهرباء */}
        {(selectedCategory === "all" ||
          selectedCategory === "electricity_consunption") && (
          <>
            <h2 className="text-2xl font-bold text-right rtl mt-6">
              II. استهلاك الكهرباء
            </h2>
            <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {electricityCards.map((item, i) => (
                <Card
                  key={i}
                  icon={item.icon}
                  value={item.value}
                  label={item.label}
                  percentage={item.percentage}
                />
              ))}
            </div>
          </>
        )}

        {/* كروت الغرف الذكية والتعتيم */}
        {(selectedCategory === "all" || selectedCategory === "smart_rooms") && (
          <>
            <h2 className="text-2xl font-bold text-right rtl mt-6">
              III. الغرف الذكية والمساحات القابلة للتعتيم
            </h2>
            <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {smartRoomCards.map((item, i) => (
                <Card
                  key={i}
                  icon={item.icon}
                  value={item.value}
                  label={item.label}
                  percentage={item.percentage}
                />
              ))}
            </div>
          </>
        )}

        {(selectedCategory === "all" || selectedCategory === "map") && (
          <>
            <h2 className="text-2xl font-bold mb-4">IV. عرض الإحداثيات</h2>
            <MapView data={data} />
          </>
        )}
      </div>
    </>
  );
};

export default Energy;
