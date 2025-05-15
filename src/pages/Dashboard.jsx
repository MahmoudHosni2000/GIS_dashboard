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

  useEffect(() => {
    const stored = localStorage.getItem("dashboardFormData");
    let parsed = {};

    if (stored) {
      parsed = JSON.parse(stored);
    }

    const formattedData = {
      population: {
        ذكور: Number(parsed.male || 0),
        إناث: Number(parsed.female || 0),
        أطفال: Number(parsed.children || 0),
        مُسنين: Number(parsed.elderly || 0),
      },
      hospitals: Number(parsed.hospitals || 0),
      hotels: {
        green_star: Number(parsed.hotelsGreen || 0),
        non_green_star: Number(parsed.hotelsNotGreen || 0),
      },
      Diving_centres: {
        divingCentersGreen: Number(parsed.divingCentersGreen || 0),
        divingCentersNotGreen: Number(parsed.divingCentersNotGreen || 0),
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
      <div className="flex flex-col h-fill-available space-y-4" dir="rtl">
        <h1 className="mx-auto text-3xl font-extrabold">
          لوحة مؤشرات الأداء العام للإجماليات
        </h1>
        <DashboardFilter data={data} filter={filter} setFilter={setFilter} />
      </div>
    </>
  );
};

export default Dashboard;
