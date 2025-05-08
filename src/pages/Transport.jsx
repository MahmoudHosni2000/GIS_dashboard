import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomPieChart from "../components/CustomPieChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const saved = localStorage.getItem("transportData");
    if (saved) {
      setData(JSON.parse(saved));
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

      <div className="flex flex-col space-y-4 text-right rtl mb-4 flex-wrap gap-4">
      <h1 className="mx-auto text-3xl font-extrabold">
          لوحة مؤشرات الأداء العام للنقل
        </h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">عرض كل البيانات</option>
          <option value="electric">النقل الكهربائي</option>
          <option value="cars">مركبات السياح (سيارات)</option>
        </select>
        {/* <button
          onClick={() => navigate("/TransportForm")}
          className="bg-green-500 text-white p-2 rounded m-0"
        >
          تعديل بيانات النقل
        </button> */}
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="عدد الحافلات الكهربائية (e-Buses)" value={filtered.eBuses || "-"} />
          <StatCard title="عدد محطات وقود الغاز الطبيعي (CNG)" value={filtered.cngStations || "-"} />
          <StatCard
            title="نسبة الميكروباصات التي تعمل بالغاز الطبيعي"
            value={
              filtered.microbusesGasPercentage
                ? `${filtered.microbusesGasPercentage}%`
                : "-"
            }
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatCard title="عدد المركبات الكهربائية" value={filtered.electricVehicles || "-"} />
          <StatCard title="عدد نقاط شحن المركبات الكهربائية" value={filtered.chargingPoints || "-"} />
          <StatCard
            title="طول مسارات المشاة والدراجات (كم)"
            value={filtered.bikeAndWalkTracksLength || "-"}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatCard title="عدد رحلات الدراجات يوميًا" value={filtered.bikeTripsCount || "-"} />
          <StatCard title="عدد محطات مشاركة الدراجات" value={filtered.bikeSharingStations || "-"} />
          <StatCard
            title="نسبة سيارات الأجرة العاملة بالغاز الطبيعي"
            value={
              filtered.gasTaxisPercentage
                ? `${filtered.gasTaxisPercentage}%`
                : "-"
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomPieChart
            data={touristVehicleData}
            dataKey="value"
            nameKey="name"
            colors={["#60a5fa", "#34d399", "#f59e0b"]}
            title="عدد السياح حسب وسيلة النقل"
          />
        </div>
      </div>
    </>
  );
};

export default Transport;
