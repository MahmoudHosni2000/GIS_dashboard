import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const TransportForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eBuses: "",
    cngStations: "",
    microbusesGasPercentage: "",
    electricVehicles: "",
    chargingPoints: "",
    bikeAndWalkTracksLength: "",
    bikeTripsCount: "",
    bikeSharingStations: "",
    gasTaxisPercentage: "",
    touristVehiclesCars: "",
    touristVehiclesMinibuses: "",
    touristVehiclesBuses: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("transportData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("transportData", JSON.stringify(formData));
    console.log("تم حفظ البيانات:", formData);
    navigate("/Transport");
  };

  return (
    <div className="space-y-8 p-5" dir="rtl">
      <Helmet>
        <title>تعديل بيانات النقل | لوحة مؤشرات GIS</title>
      </Helmet>
      <div className="container">
        <img
          class="form-logo"
          src="https://img.icons8.com/?size=100&id=115365&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5">
          تطبيق إضافة وتحديث بيانات النقل
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="eBuses">
              عدد الحافلات العامة الكهربائية (e-Buses)
            </label>
            <input
              type="text"
              name="eBuses"
              value={formData.eBuses}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="cngStations">
              عدد محطات وقود الغاز الطبيعي (CNG)
            </label>
            <input
              type="text"
              name="cngStations"
              value={formData.cngStations}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="microbusesGasPercentage">
              نسبة الميكروباصات التي تعمل بالغاز الطبيعي
            </label>
            <input
              type="text"
              name="microbusesGasPercentage"
              value={formData.microbusesGasPercentage}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="electricVehicles">عدد المركبات الكهربائية</label>
            <input
              type="text"
              name="electricVehicles"
              value={formData.electricVehicles}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="chargingPoints">
              عدد نقاط شحن المركبات الكهربائية
            </label>
            <input
              type="text"
              name="chargingPoints"
              value={formData.chargingPoints}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bikeAndWalkTracksLength">
              طول مسارات المشاة والدراجات الهوائية (كم)
            </label>
            <input
              type="text"
              name="bikeAndWalkTracksLength"
              value={formData.bikeAndWalkTracksLength}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bikeTripsCount">
              عدد رحلات الدراجات اليومية والإجمالية
            </label>
            <input
              type="text"
              name="bikeTripsCount"
              value={formData.bikeTripsCount}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bikeSharingStations">
              عدد محطات مشاركة الدراجات العامة
            </label>
            <input
              type="text"
              name="bikeSharingStations"
              value={formData.bikeSharingStations}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="gasTaxisPercentage">
              نسبة سيارات الأجرة العاملة بالغاز الطبيعي
            </label>
            <input
              type="text"
              name="gasTaxisPercentage"
              value={formData.gasTaxisPercentage}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="touristVehiclesCars">عدد السياح حسب السيارات</label>
            <input
              type="text"
              name="touristVehiclesCars"
              value={formData.touristVehiclesCars}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="touristVehiclesMinibuses">
              عدد السياح حسب الميكروباص
            </label>
            <input
              type="text"
              name="touristVehiclesMinibuses"
              value={formData.touristVehiclesMinibuses}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="touristVehiclesBuses">
              عدد السياح حسب الحافلات
            </label>
            <input
              type="text"
              name="touristVehiclesBuses"
              value={formData.touristVehiclesBuses}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/transport")}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportForm;
