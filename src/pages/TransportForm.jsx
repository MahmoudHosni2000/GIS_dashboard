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
    <>
      <Helmet>
        <title>تعديل بيانات النقل | لوحة مؤشرات GIS</title>
      </Helmet>
      <div className="container">
        <h1 className="text-3xl font-semibold mb-6">تعديل بيانات النقل</h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex flex-col">
            <label htmlFor="eBuses">عدد الحافلات العامة الكهربائية (e-Buses)</label>
            <input type="text" name="eBuses" value={formData.eBuses} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="cngStations">عدد محطات وقود الغاز الطبيعي (CNG)</label>
            <input type="text" name="cngStations" value={formData.cngStations} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="microbusesGasPercentage">نسبة الميكروباصات التي تعمل بالغاز الطبيعي</label>
            <input type="text" name="microbusesGasPercentage" value={formData.microbusesGasPercentage} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="electricVehicles">عدد المركبات الكهربائية</label>
            <input type="text" name="electricVehicles" value={formData.electricVehicles} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="chargingPoints">عدد نقاط شحن المركبات الكهربائية</label>
            <input type="text" name="chargingPoints" value={formData.chargingPoints} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bikeAndWalkTracksLength">طول مسارات المشاة والدراجات الهوائية (كم)</label>
            <input type="text" name="bikeAndWalkTracksLength" value={formData.bikeAndWalkTracksLength} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bikeTripsCount">عدد رحلات الدراجات اليومية والإجمالية</label>
            <input type="text" name="bikeTripsCount" value={formData.bikeTripsCount} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bikeSharingStations">عدد محطات مشاركة الدراجات العامة</label>
            <input type="text" name="bikeSharingStations" value={formData.bikeSharingStations} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="gasTaxisPercentage">نسبة سيارات الأجرة العاملة بالغاز الطبيعي</label>
            <input type="text" name="gasTaxisPercentage" value={formData.gasTaxisPercentage} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="touristVehiclesCars">عدد السياح حسب السيارات</label>
            <input type="text" name="touristVehiclesCars" value={formData.touristVehiclesCars} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="touristVehiclesMinibuses">عدد السياح حسب الميكروباص</label>
            <input type="text" name="touristVehiclesMinibuses" value={formData.touristVehiclesMinibuses} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="touristVehiclesBuses">عدد السياح حسب الحافلات</label>
            <input type="text" name="touristVehiclesBuses" value={formData.touristVehiclesBuses} onChange={handleChange} className="p-2 border rounded" />
          </div>

          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded mt-4">
            حفظ البيانات
          </button>
        </form>
      </div>
    </>
  );
};

export default TransportForm;
