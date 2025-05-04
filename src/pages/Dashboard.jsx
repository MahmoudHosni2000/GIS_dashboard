import { useEffect, useState } from "react";
import { getDashboardData } from "../api/indicatorsAPI";
import Card from "../components/Card";
import { Users, Hospital, Hotel, BatteryCharging } from "lucide-react";
import CustomBarChart from "../components/CustomBarChart";
import CustomLineChart from "../components/CustomLineChart";
import MapView from "../components/MapView";
import SplashScreen from "../components/SplashScreen";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    getDashboardData()
      .then((res) => {
        setData(res);
        // setShowSplash(false); // Hide splash screen after data is loaded
        setTimeout(() => setShowSplash(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      });
  }, []);
  
  if (showSplash) return <SplashScreen />;
  

  console.log(data);

  const cards = [
    {
      label: "Total Population",
      value: data.population.male + data.population.female + data.population.children + data.population.elderly,
      icon: <Users className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Hospitals",
      value: data.hospitals,
      icon: <Hospital className="w-6 h-6 text-red-500" />,
    },
    {
      label: "Green Star Hotels",
      value: data.hotels.green_star,
      icon: <Hotel className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Energy Coverage (%)",
      value: data.energy_coverage_percent,
      icon: <BatteryCharging className="w-6 h-6 text-green-600" />,
    },
  ];

  return (
    <div className="flex flex-col h-screen space-y-4">
      <div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {cards.map((item, index) => (
            <Card
              key={index}
              icon={item.icon}
              value={item.value}
              label={item.label}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CustomLineChart
          data={data.pv_vs_consumption}
          xKey="month"
          yKeys={[
            { name: 'pv', color: '#8884d8' },
            { name: 'consumption', color: '#82ca9d' }
          ]}
        />

        <CustomBarChart
          data={data.waste_trends}
          xKey="day"
          barKey="waste"
          barColor="#f87171"
          title="Waste Trends"
        />
      </div>
      {/* Map Section */}
      <div className="flex-grow overflow-hidden">
        <MapView />
      </div>
    </div>

  );
};

export default Dashboard;
