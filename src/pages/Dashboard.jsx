import { useEffect, useState } from "react";
import DashboardFilter from "../components/DashboardFilter";
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
    const stored = localStorage.getItem("dashboardFormData");
    let parsed = {};

    if (stored) {
      parsed = JSON.parse(stored);
    }

    const formattedData = {
      population: {
        male: Number(parsed.male || 0),
        female: Number(parsed.female || 0),
        children: Number(parsed.children || 0),
        elderly: Number(parsed.elderly || 0),
      },
      hospitals: Number(parsed.hospitals || 0),
      hotels: {
        green_star: Number(parsed.hotelsGreen || 0),
        non_green_star: Number(parsed.hotelsNotGreen || 0),
      },
      Diving_centres:
        Number(parsed.divingCentersGreen || 0) +
        Number(parsed.divingCentersNotGreen || 0),
    };

    setData(formattedData);
    setShowSplash(false);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <>
      <Helmet>
        <title>لوحة مؤشرات نظم المعلومات الجغرافية</title>
      </Helmet>

      <div className="flex flex-col h-fill-available space-y-4" dir="rtl">
        <DashboardFilter data={data} filter={filter} setFilter={setFilter} />
      </div>
    </>
  );
};

export default Dashboard;
