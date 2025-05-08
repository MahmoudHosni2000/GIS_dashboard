import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const EnergyForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pv_capacity_mwp: "",
    pv_capacity_change: "",
    solar_energy_production: "",
    solar_energy_production_change: "",
    electricity_consumption: "",
    electricity_consumption_change: "",
    solar_coverage_percent: "",
    solar_coverage_change: "",
    daily_consumption_per_guest: "",
    daily_consumption_change: "",
    smart_rooms: "",
    smart_rooms_change: "",
    dimmable_area_percent: "",
    dimmable_area_change: "",
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

    // تخزين البيانات في localStorage
    localStorage.setItem("energyFormData", JSON.stringify(formData));

    console.log("Form Data Submitted:", formData);
    navigate("/Energy");
  };

  return (
    <div className="space-y-8 p-5" dir="rtl">
      <Helmet>
        <title>تعديل بيانات الطاقة | لوحة مؤشرات نظم المعلومات الجغرافية</title>
      </Helmet>
      <img
        class="form-logo"
        src="https://img.icons8.com/?size=100&id=64162&format=png&color=000000"
        alt="Logo"
      />
      <h1 className="text-2xl font-bold text-center mb-5">
        تطبيق إضافة وتحديث بيانات الطاقة
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          {
            name: "pv_capacity_mwp",
            label: "إجمالي القدرة المركبة للطاقة الشمسية (MWp)",
          },
          { name: "pv_capacity_change", label: "التغير عن القيمة السابقة" },
          {
            name: "solar_energy_production",
            label:
              "الطاقة الكهربائية المنتجة من الطاقة الشمسية (MWh/سنة أو شهر)",
          },
          {
            name: "solar_energy_production_change",
            label: "التغير عن القيمة السابقة",
          },
          {
            name: "electricity_consumption",
            label: "استهلاك الطاقة الكهربائية (MWh/سنة أو شهر)",
          },
          {
            name: "electricity_consumption_change",
            label: "التغير عن القيمة السابقة",
          },
          {
            name: "solar_coverage_percent",
            label: "نسبة استهلاك الكهرباء المغطاة بالطاقة الشمسية (%)",
          },
          { name: "solar_coverage_change", label: "التغير عن القيمة السابقة" },
          {
            name: "daily_consumption_per_guest",
            label: "متوسط استهلاك الكهرباء اليومي لكل نزيل (kWh/نزيل/يوم)",
          },
          {
            name: "daily_consumption_change",
            label: "التغير عن القيمة السابقة",
          },
          {
            name: "smart_rooms",
            label: "عدد الغرف المزودة بأنظمة إدارة طاقة ذكية",
            step: 1,
          },
          {
            name: "smart_rooms_change",
            label: "التغير عن القيمة السابقة",
            step: 1,
          },
          {
            name: "dimmable_area_percent",
            label: "نسبة المساحات المزودة بإضاءة قابلة للتعتيم (%)",
          },
          { name: "dimmable_area_change", label: "التغير عن القيمة السابقة" },
        ].map(({ name, label, step = "any" }) => (
          <div key={name}>
            <label className="block text-right font-medium mb-2">{label}</label>
            <input
              name={name}
              min="0"
              step={step}
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

        <div className="text-center">
          <button
            onClick={() => navigate("/energy")}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnergyForm;
