import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import MapView from "../components/MapView";

const HotelsForm = () => {
  const [name, setName] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [numberOfFlights, setNumberOfFlights] = useState("");
  const [numberOfVisitors, setNumberOfVisitors] = useState("");
  const [hotelCategory, setHotelCategory] = useState("5 نجوم");
  const [solarPowerCapacity, setSolarPowerCapacity] = useState("");
  const [solarWaterHeater, setSolarWaterHeater] = useState(false);
  const [desalinationPlant, setDesalinationPlant] = useState(false);
  const [treatmentPlant, setTreatmentPlant] = useState(false);
  const [wasteSeparation, setWasteSeparation] = useState(false);
  const [location, setLocation] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
  });
  const [electricityBills, setElectricityBills] = useState({
    2021: "",
    2022: "",
    2023: "",
    2024: "",
  });

  const [occupancyRates, setOccupancyRates] = useState({
    2021: "",
    2022: "",
    2023: "",
    2024: "",
  });

  const navigate = useNavigate();

  const handleSave = () => {
    const hotelData = {
      name,
      location,
      longitude,
      latitude,
      numberOfRooms,
      numberOfFlights,
      numberOfVisitors,
      hotelCategory,
      solarPowerCapacity,
      solarWaterHeater,
      desalinationPlant,
      treatmentPlant,
      wasteSeparation,
      electricityBills,
      occupancyRates,
    };

    // الحصول على البيانات القديمة من localStorage
    const existingData =
      JSON.parse(localStorage.getItem("hotelFormData")) || [];

    // إضافة البيانات الجديدة إلى المصفوفة القديمة
    existingData.push(hotelData);

    // تخزين البيانات المحدثة في localStorage
    localStorage.setItem("hotelFormData", JSON.stringify(existingData));

    // الانتقال إلى صفحة الفنادق
    navigate("/hotels");

    console.log("تم حفظ البيانات في localStorage:", hotelData);
  };

  const handleLocationSelect = (coords) => {
    setFormData((prev) => {
      const newLat = coords.latitude.toFixed(6);
      const newLng = coords.longitude.toFixed(6);

      if (prev.latitude === newLat && prev.longitude === newLng) {
        return prev; // مفيش تغيير
      }

      return {
        ...prev,
        latitude: newLat,
        longitude: newLng,
      };
    });
  };

  return (
    <div className="space-y-8 p-5 h-screen" dir="rtl">
      <Helmet>
        <title>نموذج الفنادق | لوحة المعلومات الجغرافية</title>
      </Helmet>
      <div className="mx-auto flex flex-col h-[-webkit-fill-available]">
        <img
          className="form-logo"
          src="https://img.icons8.com/?size=100&id=64714&format=png&color=000000"
          alt="Logo"
        />
        <h2 className="text-2xl font-bold text-center mb-5 form-title">
          نموذج إضافة وتحديث بيانات الفنادق
        </h2>
        <form
          onSubmit={handleSave}
          className="flex flex-col flex-1 h-0 md:flex-row form"
        >
          <div className="w-full md:w-1/3 p-2 overflow-auto">
            <h1 className="text-base font-bold mb-3 mt-1">معلومات الفندق</h1>
            {/* اسم الفندق */}
            <div className="grid grid-cols-3 gap-4 items-end mb-3">
              <div className="flex flex-col">
                <label className="block text-xs font-normal text-gray-600">
                  اسم الفندق
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-1 border rounded text-right text-xs"
                />
              </div>

              {/* عدد الغرف */}
              <div className="flex flex-col">
                <label className="block text-xs font-normal text-gray-600">
                  عدد الغرف
                </label>
                <input
                  type="number"
                  value={numberOfRooms}
                  onChange={(e) => setNumberOfRooms(e.target.value)}
                  className="w-full px-4 py-1 border rounded text-right text-xs"
                />
              </div>

              {/* عدد الرحلات الجوية */}
              <div className="flex flex-col">
                <label className="block text-xs font-normal text-gray-600">
                  عدد الرحلات الجوية
                </label>
                <input
                  type="number"
                  value={numberOfFlights}
                  onChange={(e) => setNumberOfFlights(e.target.value)}
                  className="w-full px-4 py-1 border rounded text-right text-xs"
                />
              </div>

              {/* عدد الزوار */}
              <div className="flex flex-col">
                <label className="block text-xs font-normal text-gray-600">
                  عدد الزوار
                </label>
                <input
                  type="number"
                  value={numberOfVisitors}
                  onChange={(e) => setNumberOfVisitors(e.target.value)}
                  className="w-full px-4 py-1 border rounded text-right text-xs"
                />
              </div>

              {/* تصنيف الفندق */}
              <div className="flex flex-col">
                <label className="block text-xs font-normal text-gray-600">
                  تصنيف الفندق
                </label>
                <select
                  value={hotelCategory}
                  onChange={(e) => setHotelCategory(e.target.value)}
                  className="w-full px-4 py-1 border rounded text-right text-xs border-gray-300 dark:bg-gray-600 dark:text-white bg-white"
                >
                  <option value="5 نجوم">5 نجوم</option>
                  <option value="4 نجوم">4 نجوم</option>
                  <option value="3 نجوم">3 نجوم</option>
                  <option value="غير مصنف">غير مصنف</option>
                </select>
              </div>

              {/* القطاع */}
              <div className="flex flex-col">
                <label className="block text-xs font-normal text-gray-600">
                  القطاع
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-1 border rounded text-right text-xs"
                />
              </div>

              {/* قدرة الطاقة الشمسية */}
              <div className="flex flex-col w-max">
                <label className="block text-xs font-normal text-gray-600">
                  قدرة الطاقة الشمسية (كيلوواط)
                </label>
                <input
                  type="number"
                  value={solarPowerCapacity}
                  onChange={(e) => setSolarPowerCapacity(e.target.value)}
                  className="w-full px-4 py-1 border rounded text-right text-xs"
                />
              </div>
            </div>
            <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* الكهرباء المستهلكة */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h1 className="text-base font-bold mb-3 mt-1">
                كمية الكهرباء المستهلكة (كيلوواط/سنة)
              </h1>
              <div className="grid grid-cols-2 gap-4 pb-3">
                {Object.keys(electricityBills).map((year) => (
                  <div key={year} className="flex flex-col">
                    <label className="block text-xs font-normal text-gray-600">
                      {year}
                    </label>
                    <input
                      type="number"
                      value={electricityBills[year]}
                      onChange={(e) =>
                        setElectricityBills({
                          ...electricityBills,
                          [year]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-1 border rounded text-right text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* نسبة الإشغال */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h1 className="text-base font-bold mb-3 mt-1">
                متوسط نسبة الإشغال
              </h1>
              <div className="grid grid-cols-2 gap-4 pb-3">
                {Object.keys(occupancyRates).map((year) => (
                  <div key={year} className="flex flex-col">
                    <label className="block text-xs font-normal text-gray-600">
                      {year}
                    </label>
                    <input
                      type="number"
                      value={occupancyRates[year]}
                      onChange={(e) =>
                        setOccupancyRates({
                          ...occupancyRates,
                          [year]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-1 border rounded text-right text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* خصائص بيئية */}
            <div className="col-span-2 space-y-4 !pt-0">
              <label className="font-semibold block mb-2">
                الخصائص البيئية:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* سخانات المياه الشمسية */}
                <label className="block text-right mb-2 text-xs">
                  <input
                    type="checkbox"
                    checked={solarWaterHeater}
                    onChange={() => setSolarWaterHeater(!solarWaterHeater)}
                  />
                  <span>سخانات مياه شمسية</span>
                </label>

                {/* محطة تحلية */}
                <label className="block text-right mb-2 text-xs">
                  <input
                    type="checkbox"
                    checked={desalinationPlant}
                    onChange={() => setDesalinationPlant(!desalinationPlant)}
                  />
                  <span>يوجد محطة تحلية</span>
                </label>

                {/* محطة معالجة */}
                <label className="block text-right mb-2 text-xs">
                  <input
                    type="checkbox"
                    checked={treatmentPlant}
                    onChange={() => setTreatmentPlant(!treatmentPlant)}
                  />
                  <span>يوجد محطة معالجة</span>
                </label>

                {/* فصل النفايات */}
                <label className="block text-right mb-2 text-xs">
                  <input
                    type="checkbox"
                    checked={wasteSeparation}
                    onChange={() => setWasteSeparation(!wasteSeparation)}
                  />
                  <span>يتم فصل النفايات</span>
                </label>
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* قسم الموقع الجغرافي */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h1 className="text-base font-bold mb-3 mt-1">
                قسم الموقع الجغرافي{" "}
              </h1>
              <div className="grid grid-cols-2 gap-4 pb-3">
                {/* خط العرض */}
                <div className="flex flex-col">
                  <label className="block text-xs font-normal text-gray-600">
                    {" "}
                    خط العرض (Latitude)
                  </label>
                  <input
                    type="number"
                    value={formData.latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="w-full px-4 py-1 border rounded text-right text-xs"
                  />
                </div>

                {/* خط الطول */}
                <div className="flex flex-col">
                  <label className="block text-xs font-normal text-gray-600">
                    خط الطول (Longitude)
                  </label>
                  <input
                    type="number"
                    value={formData.longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="w-full px-4 py-1 border rounded text-right text-xs"
                  />
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />
            {/* زر الحفظ */}
            <div className="text-center flex flex-col sm:flex-row justify-end !mt-2 !mb-0">
              <button
                onClick={() => navigate("/hotels")}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-6 rounded-r-lg transition duration-200 text-sm"
              >
                حفظ
              </button>

              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-6 rounded-l-lg transition duration-200 text-sm"
              >
                إرسال البيانات (Excel)
              </button>
            </div>
          </div>
          <div className="w-full md:w-2/3 !m-0">
            <MapView onLocationSelect={handleLocationSelect} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelsForm;
