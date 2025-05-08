import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHotelsData } from "../api/indicatorsAPI";
import { Helmet } from "react-helmet";

const HotelsForm = () => {
  const [data, setData] = useState(null);
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

  const [electricityBills, setElectricityBills] = useState({
    2021: "",
    2022: "",
    2023: "",
    2024: ""
  });

  const [occupancyRates, setOccupancyRates] = useState({
    2021: "",
    2022: "",
    2023: "",
    2024: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    getHotelsData()
      .then((res) => {
        setData(res);
        const hotel = res.hotels[0];
        setName(hotel.name);
        setNumberOfRooms(hotel.number_of_rooms || "");
        setSolarWaterHeater(hotel.solar_water_heater || false);
        setDesalinationPlant(hotel.has_desalination_plant || false);
        setTreatmentPlant(hotel.has_treatment_plant || false);
        setWasteSeparation(hotel.separates_waste || false);
      })
      .catch((err) => {
        console.error("فشل في تحميل بيانات الفنادق:", err);
      });
  }, []);

  const handleSave = () => {
    const hotelData = {
      name,
      location,
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
    

    localStorage.setItem("hotelFormData", JSON.stringify(hotelData));
    console.log("تم حفظ البيانات في localStorage:", hotelData);
    navigate("/Hotels");
  };


  return (
    <>
      <Helmet>
        <title>نموذج الفنادق | لوحة المعلومات الجغرافية</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">نموذج بيانات الفنادق</h1>

        <form className="space-y-6">
          {/* اسم الفندق */}
          <div className="flex flex-col">
            <label className="font-semibold">اسم الفندق</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded mt-1" />
          </div>

          {/* عدد الغرف */}
          <div className="flex flex-col">
            <label className="font-semibold">عدد الغرف</label>
            <input type="number" value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} className="border p-2 rounded mt-1" />
          </div>

          {/* عدد الرحلات الجوية */}
          <div className="flex flex-col">
            <label className="font-semibold">عدد الرحلات الجوية</label>
            <input type="number" value={numberOfFlights} onChange={(e) => setNumberOfFlights(e.target.value)} className="border p-2 rounded mt-1" />
          </div>

          {/* عدد الزوار */}
          <div className="flex flex-col">
            <label className="font-semibold">عدد الزوار</label>
            <input type="number" value={numberOfVisitors} onChange={(e) => setNumberOfVisitors(e.target.value)} className="border p-2 rounded mt-1" />
          </div>

          {/* تصنيف الفندق */}
          <div className="flex flex-col">
            <label className="font-semibold">تصنيف الفندق</label>
            <select value={hotelCategory} onChange={(e) => setHotelCategory(e.target.value)} className="border p-2 rounded mt-1">
              <option value="5 نجوم">5 نجوم</option>
              <option value="4 نجوم">4 نجوم</option>
              <option value="3 نجوم">3 نجوم</option>
              <option value="غير مصنف">غير مصنف</option>
            </select>
          </div>

          {/* القطاع (المنطقة أو المدينة) */}
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
            <label className="font-semibold">قدرة الطاقة الشمسية (كيلوواط)</label>
            <input type="number" value={solarPowerCapacity} onChange={(e) => setSolarPowerCapacity(e.target.value)} className="border p-2 rounded mt-1" />
          </div>

          {/* سخانات المياه الشمسية */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={solarWaterHeater} onChange={() => setSolarWaterHeater(!solarWaterHeater)} />
            <label className="font-semibold">سخانات مياه شمسية</label>
          </div>

          {/* محطة تحلية */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={desalinationPlant} onChange={() => setDesalinationPlant(!desalinationPlant)} />
            <label className="font-semibold">يوجد محطة تحلية</label>
          </div>

          {/* محطة معالجة */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={treatmentPlant} onChange={() => setTreatmentPlant(!treatmentPlant)} />
            <label className="font-semibold">يوجد محطة معالجة</label>
          </div>

          {/* فصل النفايات */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={wasteSeparation} onChange={() => setWasteSeparation(!wasteSeparation)} />
            <label className="font-semibold">يتم فصل النفايات</label>
          </div>

          {/* الكهرباء المستهلكة */}
          <div>
            <h2 className="font-semibold mt-4 mb-2">كمية الكهرباء المستهلكة (كيلوواط/سنة)</h2>
            {Object.keys(electricityBills).map((year) => (
              <div key={year} className="flex flex-col">
                <label>{year}</label>
                <input
                  type="number"
                  value={electricityBills[year]}
                  onChange={(e) =>
                    setElectricityBills({ ...electricityBills, [year]: e.target.value })
                  }
                  className="border p-2 rounded mt-1"
                />
              </div>
            ))}
          </div>

          {/* نسبة الإشغال */}
          <div>
            <h2 className="font-semibold mt-4 mb-2">متوسط نسبة الإشغال</h2>
            {Object.keys(occupancyRates).map((year) => (
              <div key={year} className="flex flex-col">
                <label>{year}</label>
                <input
                  type="number"
                  value={occupancyRates[year]}
                  onChange={(e) =>
                    setOccupancyRates({ ...occupancyRates, [year]: e.target.value })
                  }
                  className="border p-2 rounded mt-1"
                />
              </div>
            ))}
          </div>

          {/* زر الحفظ */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              حفظ البيانات
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HotelsForm;
