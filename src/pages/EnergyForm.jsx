import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const EnergyForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pv_capacity_mwp: "",
    solar_energy_production: "",
    electricity_consumption: "",
    solar_coverage_percent: "",
    daily_consumption_per_guest: "",
    smart_rooms: "",
    dimmable_area_percent: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldData = JSON.parse(localStorage.getItem("energyFormData"));

    if (oldData) {
      const percentageDiffs = {};
      for (const key in formData) {
        // تجاهل latitude و longitude
        if (key === "latitude" || key === "longitude") continue;

        const oldValue = parseFloat(oldData[key]);
        const newValue = parseFloat(formData[key]);

        // تحقق أن القيمة القديمة ليست صفرًا أو NaN
        if (!isNaN(oldValue) && oldValue !== 0) {
          percentageDiffs[key] = ((newValue - oldValue) / oldValue) * 100;
        } else {
          // في حالة القيمة القديمة = 0 أو غير موجودة، يمكن تخزين فرق مباشر أو قيمة خاصة
          percentageDiffs[key] = null; // أو newValue فقط
        }
      }

      localStorage.setItem(
        "energyFormDataDiff",
        JSON.stringify(percentageDiffs)
      );
    }

    localStorage.setItem("energyFormData", JSON.stringify(formData));

    console.log("Form Data Submitted:", formData);
    navigate("/Energy");
  };

  return (
    <div className="space-y-8 p-5" dir="rtl">
      <Helmet>
        <title>تعديل بيانات الطاقة | لوحة مؤشرات نظم المعلومات الجغرافية</title>
      </Helmet>
      <div className="container mx-auto">
        <img
          className="form-logo"
          src="https://img.icons8.com/?size=100&id=64162&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5 form-title">
          تطبيق إضافة وتحديث بيانات الطاقة
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* قسم الطاقة الشمسية */}
          <div className="form">
            <h2 className="text-xl font-semibold mb-3">الطاقة الشمسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="block text-right font-medium mb-2">
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
                    className="w-full px-4 py-2 border rounded text-right"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* قسم استهلاك الكهرباء */}
          <div className=" form">
            <h2 className="text-xl font-semibold mb-3">استهلاك الكهرباء</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <label className="block text-right font-medium mb-2">
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
                    className="w-full px-4 py-2 border rounded text-right"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* قسم الغرف الذكية والمساحات القابلة للتعتيم */}
          <div className="space-y-4 form">
            <h2 className="text-xl font-semibold mb-3">
              الغرف الذكية والمساحات القابلة للتعتيم
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="block text-right font-medium mb-2">
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
                    className="w-full px-4 py-2 border rounded text-right"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* قسم الموقع الجغرافي */}
          <div className="space-y-4 form">
            <h2 className="text-xl font-semibold mb-3">الموقع الجغرافي</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-right font-medium mb-2">
                  خط العرض (Latitude)
                </label>
                <input
                  name="latitude"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-right font-medium mb-2">
                  خط الطول (Longitude)
                </label>
                <input
                  name="longitude"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded text-right"
                  required
                />
              </div>
            </div>
          </div>

          {/* الأزرار */}
          <div className="text-center flex flex-col sm:flex-row justify-end">
            <button
              onClick={() => navigate("/energy")}
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

export default EnergyForm;
