import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import CustomLineChart from "../components/CustomLineChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";

const Hotels = () => {
  const [data, setData] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(""); // لحفظ القطاع المختار
  const [filteredHotels, setFilteredHotels] = useState([]); // لحفظ الفنادق المصفاة
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
  
  const navigate = useNavigate();
  useEffect(() => {
    const localData = localStorage.getItem("hotelFormData");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setData(parsedData);
      const locations = [...new Set(parsedData.map((hotel) => hotel.location))];
      setSelectedLocation(locations[0] || ""); // تعيين أول قطاع كاختيار افتراضي
      setFilteredHotels(
        parsedData.filter((hotel) => hotel.location === locations[0])
      ); // تصفية الفنادق بناءً على أول قطاع
      setSelectedHotel(
        parsedData.find((hotel) => hotel.location === locations[0])
      ); // تعيين أول فندق من القطاع المختار
    }
  }, []);

  // استخراج الفئات (القطاعات) الفريدة
  const locations = [...new Set(data?.map((hotel) => hotel.location))];

  // تصفية الفنادق بناءً على القطاع المختار
  useEffect(() => {
    if (selectedLocation) {
      setFilteredHotels(
        data?.filter((hotel) => hotel.location === selectedLocation)
      );
      setSelectedHotel(
        data?.find((hotel) => hotel.location === selectedLocation)
      );
    }
  }, [selectedLocation, data]);

  // إذا لم تكن هناك بيانات أو الفندق المختار غير موجود
  // if (!data || !selectedHotel) {
  //   return <SplashScreen />;
  // }

  // استخراج بيانات الكهرباء والإشغال
  const electricityData = Object.entries(
    selectedHotel?.electricityBills || {}
  ).map(([year, bill]) => ({
    year,
    electricity: parseInt(bill, 10),
  }));

  const accommodationData = Object.entries(
    selectedHotel?.occupancyRates || {}
  ).map(([year, rate]) => ({
    year,
    percentage: parseInt(rate, 10),
  }));

  // قيم ابتدائية في حال عدم وجود بيانات
  const defaultHotel = {
    name: "غير معروف",
    numberOfRooms: 0,
    numberOfFlights: 0,
    numberOfVisitors: 0,
    hotelCategory: "غير متوفر",
    solarPowerCapacity: 0,
    solarWaterHeater: false,
    desalinationPlant: false,
    treatmentPlant: false,
    wasteSeparation: false,
    electricityBills: {},
    occupancyRates: {},
    location: "غير معروف",
  };

  const hotel = selectedHotel || defaultHotel;

  return (
    <>
      <Helmet>
        <title>الفنادق | لوحة المؤشرات الجغرافية</title>
      </Helmet>

      <div className="flex flex-col space-y-6 text-right rtl" dir="rtl">
        <h1 className="mx-auto text-3xl font-extrabold">
          لوحة مؤشرات الأداء العام للفنادق
        </h1>

        {/* فلتر القطاع */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="locationSelect">اختر القطاع :</label>
            <select
              id="locationSelect"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)} // تغيير القطاع المختار
              className="p-2 rounded-md border border-gray-300 dark:bg-gray-600 dark:text-white bg-white"
            >
              <option value="">جميع القطاعات</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="hotelSelect">اختر الفندق :</label>
            <select
              id="hotelSelect"
              value={selectedHotel?.name || ""}
              onChange={(e) => {
                const selected = filteredHotels.find(
                  (hotel) => hotel.name === e.target.value
                );
                setSelectedHotel(selected); // تغيير الفندق المختار
              }}
              className="p-2 rounded-md border border-gray-300 dark:bg-gray-600 dark:text-white bg-white"
            >
              <option value="">اختر فندقاً</option>
              {filteredHotels.map((hotel, index) => (
                <option key={index} value={hotel.name}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => navigate("/HotelsForm")}
          className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2 m-0"
        >
          تعديل بيانات الفنادق
        </button>
        {/* قسم معلومات الفندق */}
        <div>
          <h2 className="text-xl font-bold mb-4">معلومات الفندق</h2>
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="اسم الفندق" value={hotel.name} />
            <StatCard title="عدد الغرف" value={hotel.numberOfRooms} />
            <StatCard title="عدد الزوار" value={hotel.numberOfVisitors} />
            <StatCard title="تقييم الفندق" value={hotel.hotelCategory} />
          </div>
        </div>

        {/* قسم كمية الكهرباء المستهلكة */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            كمية الكهرباء المستهلكة (كيلوواط/سنة)
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <CustomBarChart
              data={electricityData}
              xKey="year"
              barKey="electricity"
              barColor="#f59e0b"
              title="استهلاك الكهرباء (ك.و/سنة)"
            />
          </div>
        </div>

        {/* قسم متوسط نسبة الإشغال */}
        <div>
          <h2 className="text-xl font-bold mb-4">متوسط نسبة الإشغال</h2>
          <div className="grid grid-cols-1 gap-4">
            <CustomLineChart
              data={accommodationData}
              xKey="year"
              yKeys={[{ name: "percentage", color: "#3b82f6" }]}
              title="نسبة الإشغال على مدار السنوات"
            />
          </div>
        </div>

        {/* قسم الخصائص البيئية */}
        <div>
          <h2 className="text-xl font-bold mb-4">الخصائص البيئية</h2>
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              title="سعة الطاقة الشمسية (ك.و)"
              value={hotel.solarPowerCapacity}
            />
            <StatCard
              title="سخان مياه شمسي"
              value={hotel.solarWaterHeater ? "نعم" : "لا"}
            />
            <StatCard
              title="محطة تحلية"
              value={hotel.desalinationPlant ? "نعم" : "لا"}
            />
            <StatCard
              title="محطة معالجة"
              value={hotel.treatmentPlant ? "نعم" : "لا"}
            />
            <StatCard
              title="فصل النفايات"
              value={hotel.wasteSeparation ? "نعم" : "لا"}
            />
          </div>
        </div>

        {/* قسم الموقع الجغرافي */}
        <div>
          <h2 className="text-xl font-bold mb-4">الموقع الجغرافي</h2>
          <MapView data={hotel} />
        </div>
      </div>
    </>
  );
};

export default Hotels;
