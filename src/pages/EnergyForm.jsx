import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import MapView from "../components/MapView";

const EnergyForm = () => {
  const navigate = useNavigate();

  // استخدم useState لقراءة الثيم مرة واحدة بس
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  // تطبيق الثيم بناءً على القيمة المختارة
  useEffect(() => {
    localStorage.setItem("theme", theme);

    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else if (theme === "light") {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      html.classList.toggle("dark", isDark);
      html.classList.toggle("light", !isDark);
    }
  }, [theme]);

  const [formData, setFormData] = useState({
    pv_capacity_mwp: "",
    solar_energy_production: "",
    solar_energy_unit: "year",
    electricity_consumption: "",
    electricity_consumption_unit: "year",
    solar_coverage_percent: "",
    daily_consumption_per_guest: "",
    smart_rooms: "",
    dimmable_area_percent: "",
    latitude: "",
    longitude: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(value) ? value : parseFloat(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldData = JSON.parse(localStorage.getItem("energyFormData"));

    if (oldData) {
      const percentageDiffs = {};
      for (const key in formData) {
        if (key === "latitude" || key === "longitude") continue;

        const oldValue = parseFloat(oldData[key]);
        const newValue = parseFloat(formData[key]);

        if (!isNaN(oldValue) && oldValue !== 0) {
          percentageDiffs[key] = ((newValue - oldValue) / oldValue) * 100;
        } else {
          percentageDiffs[key] = null;
        }
      }

      localStorage.setItem(
        "energyFormDataDiff",
        JSON.stringify(percentageDiffs)
      );
    }

    localStorage.setItem("energyFormData", JSON.stringify(formData));

    console.log("Form Data Submitted:", formData);
    navigate("/energy");
  };

  return (
    <div className="space-y-8 p-1" dir="rtl">
      <Helmet>
        <title>تعديل بيانات الطاقة | لوحة مؤشرات نظم المعلومات الجغرافية</title>
      </Helmet>
      <div className="mx-auto">
        <img
          className="form-logo"
          src="https://img.icons8.com/?size=100&id=64162&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5 form-title">
          تطبيق إضافة وتحديث بيانات الطاقة
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row form">
            <div className="w-full md:w-1/3 p-2">
              {/* قسم الطاقة الشمسية */}
              <h2 className="text-xl font-semibold mb-3 mt-3">
                الطاقة الشمسية
              </h2>
              <div className="grid-cols-1 md:grid-cols-2 gap-6 flex mb-3">
                {[
                  {
                    name: "pv_capacity_mwp",
                    label: "إجمالي القدرة المركبة للطاقة الشمسية (MWp)",
                  },
                  {
                    name: "solar_energy_production",
                    label:
                      "الطاقة الكهربائية المنتجة من الطاقة الشمسية (MWh/سنة أو شهر)",
                  },
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="block text-right font-medium mb-2 text-xs">
                      {label}
                    </label>
                    <input
                      name={name}
                      min="0"
                      step="any"
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-4 py-1 border rounded text-right"
                      required
                    />

                    {name === "solar_energy_production" && (
                      <div className="mt-2 flex gap-4 justify-end">
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="solar_energy_unit"
                            value="year"
                            checked={formData.solar_energy_unit === "year"}
                            onChange={handleChange}
                          />
                          <span>سنة</span>
                        </label>
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="solar_energy_unit"
                            value="month"
                            checked={formData.solar_energy_unit === "month"}
                            onChange={handleChange}
                          />
                          <span>شهر</span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />
              {/* قسم استهلاك الكهرباء */}
              <h2 className="text-xl font-semibold mb-3 mt-3">
                استهلاك الكهرباء
              </h2>
              <div className="flex grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                {[
                  {
                    name: "electricity_consumption",
                    label: "استهلاك الطاقة الكهربائية (MWh/سنة أو شهر)",
                  },
                  {
                    name: "solar_coverage_percent",
                    label: "نسبة استهلاك الكهرباء المغطاة بالطاقة الشمسية (%)",
                  },
                  {
                    name: "daily_consumption_per_guest",
                    label:
                      "متوسط استهلاك الكهرباء اليومي لكل نزيل (kWh/نزيل/يوم)",
                  },
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="block text-right font-medium mb-2 text-xs">
                      {label}
                    </label>
                    <input
                      name={name}
                      min="0"
                      step="any"
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-4 py-1 border rounded text-right"
                      required
                    />

                    {name === "electricity_consumption" && (
                      <div className="mt-2 flex gap-4 justify-end">
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="electricity_consumption_unit"
                            value="year"
                            checked={
                              formData.electricity_consumption_unit === "year"
                            }
                            onChange={handleChange}
                          />
                          <span>سنة</span>
                        </label>
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="electricity_consumption_unit"
                            value="month"
                            checked={
                              formData.electricity_consumption_unit === "month"
                            }
                            onChange={handleChange}
                          />
                          <span>شهر</span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />
              {/* قسم الغرف الذكية والمساحات القابلة للتعتيم */}
              <h2 className="text-xl font-semibold mb-3 mt-3">
                الغرف الذكية والمساحات القابلة للتعتيم
              </h2>
              <div className="grid-cols-1 md:grid-cols-2 gap-6 flex mb-3">
                {[
                  {
                    name: "smart_rooms",
                    label: "عدد الغرف المزودة بأنظمة إدارة طاقة ذكية",
                  },
                  {
                    name: "dimmable_area_percent",
                    label: "نسبة المساحات المزودة بإضاءة قابلة للتعتيم (%)",
                  },
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="block text-right font-medium mb-2 text-xs">
                      {label}
                    </label>
                    <input
                      name={name}
                      min="0"
                      step="any"
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-4 py-1 border rounded text-right"
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />
              {/* قسم الموقع الجغرافي */}
              <h2 className="text-xl font-semibold mb-3 mt-3">
                الموقع الجغرافي
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-right font-medium mb-2 text-xs">
                    خط العرض (Latitude)
                  </label>
                  <input
                    name="latitude"
                    type="number"
                    step="any"
                    inputMode="decimal"
                    value={formData.longitude}
                    onChange={handleChange}
                    className="w-full px-4 py-1 border rounded text-right"
                    required
                  />
                </div>
                <div>
                  <label className="block text-right font-medium mb-2 text-xs">
                    خط الطول (Longitude)
                  </label>
                  <input
                    name="longitude"
                    type="number"
                    step="any"
                    inputMode="decimal"
                    value={formData.longitude}
                    onChange={handleChange}
                    className="w-full px-4 py-1 border rounded text-right"
                    required
                  />
                </div>
              </div>
              <div className="h-[1px] w-full mt-3 mb-2 bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

              {/* الأزرار */}
              <div className="text-center flex flex-col sm:flex-row justify-end !mt-1">
                <button
                  onClick={() => navigate("/energy")}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnergyForm;
