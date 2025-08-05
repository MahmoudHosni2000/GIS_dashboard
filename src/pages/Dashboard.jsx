import { useEffect, useState } from "react";
import DashboardFilter from "./DashboardFilter";
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
    let parsedArray = [];

    if (stored) {
      parsedArray = JSON.parse(stored);
    }

    const totals = parsedArray.reduce(
      (acc, item) => {
        acc.male += Number(item.male || 0);
        acc.female += Number(item.female || 0);
        acc.children += Number(item.children || 0);
        acc.elderly += Number(item.elderly || 0);
        acc.hospitals += Number(item.hospitals || 0);
        acc.hotelsGreen += Number(item.hotelsGreen || 0);
        acc.hotelsNotGreen += Number(item.hotelsNotGreen || 0);
        acc.divingCentersGreen += Number(item.divingCentersGreen || 0);
        acc.divingCentersNotGreen += Number(item.divingCentersNotGreen || 0);
        return acc;
      },
      {
        male: 0,
        female: 0,
        children: 0,
        elderly: 0,
        hospitals: 0,
        hotelsGreen: 0,
        hotelsNotGreen: 0,
        divingCentersGreen: 0,
        divingCentersNotGreen: 0,
      }
    );

    const formattedData = {
      population: {
        ذكور: totals.male,
        إناث: totals.female,
        أطفال: totals.children,
        مُسنين: totals.elderly,
      },
      hospitals: totals.hospitals,
      hotels: {
        green_star: totals.hotelsGreen,
        non_green_star: totals.hotelsNotGreen,
      },
      Diving_centres: {
        divingCentersGreen: totals.divingCentersGreen,
        divingCentersNotGreen: totals.divingCentersNotGreen,
      },
    };

    setData(formattedData);
    setShowSplash(false);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <>
      <Helmet>
        <title>لوحة مؤشرات الأداء العام للإجماليات</title>
      </Helmet>
      <div
        className="flex flex-col space-y-6 text-right h-[-webkit-fill-available] w-[-webkit-fill-available]"
        dir="rtl"
      >
        <DashboardFilter data={data} filter={filter} setFilter={setFilter} />
      </div>
    </>
  );
};

export default Dashboard;
