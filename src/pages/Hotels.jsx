import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import CustomLineChart from "../components/CustomLineChart";
// import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";
import MapDash from "../components/MapDash";

const Hotels = () => {
  const [data, setData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotelName, setSelectedHotelName] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [mapData, setMapData] = useState([]);

  // لما المستخدم يغيّر اسم الفندق من القائمة
  const handleHotelChange = (e) => {
    const name = e.target.value.trim();
    setSelectedHotelName(name); // نخزن الاسم الجديد
  };

  // لما اسم الفندق يتغير، نحدث البيانات
  useEffect(() => {
    if (selectedHotelName) {
      const hotelsWithSameName = filteredHotels.filter(
        (h) => h.name.trim() === selectedHotelName
      );
      const merged = getMergedHotelData(hotelsWithSameName);
      setSelectedHotel(merged);
    } else {
      setSelectedHotel(null);
    }
  }, [selectedHotelName, filteredHotels]);

  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem("hotelFormData");
    setMapData(localData ? JSON.parse(localData) : []);
    if (localData) {
      const parsedData = JSON.parse(localData);
      setData(parsedData);
      const locations = [...new Set(parsedData.map((hotel) => hotel.location))];
      setSelectedLocation(locations[0] || "");
    }
  }, []);

  useEffect(() => {
    if (!data) return;

    if (selectedLocation === "") {
      setFilteredHotels(data);
      setSelectedHotel(data[0]);
    } else {
      const filtered = data.filter(
        (hotel) => hotel.location === selectedLocation
      );
      setFilteredHotels(filtered);
      setSelectedHotel(filtered[0]);
    }
  }, [selectedLocation, data]);

  const locations = [...new Set(data?.map((hotel) => hotel.location))];

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

  const electricityData = Object.entries(hotel.electricityBills || {}).map(
    ([year, bill]) => ({
      year,
      electricity: parseInt(bill, 10),
    })
  );

  const accommodationData = Object.entries(hotel.occupancyRates || {}).map(
    ([year, rate]) => ({
      year,
      percentage: parseInt(rate, 10),
    })
  );

  // if (!data || !selectedHotel) {
  //   return <SplashScreen />;
  // }
  // دالة منفصلة داخل نفس المكون
  const getMergedHotelData = (hotels) => {
    if (!hotels || hotels.length === 0) return defaultHotel;

    return hotels.reduce(
      (acc, curr) => {
        acc.name = curr.name;
        acc.location = curr.location;
        acc.hotelCategory = curr.hotelCategory;
        acc.numberOfRooms += parseInt(curr.numberOfRooms || 0, 10);
        acc.numberOfVisitors += parseInt(curr.numberOfVisitors || 0, 10);
        acc.numberOfFlights += parseInt(curr.numberOfFlights || 0, 10);
        acc.solarPowerCapacity += parseFloat(curr.solarPowerCapacity || 0);

        acc.solarWaterHeater = acc.solarWaterHeater || curr.solarWaterHeater;
        acc.desalinationPlant = acc.desalinationPlant || curr.desalinationPlant;
        acc.treatmentPlant = acc.treatmentPlant || curr.treatmentPlant;
        acc.wasteSeparation = acc.wasteSeparation || curr.wasteSeparation;

        for (const year in curr.electricityBills) {
          acc.electricityBills[year] =
            (acc.electricityBills[year] || 0) +
            parseInt(curr.electricityBills[year] || 0, 10);
        }

        for (const year in curr.occupancyRates) {
          acc.occupancyRates[year] =
            (acc.occupancyRates[year] || 0) +
            parseInt(curr.occupancyRates[year] || 0, 10);
        }

        return acc;
      },
      { ...defaultHotel }
    );
  };

  return (
    <>
      <Helmet>
        <title>الفنادق | لوحة المؤشرات الجغرافية</title>
      </Helmet>

      <div
        className="flex flex-col space-y-6 text-right h-[-webkit-fill-available] w-[-webkit-fill-available]"
        dir="rtl"
      >
        <div className="flex flex-col gap-2 text-right">
          <h1 className="mx-auto text-3xl font-extrabold p-2.5 bg-white/55 rounded-md backdrop-blur-md w-full flex justify-center">
            لوحة مؤشرات الأداء العام للفنادق
          </h1>

          {/* فلتر القطاع والفندق */}
          <div className="flex flex-col gap-2 text-right rtl">
            <div className="flex gap-2">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
              >
                <option value="" disabled hidden>
                  جميع القطاعات
                </option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <select
                value={selectedHotelName}
                onChange={(e) => setSelectedHotelName(e.target.value.trim())}
                className="border p-1 rounded basis-1/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
              >
                <option value="">اختر فندقاً</option>
                {[...new Set(filteredHotels.map((hotel) => hotel.name))].map(
                  (name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  )
                )}
              </select>
            </div>

            <button
              onClick={() => navigate("/HotelsForm")}
              className="bg-green-500 text-white p-1 rounded text-[10px] sm:text-xs md:text-sm"
            >
              تعديل بيانات الفنادق
            </button>
          </div>
        </div>

        {/* بيانات الفندق */}
        <div className="grid grid-cols-3 gap-2 flex-1 h-0">
          <div className="col-span-1 overflow-y-auto pr-2 h-full" dir="ltr">
            <div>
              <h2 className="text-lg font-bold mb-2">معلومات الفندق</h2>
              <div className="grid grid-cols-2 gap-4">
                <StatCard title="اسم الفندق" value={hotel.name} />
                <StatCard title="عدد الغرف" value={hotel.numberOfRooms} />
                <StatCard title="عدد الزوار" value={hotel.numberOfVisitors} />
                <StatCard title="تقييم الفندق" value={hotel.hotelCategory} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">
                كمية الكهرباء المستهلكة (كيلوواط/سنة)
              </h2>
              <CustomBarChart
                data={electricityData}
                xKey="year"
                barKey="electricity"
                barColor="#f59e0b"
                title="استهلاك الكهرباء (ك.و/سنة)"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">متوسط نسبة الإشغال</h2>
              <CustomLineChart
                data={accommodationData}
                xKey="year"
                yKeys={[{ name: "percentage", color: "#3b82f6" }]}
                title="نسبة الإشغال على مدار السنوات"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">الخصائص البيئية</h2>
              <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="col-span-2 h-full rounded-xl leaflet-container !bg-transparent">
            <MapDash initialData={mapData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotels;
