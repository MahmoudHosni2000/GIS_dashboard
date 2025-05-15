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
    latitude: "",
    longitude: "",
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
      <div className="container mx-auto">
        <img
          className="form-logo mx-auto mb-5"
          src="https://img.icons8.com/?size=100&id=115365&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5 form-title">
          تطبيق إضافة وتحديث بيانات النقل
        </h1>
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* قسم الحافلات والمركبات العامة */}
          <fieldset className="space-y-4 form">
            <h2 className="text-lg font-bold ">بيانات المركبات العامة</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  label: "عدد الحافلات العامة الكهربائية (e-Buses)",
                  name: "eBuses",
                },
                { label: "عدد المركبات الكهربائية", name: "electricVehicles" },
                {
                  label: "عدد نقاط شحن المركبات الكهربائية",
                  name: "chargingPoints",
                },
                {
                  label: "عدد محطات وقود الغاز الطبيعي (CNG)",
                  name: "cngStations",
                },
                {
                  label: "نسبة الميكروباصات التي تعمل بالغاز الطبيعي",
                  name: "microbusesGasPercentage",
                },
                {
                  label: "نسبة سيارات الأجرة العاملة بالغاز الطبيعي",
                  name: "gasTaxisPercentage",
                },
              ].map(({ label, name }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name}>{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          {/* قسم الدراجات والمشاة */}
          <fieldset className="space-y-4 form">
            <h2 className="text-lg font-bold ">بيانات المشاة والدراجات</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  label: "طول مسارات المشاة والدراجات الهوائية (كم)",
                  name: "bikeAndWalkTracksLength",
                },
                {
                  label: "عدد رحلات الدراجات يوميًا",
                  name: "bikeTripsCount",
                },
                {
                  label: "عدد محطات مشاركة الدراجات العامة",
                  name: "bikeSharingStations",
                },
              ].map(({ label, name }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name}>{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          {/* قسم السياحة */}
          <fieldset className="space-y-4 form">
            <h2 className="text-lg font-bold ">بيانات السياحة</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  label: "عدد السياح حسب السيارات",
                  name: "touristVehiclesCars",
                },
                {
                  label: "عدد السياح حسب الميكروباص",
                  name: "touristVehiclesMinibuses",
                },
                {
                  label: "عدد السياح حسب الحافلات",
                  name: "touristVehiclesBuses",
                },
              ].map(({ label, name }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name}>{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          {/* قسم الموقع الجغرافي */}
          <fieldset className="space-y-4 form">
            <h2 className="text-lg font-bold ">الموقع الجغرافي</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "خط العرض (Latitude)", name: "latitude" },
                { label: "خط الطول (Longitude)", name: "longitude" },
              ].map(({ label, name }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name}>{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          {/* زر الإرسال */}
          <div className="text-center flex flex-col sm:flex-row justify-end">
            <button
              onClick={() => navigate("/transport")}
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
  );
};

export default TransportForm;
