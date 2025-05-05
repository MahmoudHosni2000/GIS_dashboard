import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Zap, Lightbulb, LayoutGrid } from "lucide-react";
import MapView from "../components/MapView";
import CustomLineChart from "../components/CustomLineChart";
import SmartRoomTable from "../components/SmartRoomTable";
import { getEnergyIndicators } from "../api/indicatorsAPI";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Energy = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState({
    category: "all",
    type: "all",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getEnergyIndicators()
      .then((res) => {
        setData(res);
        setTimeout(() => setShowSplash(false), 200);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      });
  }, []);

  if (showSplash) return <SplashScreen />;

  // التصفية بناءً على الاختيارات
  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const cards = [
    {
      label: "Total PV Capacity",
      value: `${data.pv_capacity_mwp} MWp`,
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      category: "energy",
    },
    {
      label: "Smart Rooms",
      value: data.smart_rooms,
      icon: <Lightbulb className="w-6 h-6 text-blue-500" />,
      category: "rooms",
    },
    {
      label: "Dimmable Area %",
      value: `${data.dimmable_area_percent}%`,
      icon: <LayoutGrid className="w-6 h-6 text-green-500" />,
      category: "energy",
    },
  ];

  const chartData = data.monthly_generation_mwh.map((gen, index) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index],
    pv: gen,
    consumption: data.monthly_consumption_mwh[index],
  }));

  return (
    <>
      <Helmet>
        <title>Energy | GIS Dashboard</title>
      </Helmet>
      <div className="flex flex-col h-fill-available space-y-4">
        {/* فلتر البيانات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* فلتر القسم */}
          <select
            name="category"
            className="p-2 border border-gray-300 rounded"
            value={filter.category}
            onChange={handleFilterChange}
          >
            <option value="all">All Data</option>
            <option value="energy">Energy Data</option>
            <option value="rooms">Smart Rooms</option>
          </select>

          {/* فلتر النوع */}
          <select
            name="type"
            className="p-2 border border-gray-300 rounded"
            value={filter.type}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="pv_capacity">PV Capacity</option>
            <option value="smart_rooms">Smart Rooms</option>
            <option value="dimmable_area">Dimmable Area</option>
          </select>

          {/* زر التعديل */}
          <button
            onClick={() => navigate("/EnergyForm")}
            className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2"
          >
            Edit Energy Data
          </button>
        </div>

        {/* عرض الكروت بناءً على الفلتر */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards
            .filter((card) => {
              return (
                (filter.category === "all" ||
                  card.category === filter.category) &&
                (filter.type === "all" ||
                  card.label.toLowerCase().includes(filter.type))
              );
            })
            .map((item, i) => (
              <Card
                key={i}
                icon={item.icon}
                value={item.value}
                label={item.label}
              />
            ))}
        </div>

        {/* عرض المخطط البياني والطاولة بناءً على الفلتر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filter.category === "all" || filter.category === "energy" ? (
            <CustomLineChart
              data={chartData}
              xKey="month"
              yKeys={[
                { name: "pv", color: "#22c55e" },
                { name: "consumption", color: "#ef4444" },
              ]}
            />
          ) : null}

          {filter.category === "all" || filter.category === "rooms" ? (
            <SmartRoomTable data={data.smart_room_energy} />
          ) : null}
        </div>

        {/* عرض الخريطة */}
        <div className="flex-grow">
          <MapView data={data} />
        </div>
      </div>
    </>
  );
};

export default Energy;
