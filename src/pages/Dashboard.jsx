import { useEffect, useState } from "react";
import { getDashboardData } from "../api/indicatorsAPI";
import DashboardFilter from "../components/DashboardFilter";
import CustomBarChart from "../components/CustomBarChart";
import MapView from "../components/MapView";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState({
    population: "all",
    section: "all",
  });

  useEffect(() => {
    getDashboardData()
      .then((res) => {
        setData(res);
        setTimeout(() => setShowSplash(false), 100);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      });
  }, []);

  if (showSplash || !data) return <SplashScreen />;

  return (
    <>
      <Helmet>
        <title>GIS Dashboard</title>
      </Helmet>

      <div className="flex flex-col h-fill-available space-y-4">
        <DashboardFilter data={data} filter={filter} setFilter={setFilter} />
        <div className="flex-grow overflow-hidden">
          <MapView data={data} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
