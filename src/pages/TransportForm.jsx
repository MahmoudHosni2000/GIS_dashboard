import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";

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
    <div className="space-y-8 p-5" dir="rtl">
      <Helmet>
        <title>تعديل بيانات النقل | لوحة مؤشرات GIS</title>
      </Helmet>
      <div className="mx-auto">
        <img
          className="form-logo mx-auto mb-5"
          src="https://img.icons8.com/?size=100&id=115365&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5 form-title">
          تطبيق إضافة وتحديث بيانات النقل
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row form !mt-3"
        >
          <div className="w-full md:w-1/3 p-5">
            {/* قسم الحافلات والمركبات العامة */}
            <fieldset className="mb-3">
              <h2 className="text-xl font-semibold mb-3 mt-3">
                بيانات المركبات العامة
              </h2>
              <div className="grid md:grid-cols-3 gap-6 items-end">
                {[
                  {
                    label: "عدد الحافلات العامة الكهربائية (e-Buses)",
                    name: "eBuses",
                  },
                  {
                    label: "عدد المركبات الكهربائية",
                    name: "electricVehicles",
                  },
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
                ].map((field) => (
                  <InputField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </fieldset>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* قسم الدراجات والمشاة */}
            <fieldset className="mb-3">
              <h2 className="text-xl font-semibold mb-3 mt-3">
                بيانات المشاة والدراجات
              </h2>
              <div className="grid md:grid-cols-3 gap-6 items-end">
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
                ].map((field) => (
                  <InputField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </fieldset>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* قسم السياحة */}
            <fieldset className="mb-3">
              <h2 className="text-xl font-semibold mb-3 mt-3">
                بيانات السياحة
              </h2>
              <div className="grid md:grid-cols-3 gap-6 items-end">
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
                ].map((field) => (
                  <InputField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </fieldset>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* قسم الموقع الجغرافي */}
            <fieldset className="mb-3">
              <h2 className="text-xl font-semibold mb-3 mt-3">
                الموقع الجغرافي
              </h2>
              <div className="grid md:grid-cols-2 gap-6 items-end">
                {[
                  { label: "خط العرض (Latitude)", name: "latitude" },
                  { label: "خط الطول (Longitude)", name: "longitude" },
                ].map((field) => (
                  <InputField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </fieldset>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* زر الإرسال */}
            <div className="text-center flex flex-col sm:flex-row justify-end !mt-3 !mb-0">
              <button
                onClick={() => navigate("/transport")}
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

          <div className="w-full md:w-2/3">
            <MapView onLocationSelect={handleLocationSelect} />
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex gap-4">
    <div className="w-full">
      <label htmlFor={name} className="block text-xs font-normal text-gray-600">
        {label}
      </label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-1 border rounded text-right text-xs"
        placeholder={placeholder}
        min="0"
      />
    </div>
  </div>
);

export default TransportForm;
