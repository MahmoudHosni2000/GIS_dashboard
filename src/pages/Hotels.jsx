import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import CustomLineChart from "../components/CustomLineChart";
import SplashScreen from "../components/SplashScreen";
import { getHotelsData } from "../api/indicatorsAPI";
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
    getHotelsData()
      .then((res) => {
        setData(res);
        setFilteredHotels(res.hotels); // Default all hotels
        setSelectedHotel(res.hotels[0]); // First hotel by default
        setTimeout(() => setShowSplash(false), 200);
      })
      .catch((err) => {
        console.error("Failed to load hotel data:", err);
      });
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
        <title>Hotels | GIS Dashboard</title>
      </Helmet>

      <div className="space-y-6">
        {/* Hotel Selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Sector Dropdown */}
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
            <option value="">Select Sector</option>
            {/* جلب القطاعات بدون تكرار */}
            {[...new Set(data.hotels.map((h) => h.location))].map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>

          {/* Hotel Dropdown */}
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
          {selectedHotel && (
            <button
              onClick={() => navigate("/HotelsForm")}
              className="bg-green-500 text-white p-2 rounded"
            >
              Edit Hotels Data
            </button>
          )}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Rooms" value={selectedHotel.number_of_rooms} />
          <StatCard title="Plane Trips" value={selectedHotel.plane_trips} />
          <StatCard title="Visitors" value={selectedHotel.visitors} />
          <StatCard title="Hotel Rating" value={selectedHotel.star_rating} />
          <StatCard
            title="PV Capacity (kW)"
            value={selectedHotel.pv_capacity_kw}
          />
          <StatCard
            title="Solar Water Heater"
            value={selectedHotel.solar_water_heater ? "Yes" : "No"}
          />
          <StatCard
            title="Desalination Plant"
            value={selectedHotel.has_desalination_plant ? "Yes" : "No"}
          />
          <StatCard
            title="Treatment Plant"
            value={selectedHotel.has_treatment_plant ? "Yes" : "No"}
          />
          <StatCard
            title="Waste Separation"
            value={selectedHotel.separates_waste ? "Yes" : "No"}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4">
          <CustomBarChart
            data={electricityData}
            xKey="year"
            barKey="electricity"
            barColor="#f59e0b"
            title="Electricity Consumption (kW/year)"
          />

          <CustomLineChart
            data={accommodationData}
            xKey="year"
            yKeys={[{ name: "percentage", color: "#3b82f6" }]}
            title="Accommodation Percentage Over Years"
          />
        </div>
      </div>
    </>
  );
};

export default Hotels;
