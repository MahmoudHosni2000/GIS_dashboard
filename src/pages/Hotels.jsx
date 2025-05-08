import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import CustomLineChart from "../components/CustomLineChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Hotels = () => {
  const navigate = useNavigate(); // استخدام useNavigate بدلاً من useHistory

  const [data, setData] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem("hotelFormData");

    const defaultHotel = {
      name: "غير معروف",
      location: "غير محدد",
      number_of_rooms: 0,
      plane_trips: 0,
      visitors: 0,
      star_rating: "غير مصنف",
      pv_capacity_kw: 0,
      solar_water_heater: false,
      has_desalination_plant: false,
      has_treatment_plant: false,
      separates_waste: false,
      electricity_consumption_kw_per_year: {
        2021: 0,
        2022: 0,
        2023: 0,
        2024: 0,
      },
      accommodation_percentage: {
        2021: 0,
        2022: 0,
        2023: 0,
        2024: 0,
      },
    };

    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        const hotelFromLocal = {
          name: parsed.name || "غير معروف",
          location: parsed.location || "غير محدد",
          number_of_rooms: parsed.numberOfRooms || 0,
          plane_trips: parsed.numberOfFlights || 0,
          visitors: parsed.numberOfVisitors || 0,
          star_rating: parsed.hotelCategory || "غير مصنف",
          pv_capacity_kw: parsed.solarPowerCapacity || 0,
          solar_water_heater: parsed.solarWaterHeater || false,
          has_desalination_plant: parsed.desalinationPlant || false,
          has_treatment_plant: parsed.treatmentPlant || false,
          separates_waste: parsed.wasteSeparation || false,
          electricity_consumption_kw_per_year: parsed.electricityBills || {
            2021: 0,
            2022: 0,
            2023: 0,
            2024: 0,
          },
          accommodation_percentage: parsed.occupancyRates || {
            2021: 0,
            2022: 0,
            2023: 0,
            2024: 0,
          },
        };

        const mockData = {
          hotels: [hotelFromLocal],
        };

        setData(mockData);
        setFilteredHotels(mockData.hotels);
        setSelectedHotel(mockData.hotels[0]);
      } catch (error) {
        console.error("خطأ في قراءة بيانات localStorage:", error);
      }
    } else {
      // في حال عدم وجود بيانات
      const mockData = {
        hotels: [defaultHotel],
      };

      setData(mockData);
      setFilteredHotels(mockData.hotels);
      setSelectedHotel(mockData.hotels[0]);
    }

    setTimeout(() => setShowSplash(false), 200);
  }, []);

  const handleSearch = () => {
    if (!data?.hotels) return;

    const query = nameFilter.toLowerCase(); // نستخدم هذا ككلمة بحث عامة

    const filtered = data.hotels.filter((hotel) => {
      // تحويل جميع القيم إلى string للبحث السلس
      return (
        hotel.name.toLowerCase().includes(query) ||
        hotel.location.toLowerCase().includes(query) ||
        String(hotel.number_of_rooms).includes(query) ||
        String(hotel.plane_trips).includes(query) ||
        String(hotel.visitors).includes(query) ||
        String(hotel.star_rating).includes(query) ||
        String(hotel.pv_capacity_kw).includes(query) ||
        (hotel.solar_water_heater ? "yes" : "no").includes(query) ||
        (hotel.has_desalination_plant ? "yes" : "no").includes(query) ||
        (hotel.has_treatment_plant ? "yes" : "no").includes(query) ||
        (hotel.separates_waste ? "yes" : "no").includes(query)
      );
    });

    setFilteredHotels(filtered);
    setSelectedHotel(filtered[0] || null);
  };

  if (showSplash || !selectedHotel) return <SplashScreen />;

  const electricityData = Object.entries(
    selectedHotel.electricity_consumption_kw_per_year
  ).map(([year, value]) => ({
    year,
    electricity: value,
  }));

  const accommodationData = Object.entries(
    selectedHotel.accommodation_percentage
  ).map(([year, value]) => ({
    year,
    percentage: value,
  }));

  return (
    <>
      <Helmet>
        <title>الفنادق | لوحة المؤشرات الجغرافية</title>
      </Helmet>

      <div className="flex flex-col space-y-4 text-right rtl">
        <h1 className="mx-auto text-3xl font-extrabold">
          لوحة مؤشرات الأداء العام للفنادق
        </h1>
        {/* اختيار الفندق */}
        <div className="flex flex-col space-y-4 text-right rtl">
          {/* قائمة القطاعات */}
          <select
            className="border p-2 rounded"
            value={sectorFilter}
            onChange={(e) => {
              const selectedSector = e.target.value;
              setSectorFilter(selectedSector);

              // تصفية الفنادق بناءً على القطاع
              const filtered = data.hotels.filter((hotel) =>
                hotel.location
                  .toLowerCase()
                  .includes(selectedSector.toLowerCase())
              );

              setFilteredHotels(filtered);
              setSelectedHotel(filtered[0] || null);
            }}
          >
            <option value="">اختر القطاع</option>
            {/* جلب القطاعات بدون تكرار */}
            {[...new Set(data.hotels.map((h) => h.location))].map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>

          {/* قائمة الفنادق */}
          {sectorFilter && filteredHotels.length > 0 && (
            <select
              className="border p-2 rounded"
              value={selectedHotel?.name || ""}
              onChange={(e) =>
                setSelectedHotel(
                  filteredHotels.find((h) => h.name === e.target.value)
                )
              }
            >
              {filteredHotels.map((hotel) => (
                <option key={hotel.name} value={hotel.name}>
                  {hotel.name}
                </option>
              ))}
            </select>
          )}

          {/* زر تعديل البيانات */}
          {/* <button
            onClick={() => navigate("/HotelsForm")}
            className="bg-green-500 text-white p-2 rounded"
          >
            تعديل بيانات الفنادق
          </button> */}
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="عدد الغرف" value={selectedHotel.number_of_rooms} />
          <StatCard title="رحلات الطيران" value={selectedHotel.plane_trips} />
          <StatCard title="عدد الزوار" value={selectedHotel.visitors} />
          <StatCard title="تقييم الفندق" value={selectedHotel.star_rating} />
          <StatCard
            title="سعة الطاقة الشمسية (ك.و)"
            value={selectedHotel.pv_capacity_kw}
          />
          <StatCard
            title="سخان مياه شمسي"
            value={selectedHotel.solar_water_heater ? "نعم" : "لا"}
          />
          <StatCard
            title="محطة تحلية"
            value={selectedHotel.has_desalination_plant ? "نعم" : "لا"}
          />
          <StatCard
            title="محطة معالجة"
            value={selectedHotel.has_treatment_plant ? "نعم" : "لا"}
          />
          <StatCard
            title="فصل النفايات"
            value={selectedHotel.separates_waste ? "نعم" : "لا"}
          />
        </div>

        {/* الرسوم البيانية */}
        <div className="grid grid-cols-2 gap-4">
          <CustomBarChart
            data={electricityData}
            xKey="year"
            barKey="electricity"
            barColor="#f59e0b"
            title="استهلاك الكهرباء (ك.و/سنة)"
          />

          <CustomLineChart
            data={accommodationData}
            xKey="year"
            yKeys={[{ name: "percentage", color: "#3b82f6" }]}
            title="نسبة الإشغال على مدار السنوات"
          />
        </div>
      </div>
    </>
  );
};

export default Hotels;
