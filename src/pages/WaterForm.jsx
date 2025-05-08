import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const WaterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: "all",
    year: "all",
    waterConsumption: "",
    leakagePercent: "",
    desalinationPlantsCities: "",
    desalinationPlantsHotels: "",
    productionCapacityCities: "",
    productionCapacityHotels: "",
    treatmentPlantsCount: "",
    sewageVolume_2021: "",
    sewageVolume_2022: "",
    sewageVolume_2023: "",
    sewageVolume_2024: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("waterFormData", JSON.stringify(formData));
    console.log("تم حفظ البيانات:", formData);
  };

  return (
    <>
      <Helmet>
        <title>نموذج بيانات المياه | لوحة معلومات نظم المعلومات الجغرافية</title>
      </Helmet>

      <div dir="rtl" className="max-w-4xl rounded-lg mt-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700">
          تعديل بيانات المياه
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* City and Year */}
          <div className="flex gap-4">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 rounded w-full sm:w-3/4"
            >
              <option value="all">اختر المدينة</option>
              <option value="cityA">المدينة A</option>
              <option value="cityB">المدينة B</option>
            </select>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="border p-2 rounded w-full sm:w-1/4"
            >
              <option value="all">اختر السنة</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <InputField label="استهلاك المياه للفرد (م³/سنة)" name="waterConsumption" value={formData.waterConsumption} onChange={handleChange} placeholder="أدخل القيمة" />
          <InputField label="نسبة التسرب في شبكات المياه (%)" name="leakagePercent" value={formData.leakagePercent} onChange={handleChange} placeholder="أدخل النسبة" />
          <InputField label="عدد محطات التحلية (مدن)" name="desalinationPlantsCities" value={formData.desalinationPlantsCities} onChange={handleChange} placeholder="أدخل العدد" />
          <InputField label="عدد محطات التحلية (فنادق)" name="desalinationPlantsHotels" value={formData.desalinationPlantsHotels} onChange={handleChange} placeholder="أدخل العدد" />
          <InputField label="القدرة الإنتاجية لمحطات التحلية (مدن) م³/يوم" name="productionCapacityCities" value={formData.productionCapacityCities} onChange={handleChange} placeholder="أدخل القدرة" />
          <InputField label="القدرة الإنتاجية لمحطات التحلية (فنادق) م³/يوم" name="productionCapacityHotels" value={formData.productionCapacityHotels} onChange={handleChange} placeholder="أدخل القدرة" />
          <InputField label="عدد محطات المعالجة" name="treatmentPlantsCount" value={formData.treatmentPlantsCount} onChange={handleChange} placeholder="أدخل العدد" />
          <InputField label="كمية مياه الصرف الصحي 2021 (م³)" name="sewageVolume_2021" value={formData.sewageVolume_2021} onChange={handleChange} placeholder="أدخل الكمية" />
          <InputField label="كمية مياه الصرف الصحي 2022 (م³)" name="sewageVolume_2022" value={formData.sewageVolume_2022} onChange={handleChange} placeholder="أدخل الكمية" />
          <InputField label="كمية مياه الصرف الصحي 2023 (م³)" name="sewageVolume_2023" value={formData.sewageVolume_2023} onChange={handleChange} placeholder="أدخل الكمية" />
          <InputField label="كمية مياه الصرف الصحي 2024 (م³)" name="sewageVolume_2024" value={formData.sewageVolume_2024} onChange={handleChange} placeholder="أدخل الكمية" />

          <div className="flex justify-center mt-6">
            <button onClick={() => navigate("/water")} type="submit" className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none">
              حفظ البيانات
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex gap-4">
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border p-2 rounded w-full"
        placeholder={placeholder}
        min="0"
      />
    </div>
  </div>
);

export default WaterForm;
