import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";

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
    <div className="space-y-8 p-1" dir="rtl">
      <Helmet>
        <title>
          نموذج بيانات المياه | لوحة معلومات نظم المعلومات الجغرافية
        </title>
      </Helmet>
      <div className="mx-auto">
        <img
          class="form-logo"
          src="https://img.icons8.com/?size=100&id=114622&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-center form-title mb-1 !mt-0">
          تطبيق إضافة وتحديث بيانات المياة
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* القسم الأول: اختيار المدينة والسنة */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 flex gap-4">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border p-1 rounded basis-3/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
                >
                  <option value="not_selected">اختر المدينة</option>
                  <option value="cityA">المدينة A</option>
                  <option value="cityB">المدينة B</option>
                </select>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="border p-1 rounded basis-1/4 dark:bg-gray-600 dark:text-white bg-white text-[10px] sm:text-xs md:text-sm"
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
          <div className="flex flex-col md:flex-row form !mt-3">
            <div className="w-full md:w-1/3 p-2">
              <h2 className="text-base font-bold mb-3 mt-1">
                معلومات استهلاك المياه
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end  pb-3">
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
              <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

              {/* القسم الثالث: محطات التحلية */}
              <h2 className="text-base font-bold mb-3 mt-1">محطات التحلية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6  pb-5">
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
              <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

              {/* القسم الرابع: محطات المعالجة */}
              <h2 className="text-base font-bold mb-3 mt-1">
                معالجة مياه الصرف
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end  pb-5">
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
              <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

              {/* القسم الخامس: الإحداثيات */}
              <h2 className="text-base font-bold mb-3 mt-1">الموقع الجغرافي</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
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
              <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

              {/* زر الإرسال */}
              <div className="text-center flex flex-col sm:flex-row justify-end  !mt-2 !mb-0">
                <button
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

export default WaterForm;
