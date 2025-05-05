import { useEffect, useState } from "react";
import CustomPieChart from "../components/CustomPieChart";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import SplashScreen from "../components/SplashScreen";
import { getWaterIndicators } from "../api/indicatorsAPI";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Water = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState({
    city: "all",
    year: "all",
  });

  useEffect(() => {
    getWaterIndicators()
      .then((res) => {
        setData(res);
        setTimeout(() => setShowSplash(false), 200);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      });
  }, []);

  if (showSplash || !data) return <SplashScreen />;

  const city = filter.city;
  const year = filter.year;

  // Sewage Volume by Year
  const filteredSewageVolume =
  year !== "all"
    ? Object.values(data.sewage_volume[year]).reduce((a, b) => a + b, 0)
    : Object.values(data.sewage_volume).reduce((acc, yearObj) => {
        return acc + Object.values(yearObj).reduce((a, b) => a + b, 0);
      }, 0);

  // Helper to get average or specific city
  const getCityValue = (obj, city) => {
    if (city === "all") {
      const values = Object.values(obj);
      return values.reduce((a, b) => a + b, 0) / values.length;
    } else {
      return obj[city];
    }
  };

  const getCityDesalination = (city) => {
    if (city === "all") {
      const sum = Object.values(data.desalination_capacity_m3).reduce(
        (acc, val) => {
          acc.municipal += val.municipal;
          acc.hotels += val.hotels;
          return acc;
        },
        { municipal: 0, hotels: 0 }
      );
      return sum;
    } else {
      return data.desalination_capacity_m3[city];
    }
  };

  const getCityPlants = (type, city) => {
    if (city === "all") {
      return Object.values(data[type]).reduce((acc, val) => {
        if (typeof val === "number") {
          return acc + val;
        } else {
          return acc + val.municipal + val.hotels;
        }
      }, 0);
    } else {
      const val = data[type][city];
      return typeof val === "number" ? val : val.municipal + val.hotels;
    }
  };

  const desalinationCap = getCityDesalination(city);

  const desalinationCapacityData = [
    { name: "Municipal", value: desalinationCap.municipal },
    { name: "Hotels", value: desalinationCap.hotels },
  ];

  const treatmentVsDesalination = [
    {
      name: "Treatment Plants",
      value: getCityPlants("treatment_plants", city),
    },
    {
      name: "Desalination Plants",
      value: getCityPlants("desalination_plants", city),
    },
  ];

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Water | GIS Dashboard</title>
      </Helmet>

      <div className="space-y-6">
        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <select
            name="city"
            className="border p-2 rounded basis-3/4"
            value={filter.city}
            onChange={handleFilterChange}
          >
            <option value="all">All Cities</option>
            {Object.keys(data.water_consumption_per_capita).map((cityKey) => (
              <option key={cityKey} value={cityKey}>
                {cityKey}
              </option>
            ))}
          </select>

          <select
            name="year"
            className="border p-2 rounded basis-1/4"
            value={filter.year}
            onChange={handleFilterChange}
          >
            <option value="all">All Years</option>
            {Object.keys(data.sewage_volume).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => navigate("/WaterForm")}
          className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2"
        >
          Edit Water Data
        </button>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Per Capita Use"
            value={
              getCityValue(data.water_consumption_per_capita, city).toFixed(2) +
              " m³/yr"
            }
          />
          <StatCard
            title="Leak %"
            value={
              getCityValue(data.leakage_percent, city).toFixed(2) + "%"
            }
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4">
          <CustomBarChart
            data={desalinationCapacityData}
            xKey="name"
            barKey="value"
            barColor="#60a5fa"
            title="Desalination Capacity"
          />

          <CustomPieChart
            data={treatmentVsDesalination}
            dataKey="value"
            nameKey="name"
            colors={["#34d399", "#facc15"]}
            title="Treatment vs Desalination"
          />
        </div>

        {/* Sewage Volume */}
        <div className="mt-4">
          <h3 className="text-xl font-bold">
            Sewage Volume {year !== "all" ? `in ${year}` : "(Total)"}
          </h3>
          <p>{filteredSewageVolume}</p>
        </div>
      </div>
    </>
  );
};

export default Water;
