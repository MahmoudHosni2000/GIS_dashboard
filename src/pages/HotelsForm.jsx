import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

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

  return (
    <div className="space-y-8 p-5" dir="rtl">
      <Helmet>
        <title>نموذج الفنادق | لوحة المعلومات الجغرافية</title>
      </Helmet>
      <div className="container mx-auto">
        <img
          className="form-logo"
          src="https://img.icons8.com/?size=100&id=64714&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5 form-title">
          نموذج إضافة وتحديث بيانات الفنادق
        </h1>
        <div className="max-w-6xl mx-auto">
          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="col-span-2 space-y-4 form !pt-0">
              <h1 className="font-semibold mt-4 mb-2 text-xl">
                معلومات الفندق
              </h1>
              {/* اسم الفندق */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-semibold">اسم الفندق</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded mt-1"
                  />
                </div>

                {/* عدد الغرف */}
                <div className="flex flex-col">
                  <label className="font-semibold">عدد الغرف</label>
                  <input
                    type="number"
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(e.target.value)}
                    className="border p-2 rounded mt-1"
                  />
                </div>

                {/* عدد الرحلات الجوية */}
                <div className="flex flex-col">
                  <label className="font-semibold">عدد الرحلات الجوية</label>
                  <input
                    type="number"
                    value={numberOfFlights}
                    onChange={(e) => setNumberOfFlights(e.target.value)}
                    className="border p-2 rounded mt-1"
                  />
                </div>

                {/* عدد الزوار */}
                <div className="flex flex-col">
                  <label className="font-semibold">عدد الزوار</label>
                  <input
                    type="number"
                    value={numberOfVisitors}
                    onChange={(e) => setNumberOfVisitors(e.target.value)}
                    className="border p-2 rounded mt-1"
                  />
                </div>

                {/* تصنيف الفندق */}
                <div className="flex flex-col">
                  <label className="font-semibold">تصنيف الفندق</label>
                  <select
                    value={hotelCategory}
                    onChange={(e) => setHotelCategory(e.target.value)}
                    className="border p-2 rounded mt-1"
                  >
                    <option value="5 نجوم">5 نجوم</option>
                    <option value="4 نجوم">4 نجوم</option>
                    <option value="3 نجوم">3 نجوم</option>
                    <option value="غير مصنف">غير مصنف</option>
                  </select>
                </div>

                {/* القطاع */}
                <div className="flex flex-col">
                  <label className="font-semibold">القطاع</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 rounded mt-1"
                  />
                </div>

                {/* قدرة الطاقة الشمسية */}
                <div className="flex flex-col">
                  <label className="font-semibold">
                    قدرة الطاقة الشمسية (كيلوواط)
                  </label>
                  <input
                    type="number"
                    value={solarPowerCapacity}
                    onChange={(e) => setSolarPowerCapacity(e.target.value)}
                    className="border p-2 rounded mt-1"
                  />
                </div>
              </div>
            </div>

            {/* قسم الموقع الجغرافي */}
            <div className="col-span-2 space-y-4 form !pt-0">
              <h1 className="font-semibold mt-4 mb-2 text-xl">
                قسم الموقع الجغرافي{" "}
              </h1>
              <div className="grid grid-cols-2 gap-4">
                {/* خط العرض */}
                <div className="flex flex-col">
                  <label className="font-semibold"> خط العرض (Latitude)</label>
                  <input
                    type="number"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="border p-2 rounded mt-1"
                  />
                </div>

                {/* خط الطول */}
                <div className="flex flex-col">
                  <label className="font-semibold">خط الطول (Longitude)</label>
                  <input
                    type="number"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="border p-2 rounded mt-1"
                  />
                </div>
              </div>
            </div>

            {/* الكهرباء المستهلكة */}
            <div className="col-span-2 space-y-4 form !pt-0">
              <h1 className="font-semibold mt-4 mb-2 text-xl">
                كمية الكهرباء المستهلكة (كيلوواط/سنة)
              </h1>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(electricityBills).map((year) => (
                  <div key={year} className="flex flex-col">
                    <label>{year}</label>
                    <input
                      type="number"
                      value={electricityBills[year]}
                      onChange={(e) =>
                        setElectricityBills({
                          ...electricityBills,
                          [year]: e.target.value,
                        })
                      }
                      className="border p-2 rounded mt-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* نسبة الإشغال */}
            <div className="col-span-2 space-y-4 form !pt-0">
              <h1 className="font-semibold mt-4 mb-2 text-xl">
                متوسط نسبة الإشغال
              </h1>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(occupancyRates).map((year) => (
                  <div key={year} className="flex flex-col">
                    <label>{year}</label>
                    <input
                      type="number"
                      value={occupancyRates[year]}
                      onChange={(e) =>
                        setOccupancyRates({
                          ...occupancyRates,
                          [year]: e.target.value,
                        })
                      }
                      className="border p-2 rounded mt-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* خصائص بيئية */}
            <div className="col-span-2 space-y-4 form !pt-0">
              <label className="font-semibold block mb-2">
                الخصائص البيئية:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* سخانات المياه الشمسية */}
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={solarWaterHeater}
                    onChange={() => setSolarWaterHeater(!solarWaterHeater)}
                  />
                  <span>سخانات مياه شمسية</span>
                </label>

                {/* محطة تحلية */}
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={desalinationPlant}
                    onChange={() => setDesalinationPlant(!desalinationPlant)}
                  />
                  <span>يوجد محطة تحلية</span>
                </label>

                {/* محطة معالجة */}
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={treatmentPlant}
                    onChange={() => setTreatmentPlant(!treatmentPlant)}
                  />
                  <span>يوجد محطة معالجة</span>
                </label>

                {/* فصل النفايات */}
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={wasteSeparation}
                    onChange={() => setWasteSeparation(!wasteSeparation)}
                  />
                  <span>يتم فصل النفايات</span>
                </label>
              </div>
            </div>
            <div></div>
            {/* زر الحفظ */}
            <div className="text-center flex flex-col sm:flex-row justify-end">
              <button
                onClick={() => navigate("/hotels")}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-r-lg transition duration-200"
              >
                حفظ
              </button>

              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-l-lg transition duration-200"
              >
                إرسال البيانات (Excel)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelsForm;
