import { useEffect, useState } from "react";
import CustomPieChart from "../components/CustomPieChart";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const defaultData = {
  city: "غير محدد",
  year: "غير محدد",
  waterConsumption: "0",
  leakagePercent: "0",
  desalinationPlantsCities: "0",
  desalinationPlantsHotels: "0",
  productionCapacityCities: "0",
  productionCapacityHotels: "0",
  treatmentPlantsCount: "0",
  sewageVolume_2021: "0",
  sewageVolume_2022: "0",
  sewageVolume_2023: "0",
  sewageVolume_2024: "0",
};

const Water = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(defaultData);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState({
    city: "all",
    year: "all",
  });

  useEffect(() => {
    const stored = localStorage.getItem("waterFormData");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      setData(defaultData);
    }
    setTimeout(() => setShowSplash(false), 200);
  }, []);

  if (showSplash) return <SplashScreen />;

  const { city, year } = filter;

  const desalinationCapacityData = [
    { name: "البلدية", value: Number(data.desalinationPlantsCities) },
    { name: "الفنادق", value: Number(data.desalinationPlantsHotels) },
  ];

  const treatmentVsDesalination = [
    {
      name: "محطات المعالجة",
      value: Number(data.treatmentPlantsCount),
    },
    {
      name: "محطات التحلية",
      value:
        Number(data.desalinationPlantsCities) +
        Number(data.desalinationPlantsHotels),
    },
  ];

  const sewageVolumes = {
    2021: Number(data.sewageVolume_2021),
    2022: Number(data.sewageVolume_2022),
    2023: Number(data.sewageVolume_2023),
    2024: Number(data.sewageVolume_2024),
  };

  const filteredSewageVolume =
    year === "all"
      ? Object.values(sewageVolumes).reduce((a, b) => a + b, 0)
      : sewageVolumes[year] || 0;

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>المياه | لوحة تحكم GIS</title>
      </Helmet>

      <div className="space-y-6">
        {/* الفلاتر */}
        <div className="flex gap-4 mb-4">
          <select
            name="city"
            className="border p-2 rounded basis-3/4"
            value={filter.city}
            onChange={handleFilterChange}
          >
            <option value="all">جميع المدن</option>
            <option value={data.city}>{data.city}</option>
          </select>

          <select
            name="year"
            className="border p-2 rounded basis-1/4"
            value={filter.year}
            onChange={handleFilterChange}
          >
            <option value="all">جميع السنوات</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* زر التحرير */}
        <button
          onClick={() => navigate("/WaterForm")}
          className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2"
        >
          تعديل بيانات المياه
        </button>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="استهلاك المياه"
            value={data.waterConsumption + " م³/سنة"}
          />
          <StatCard
            title="نسبة التسرب"
            value={data.leakagePercent + " %"}
          />
        </div>

        {/* الرسوم البيانية */}
        <div className="grid grid-cols-2 gap-4">
          <CustomBarChart
            data={desalinationCapacityData}
            xKey="name"
            barKey="value"
            barColor="#60a5fa"
            title="سعة التحلية"
          />

          <CustomPieChart
            data={treatmentVsDesalination}
            dataKey="value"
            nameKey="name"
            colors={["#34d399", "#facc15"]}
            title="المعالجة مقابل التحلية"
          />
        </div>

        {/* حجم مياه الصرف الصحي */}
        <div className="mt-4">
          <h3 className="text-xl font-bold">
            حجم مياه الصرف الصحي {year !== "all" ? `في ${year}` : "(الإجمالي)"}
          </h3>
          <p>{filteredSewageVolume}</p>
        </div>
      </div>
    </>
  );
};

export default Water;
