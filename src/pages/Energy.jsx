import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Zap, Lightbulb, LayoutGrid } from "lucide-react";
import MapView from "../components/MapView";
import CustomLineChart from "../components/CustomLineChart";
import CustomBarChart from "../components/CustomBarChart";
import CustomPieChart from "../components/CustomPieChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"];
const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

const Energy = () => {
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem("energyFormData");
  
    if (localData) {
      const parsed = JSON.parse(localData);
  
      // تحويل القيم إلى أرقام
      const dataObj = {
        pv_capacity_mwp: parseFloat(parsed.pv_capacity_mwp),
        pv_capacity_change: parseFloat(parsed.pv_capacity_change),
        solar_energy_production: Array(6).fill(parseFloat(parsed.solar_energy_production)),
        solar_energy_production_change: Array(6).fill(parseFloat(parsed.solar_energy_production_change)),
        electricity_consumption: Array(6).fill(parseFloat(parsed.electricity_consumption)),
        electricity_consumption_change: Array(6).fill(parseFloat(parsed.electricity_consumption_change)),
        solar_coverage_percent: parseFloat(parsed.solar_coverage_percent),
        solar_coverage_change: parseFloat(parsed.solar_coverage_change),
        daily_consumption_per_guest: parseFloat(parsed.daily_consumption_per_guest),
        daily_consumption_change: parseFloat(parsed.daily_consumption_change),
        smart_rooms: parseInt(parsed.smart_rooms),
        smart_rooms_change: parseInt(parsed.smart_rooms_change),
        dimmable_area_percent: parseFloat(parsed.dimmable_area_percent),
        dimmable_area_change: parseFloat(parsed.dimmable_area_change),
        monthly_generation_mwh: Array(6).fill(parseFloat(parsed.solar_energy_production)), // أو ضع قيمة مستقلة إن توفرت
        monthly_generation_change: Array(6).fill(parseFloat(parsed.solar_energy_production_change)),
        monthly_consumption_change: Array(6).fill(parseFloat(parsed.electricity_consumption_change)),
      };
  
      setData(dataObj);
    } else {
      // إذا لم توجد بيانات في localStorage
      setData({
        pv_capacity_mwp: 0,
        pv_capacity_change: 0,
        solar_energy_production: [0, 0, 0, 0, 0, 0],
        solar_energy_production_change: [0, 0, 0, 0, 0, 0],
        electricity_consumption: [0, 0, 0, 0, 0, 0],
        electricity_consumption_change: [0, 0, 0, 0, 0, 0],
        solar_coverage_percent: 0,
        solar_coverage_change: 0,
        daily_consumption_per_guest: 0,
        daily_consumption_change: 0,
        smart_rooms: 0,
        smart_rooms_change: 0,
        dimmable_area_percent: 0,
        dimmable_area_change: 0,
        monthly_generation_mwh: [0, 0, 0, 0, 0, 0],
        monthly_generation_change: [0, 0, 0, 0, 0, 0],
        monthly_consumption_change: [0, 0, 0, 0, 0, 0],
      });
    }
  
    setTimeout(() => setShowSplash(false), 200);
  }, []);
  


  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (showSplash || !data) return <SplashScreen />;

  const cards = [
    { label: "القدرة الشمسية المركبة", value: `${data.pv_capacity_mwp} ميغاواط بيك`, icon: <Zap className="w-6 h-6 text-yellow-500" /> },
    { label: "نسبة التغطية بالطاقة الشمسية", value: `${data.solar_coverage_percent}%`, icon: <Zap className="w-6 h-6 text-green-600" /> },
    { label: "متوسط استهلاك النزيل", value: `${data.daily_consumption_per_guest} ك.و.س/يوم`, icon: <Zap className="w-6 h-6 text-blue-600" /> },
    { label: "عدد الغرف الذكية", value: data.smart_rooms, icon: <Lightbulb className="w-6 h-6 text-blue-500" /> },
    { label: "نسبة المساحات القابلة للتعتيم", value: `${data.dimmable_area_percent}%`, icon: <LayoutGrid className="w-6 h-6 text-green-500" /> },
  ];

  const barData = data.monthly_generation_mwh.map((_, index) => ({
    month: months[index],
    "تغير الإنتاج (%)": parseFloat(data.monthly_generation_change[index].toFixed(2)),
    "تغير الاستهلاك (%)": parseFloat(data.monthly_consumption_change[index].toFixed(2)),
  }));

  const pieData = [
    { name: "القدرة الشمسية", value: data.pv_capacity_mwp },
    { name: "إجمالي الاستهلاك", value: data.electricity_consumption },
    { name: "إجمالي الإنتاج", value: data.solar_energy_production },
  ];

  return (
    <>
      <Helmet>
        <title>الطاقة | لوحة المؤشرات</title>
      </Helmet>
      <div className="flex flex-col h-fill-available space-y-4 text-right rtl px-4 py-2">

        {/* فلتر الصفحة */}
        <div className="flex gap-1 justify-end mb-4">
          <button
            onClick={() => navigate("/EnergyForm")}
            className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2 m-0"
          >
            تعديل بيانات الطاقة
          </button>
          <select
            className="border p-2 rounded-lg"
            value={selectedCategory}
            onChange={handleFilterChange}
          >
            <option value="all">عرض الكل</option>
            <option value="yearly">الإجمالي السنوي فقط</option>
            <option value="monthly">التغير الشهري فقط</option>
            <option value="distribution">نسب وتوزيع الطاقة فقط</option>
          </select>

        </div>

        {/* عرض الكروت فقط إذا كانت كل البيانات مطلوبة */}
        {selectedCategory === "all" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((item, i) => (
              <Card key={i} icon={item.icon} value={item.value} label={item.label} />
            ))}
          </div>
        )}

        {/* عرض المخططات السنوية */}
        {selectedCategory === "all" || selectedCategory === "yearly" ? (
          <>
            <CustomLineChart
              data={years.map((year, i) => ({
                month: year,
                "إنتاج الطاقة السنوي (MWh)": data.solar_energy_production[i],
                "استهلاك الكهرباء السنوي (MWh)": data.electricity_consumption[i],
              }))}
              xKey="month"
              yKeys={[
                { name: "إنتاج الطاقة السنوي (MWh)", color: "#22c55e" },
                { name: "استهلاك الكهرباء السنوي (MWh)", color: "#ef4444" },
              ]}
              title="إجمالي إنتاج واستهلاك الطاقة السنوي (MWh)"
            />

            <CustomLineChart
              data={years.map((year, i) => ({
                month: year,
                "تغير الإنتاج السنوي (%)": data.solar_energy_production_change[i],
              }))}
              xKey="month"
              yKeys={[{ name: "تغير الإنتاج السنوي (%)", color: "#22c55e" }]}
              title="تغير الإنتاج السنوي من الطاقة الشمسية (%)"
            />
          </>
        ) : null}

        {/* عرض التغير الشهري */}
        {selectedCategory === "all" || selectedCategory === "monthly" ? (
          <>
            <CustomBarChart
              data={barData}
              xKey="month"
              barKey="تغير الإنتاج (%)"
              title="تغير شهري في إنتاج الطاقة (%)"
            />
            <CustomBarChart
              data={barData}
              xKey="month"
              barKey="تغير الاستهلاك (%)"
              title="تغير شهري في استهلاك الكهرباء (%)"
            />
          </>
        ) : null}

        {/* عرض الرسم الدائري */}
        {selectedCategory === "all" || selectedCategory === "distribution" ? (
          <CustomPieChart
            data={pieData}
            dataKey="value"
            nameKey="name"
            title="توزيع الطاقة بين الإنتاج والاستهلاك والقدرة الشمسية"
            colors={["#4ade80", "#f87171", "#60a5fa"]}
          />
        ) : null}

        {/* عرض الخريطة فقط مع "عرض الكل" */}
        {selectedCategory === "all" && <MapView data={data} />}
      </div>
    </>
  );
};

export default Energy;
