import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Zap, Lightbulb, LayoutGrid } from "lucide-react";
import MapView from "../components/MapView";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapDash from "../components/MapDash";

const Energy = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [diffs, setDiffs] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem("energyFormData");

    if (localData) {
      const parsed = JSON.parse(localData);

      const dataObj = {
        solar_energy_unit: parsed.solar_energy_unit,
        electricity_consumption_unit: parsed.electricity_consumption_unit,
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

      // console.log("✔️ Setting data from localStorage:", dataObj);
      setData(dataObj);
    } else {
      // default fallback
      const defaultData = {
        solar_energy_unit: "year",
        electricity_consumption_unit: "year",
        pv_capacity_mwp: 0,
        solar_energy_production: 0,
        electricity_consumption: 0,
        solar_coverage_percent: 0,
        daily_consumption_per_guest: 0,
        smart_rooms: 0,
        dimmable_area_percent: 0,
        monthly_generation_mwh: 0,
      };
      // console.log("⚠️ No localStorage data, using default:", defaultData);
      setData(defaultData);
    }

    setTimeout(() => setShowSplash(false), 200);
  }, []);

  useEffect(() => {
    const storedDiffs = JSON.parse(localStorage.getItem("energyFormDataDiff"));
    if (storedDiffs) {
      setDiffs(storedDiffs);
    }
  }, []);

  // console.log("Diffs from localStorage:", diffs);

  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // if (showSplash || !data) return <SplashScreen />;

  // تقسيم الكروت حسب الفئة
  const solarEnergyCards = [
    {
      label: "القدرة الشمسية المركبة",
      value: `${data?.pv_capacity_mwp} MWp`,
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      percentage: diffs?.pv_capacity_mwp,
    },
    {
      label: "نسبة التغطية بالطاقة الشمسية",
      value: `${data?.solar_coverage_percent}%`,
      icon: <Zap className="w-6 h-6 text-green-600" />,
      percentage: diffs?.solar_coverage_percent,
    },
    {
      label: `الطاقة الكهربائية المنتجة من الطاقة الشمسية (MWh/${
        data?.solar_energy_unit === "month" ? "شهر" : "سنة"
      })`,
      value: `${data?.solar_energy_production}%`,
      icon: <LayoutGrid className="w-6 h-6 text-green-500" />,
      percentage: diffs?.solar_energy_production,
    },
  ];

  const electricityCards = [
    {
      label: `استهلاك الطاقة الكهربائية (MWh/${
        data?.electricity_consumption_unit === "month" ? "شهر" : "سنة"
      })`,
      value: `${data?.electricity_consumption}`,
      icon: <Zap className="w-6 h-6 text-green-500" />,
      percentage: diffs.electricity_consumption,
    },
    {
      label:
        "النسبة المئوية لاستهلاك الطاقة الكهربائية التي تغطيها الطاقة الكهروضوئية (%)",
      value: `${data?.solar_coverage_percent}%`,
      icon: <LayoutGrid className="w-6 h-6 text-green-500" />,
      percentage: diffs.solar_coverage_percent,
    },
    {
      label: "متوسط استهلاك النزيل",
      value: `${data?.daily_consumption_per_guest} kWh/day`,
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      percentage: diffs.daily_consumption_per_guest,
    },
  ];

  const smartRoomCards = [
    {
      label: "عدد الغرف الذكية",
      value: data?.smart_rooms,
      icon: <Lightbulb className="w-6 h-6 text-blue-500" />,
      percentage: diffs.smart_rooms,
    },
    {
      label: "نسبة المساحات القابلة للتعتيم",
      value: `${data?.dimmable_area_percent}%`,
      icon: <LayoutGrid className="w-6 h-6 text-green-500" />,
      percentage: diffs.dimmable_area_percent,
    },
  ];

  return (
    <>
      <Helmet>
        <title>الطاقة | لوحة المؤشرات</title>
      </Helmet>
      {/* الهيكل الرئيسي للصفحة */}
      <div
        className="flex flex-col space-y-6 text-right h-[-webkit-fill-available] w-[-webkit-fill-available]"
        dir="rtl"
      >
        {/* العنوان والفلاتر */}
        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <h1 className="mx-auto text-3xl font-extrabold p-2.5 bg-white/55 rounded-md backdrop-blur-md w-full flex justify-center">
            لوحة مؤشرات الأداء العام للطاقة
          </h1>

          {/* الفلاتر */}
          <div className="flex flex-col gap-2 text-right rtl">
            <select
              dir="rtl"
              className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
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
              className="bg-green-500 text-white p-1 rounded text-[10px] sm:text-xs md:text-sm"
            >
              تعديل بيانات الطاقة
            </button>
          </div>
        </div>

        {/* المحتوى الرئيسي بياخد باقي الصفحة */}
        <div className={`grid grid-cols-3 gap-2 flex-1 h-0`}>
          {/* الجزء الأول: 1/3 */}
          <div className="col-span-1 overflow-y-auto pr-2 h-full" dir="ltr">
            {(selectedCategory === "all" ||
              selectedCategory === "solar_energy") && (
              <>
                <h2 className="text-lg font-bold mb-2">الطاقة الشمسية</h2>
                <div className="grid grid-cols-1 gap-4">
                  {solarEnergyCards.map((item, i) => (
                    <Card key={i} {...item} />
                  ))}
                </div>
              </>
            )}

            {(selectedCategory === "all" ||
              selectedCategory === "electricity_consunption") && (
              <>
                <h2 className="text-lg font-bold mb-2">استهلاك الكهرباء</h2>
                <div className="grid grid-cols-1 gap-4">
                  {electricityCards.map((item, i) => (
                    <Card key={i} {...item} />
                  ))}
                </div>
              </>
            )}

            {(selectedCategory === "all" ||
              selectedCategory === "smart_rooms") && (
              <>
                <h2 className="text-lg font-bold mb-2">
                  الغرف الذكية والمساحات القابلة للتعتيم
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {smartRoomCards.map((item, i) => (
                    <Card key={i} {...item} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* الجزء الثاني: الخريطة */}
          {(selectedCategory === "all" || selectedCategory === "map") && (
            <div
              className={`${
                selectedCategory === "map" ? "md:col-span-3" : "md:col-span-2"
              } h-full rounded-xl leaflet-container !bg-transparent`}
            >
              <MapView initialData={data} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Energy;
