import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const WaterForm = () => {
  const navigate = useNavigate();

  // داخل useState
  const [formData, setFormData] = useState({
    city: "not_selected",
    year: "not_selected",
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
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // استرجاع البيانات القديمة
    const existingData =
      JSON.parse(localStorage.getItem("waterFormDataStack")) || [];

    // إضافة البيانات الجديدة في بداية المصفوفة (stack behavior)
    const updatedData = [formData, ...existingData];

    // تخزين البيانات في localStorage
    localStorage.setItem("waterFormDataStack", JSON.stringify(updatedData));

    console.log("تم حفظ البيانات:", formData);
    navigate("/water"); // تأكد من التنقل بعد الحفظ إذا ده هو المطلوب
  };

  return (
    <div className="space-y-8 p-5" dir="rtl">
      <Helmet>
        <title>
          نموذج بيانات المياه | لوحة معلومات نظم المعلومات الجغرافية
        </title>
      </Helmet>
      <div className="container mx-auto">
        <img
          class="form-logo"
          src="https://img.icons8.com/?size=100&id=114622&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5 form-title">
          تطبيق إضافة وتحديث بيانات المياة
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* القسم الأول: اختيار المدينة والسنة */}
          <div className="space-y-4 form">
            <h2 className="text-xl font-bold mb-4">الموقع والزمن</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 flex gap-4">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border p-2 rounded w-full sm:w-3/4"
                >
                  <option value="not_selected">اختر المدينة</option>
                  <option value="cityA">المدينة A</option>
                  <option value="cityB">المدينة B</option>
                </select>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="border p-2 rounded w-full sm:w-1/4"
                >
                  <option value="not_selected">اختر السنة</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
          </div>

          {/* القسم الثاني: استهلاك المياه والتسرب */}
          <div className="space-y-4 form">
            <h2 className="text-xl font-bold mb-4">معلومات استهلاك المياه</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="استهلاك المياه للفرد (م³/سنة)"
                name="waterConsumption"
                value={formData.waterConsumption}
                onChange={handleChange}
                placeholder="أدخل القيمة"
              />
              <InputField
                label="نسبة التسرب في شبكات المياه (%)"
                name="leakagePercent"
                value={formData.leakagePercent}
                onChange={handleChange}
                placeholder="أدخل النسبة"
              />
            </div>
          </div>

          {/* القسم الثالث: محطات التحلية */}
          <div className="space-y-4 form">
            <h2 className="text-xl font-bold mb-4">محطات التحلية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="عدد محطات التحلية (مدن)"
                name="desalinationPlantsCities"
                value={formData.desalinationPlantsCities}
                onChange={handleChange}
                placeholder="أدخل العدد"
              />
              <InputField
                label="عدد محطات التحلية (فنادق)"
                name="desalinationPlantsHotels"
                value={formData.desalinationPlantsHotels}
                onChange={handleChange}
                placeholder="أدخل العدد"
              />
              <InputField
                label="القدرة الإنتاجية لمحطات التحلية (مدن) م³/يوم"
                name="productionCapacityCities"
                value={formData.productionCapacityCities}
                onChange={handleChange}
                placeholder="أدخل القدرة"
              />
              <InputField
                label="القدرة الإنتاجية لمحطات التحلية (فنادق) م³/يوم"
                name="productionCapacityHotels"
                value={formData.productionCapacityHotels}
                onChange={handleChange}
                placeholder="أدخل القدرة"
              />
            </div>
          </div>

          {/* القسم الرابع: محطات المعالجة */}
          <div className="space-y-4 form">
            <h2 className="text-xl font-bold mb-4">معالجة مياه الصرف</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="عدد محطات المعالجة"
                name="treatmentPlantsCount"
                value={formData.treatmentPlantsCount}
                onChange={handleChange}
                placeholder="أدخل العدد"
              />
              <InputField
                label="كمية مياه الصرف الصحي 2021 (م³)"
                name="sewageVolume_2021"
                value={formData.sewageVolume_2021}
                onChange={handleChange}
                placeholder="أدخل الكمية"
              />
              <InputField
                label="كمية مياه الصرف الصحي 2022 (م³)"
                name="sewageVolume_2022"
                value={formData.sewageVolume_2022}
                onChange={handleChange}
                placeholder="أدخل الكمية"
              />
              <InputField
                label="كمية مياه الصرف الصحي 2023 (م³)"
                name="sewageVolume_2023"
                value={formData.sewageVolume_2023}
                onChange={handleChange}
                placeholder="أدخل الكمية"
              />
              <InputField
                label="كمية مياه الصرف الصحي 2024 (م³)"
                name="sewageVolume_2024"
                value={formData.sewageVolume_2024}
                onChange={handleChange}
                placeholder="أدخل الكمية"
              />
            </div>
          </div>

          {/* القسم الخامس: الإحداثيات */}
          <div className="space-y-4 form">
            <h2 className="text-xl font-bold mb-4">الموقع الجغرافي</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="خط العرض (Latitude)"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="أدخل خط العرض"
              />
              <InputField
                label="خط الطول (Longitude)"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="أدخل خط الطول"
              />
            </div>
          </div>

          {/* زر الإرسال */}
          <div className="text-center flex flex-col sm:flex-row justify-end">
            <button
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
