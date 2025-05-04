import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Zap, Lightbulb, LayoutGrid } from "lucide-react";
import MapView from "../components/MapView";
import CustomLineChart from "../components/CustomLineChart";
import SmartRoomTable from "../components/SmartRoomTable";
import { getEnergyIndicators } from "../api/indicatorsAPI";
import SplashScreen from "../components/SplashScreen";

const Energy = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    getEnergyIndicators()
      .then((res) => {
        setData(res);
        // setShowSplash(false); // Hide splash screen after data is loaded
        setTimeout(() => setShowSplash(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      });
  }, []);
  
  if (showSplash) return <SplashScreen/>;

  const cards = [
    {
      label: "Total PV Capacity",
      value: `${data.pv_capacity_mwp} MWp`,
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
    },
    {
      label: "Smart Rooms",
      value: data.smart_rooms,
      icon: <Lightbulb className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Dimmable Area %",
      value: `${data.dimmable_area_percent}%`,
      icon: <LayoutGrid className="w-6 h-6 text-green-500" />,
    }
  ];

  const chartData = data.monthly_generation_mwh.map((gen, index) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index],
    pv: gen,
    consumption: data.monthly_consumption_mwh[index],
  }));

  return (
    <div className="flex flex-col h-screen space-y-4">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((item, i) => (
            <Card key={i} icon={item.icon} value={item.value} label={item.label} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomLineChart
          data={chartData}
          xKey="month"
          yKeys={[
            { name: "pv", color: "#22c55e" },
            { name: "consumption", color: "#ef4444" }
          ]}
        />
        <SmartRoomTable data={data.smart_room_energy} />
      </div>

      <div className="flex-grow">
        <MapView />
      </div>
    </div>
  );
};

export default Energy;
