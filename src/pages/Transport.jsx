import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomPieChart from "../components/CustomPieChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapDash from "../components/MapDash";

const defaultData = {
  eBuses: "0",
  cngStations: "0",
  microbusesGasPercentage: "0",
  electricVehicles: "0",
  chargingPoints: "0",
  bikeAndWalkTracksLength: "0",
  bikeTripsCount: "0",
  bikeSharingStations: "0",
  gasTaxisPercentage: "0",
  touristVehiclesCars: "0",
  touristVehiclesMinibuses: "0",
  touristVehiclesBuses: "0",
};

const Transport = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(defaultData);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState("all");
  const [mapData, setMapData] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transportData")) || [];
    setMapData(saved);
    if (saved.length > 0) {
      const totals = saved.reduce((acc, item) => {
        for (let key in item) {
          if (key === "latitude" || key === "longitude") continue;
          const value = Number(item[key]);
          acc[key] = (acc[key] || 0) + (isNaN(value) ? 0 : value);
        }
        return acc;
      }, {});
      setData(totals);
    } else {
      setData(defaultData);
    }

    setTimeout(() => setShowSplash(false), 200);
  }, []);

  if (showSplash) return <SplashScreen />;

  const touristVehicleData = [
    { name: "سيارات", value: Number(data.touristVehiclesCars) },
    { name: "ميكروباص", value: Number(data.touristVehiclesMinibuses) },
    { name: "حافلات", value: Number(data.touristVehiclesBuses) },
  ];

  const filteredData = () => {
    if (filter === "electric") {
      return {
        eBuses: data.eBuses,
        electricVehicles: data.electricVehicles,
        chargingPoints: data.chargingPoints,
      };
    }
    if (filter === "cars") {
      return {
        touristVehiclesCars: data.touristVehiclesCars,
        touristVehiclesMinibuses: data.touristVehiclesMinibuses,
        touristVehiclesBuses: data.touristVehiclesBuses,
      };
    }
    return data;
  };

  const filtered = filteredData();

  return (
    <>
      <Helmet>
        <title>النقل | لوحة مؤشرات نظم المعلومات الجغرافية</title>
      </Helmet>
      <div className="flex flex-col space-y-6 text-right h-[-webkit-fill-available] w-[-webkit-fill-available]">
        <div className="flex flex-col gap-2 text-right">
          <h1 className="mx-auto text-3xl font-extrabold p-2.5 bg-white/55 rounded-md backdrop-blur-md w-full flex justify-center">
            لوحة مؤشرات الأداء العام للنقل
          </h1>
          <div className="flex flex-col gap-2 text-right rtl">
            <select
              dir="rtl"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
            >
              <option value="all">عرض كل البيانات</option>
              <option value="electric">النقل الكهربائي</option>
              <option value="cars">مركبات السياح (سيارات)</option>
            </select>
            <button
              onClick={() => navigate("/TransportForm")}
              className="bg-green-500 text-white p-1 rounded text-[10px] sm:text-xs md:text-sm"
            >
              تعديل بيانات النقل
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 flex-1 h-0">
          {/* العمود الأول - 1/3 */}
          <div
            className="col-span-1 overflow-y-auto pr-2 h-full flex flex-col gap-2"
            dir="ltr"
          >
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                title="عدد الحافلات الكهربائية (e-Buses)"
                value={filtered.eBuses || "-"}
              />
              <StatCard
                title="عدد محطات وقود الغاز الطبيعي (CNG)"
                value={filtered.cngStations || "-"}
              />
              <StatCard
                title="نسبة الحافلات الصغيرة التي تعمل بالغاز الطبيعي"
                value={
                  filtered.microbusesGasPercentage
                    ? `${filtered.microbusesGasPercentage}%`
                    : "-"
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <StatCard
                title="عدد المركبات الكهربائية"
                value={filtered.electricVehicles || "-"}
              />
              <StatCard
                title="عدد نقاط شحن المركبات الكهربائية"
                value={filtered.chargingPoints || "-"}
              />
              <StatCard
                title="طول مسارات المشاة والدراجات (كم)"
                value={filtered.bikeAndWalkTracksLength || "-"}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <StatCard
                title="عدد رحلات الدراجات يوميًا"
                value={filtered.bikeTripsCount || "-"}
              />
              <StatCard
                title="عدد محطات مشاركة الدراجات"
                value={filtered.bikeSharingStations || "-"}
              />
              <StatCard
                title="نسبة سيارات الأجرة العاملة بالغاز الطبيعي"
                value={
                  filtered.gasTaxisPercentage
                    ? `${filtered.gasTaxisPercentage}%`
                    : "-"
                }
              />
            </div>

            <div className="grid">
              <CustomPieChart
                data={touristVehicleData}
                dataKey="value"
                nameKey="name"
                colors={["#60a5fa", "#34d399", "#f59e0b"]}
                title="عدد السياح حسب وسيلة النقل"
              />
            </div>
          </div>

          {/* العمود الثاني - 2/3 */}
          <div className="col-span-2 h-full rounded-xl leaflet-container !bg-transparent ">
            <MapDash initialData={mapData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Transport;
