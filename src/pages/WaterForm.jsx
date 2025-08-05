import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";

const WaterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stationName: "",
    city: "",
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
    ownerEntity: "",
    stationType: "",
    operatingStatus: "",
    beneficiaryPopulation: "",
    inputWaterVolume: "",
    lostWaterVolume: "",
    stationCapacity: "",
    actualTreatedVolume: "",
    operationHoursPerDay: "",
    inletSource: "",
    treatmentTechnology: "",
    treatmentOutcomeQuality: "",
    rejectionReason: null,
    responseStatus: "",
    videoUrl: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // توليد التاريخ الحالي بصيغة "١٩-٦-٢٠٢٥"
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // تحويل الأرقام إلى أرقام عربية
    const toArabicDigits = (number) =>
      number.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

    const addedDate = `${toArabicDigits(day)}-${toArabicDigits(
      month
    )}-${toArabicDigits(year)}`;

    // تحديث البيانات مع تاريخ الإضافة
    const fullFormData = {
      ...formData,
      addedDate,
    };

    // استرجاع البيانات القديمة
    const existingData =
      JSON.parse(localStorage.getItem("waterFormDataStack")) || [];

    // إضافة البيانات الجديدة في بداية المصفوفة (stack behavior)
    const updatedData = [fullFormData, ...existingData];

    // تخزين البيانات في localStorage
    localStorage.setItem("waterFormDataStack", JSON.stringify(updatedData));

    console.log("تم حفظ البيانات:", fullFormData);
    navigate("/water");
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
    <div className="space-y-8 p-5 h-screen" dir="rtl">
      <Helmet>
        <title>
          نموذج بيانات المياه | لوحة معلومات نظم المعلومات الجغرافية
        </title>
      </Helmet>
      <div className="mx-auto flex flex-col h-[-webkit-fill-available]">
        <img
          class="form-logo"
          src="https://img.icons8.com/?size=100&id=114622&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5 form-title">
          تطبيق إضافة وتحديث بيانات المياة
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 h-0 md:flex-row form"
        >
          {/* القسم الثاني: استهلاك المياه والتسرب */}
          <div className="w-full md:w-1/3 p-2 overflow-auto">
            <h2 className="text-base font-bold mb-3 mt-1">معلومات المحطة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-5">
              <InputField
                type="text"
                label="اسم المحطة"
                name="stationName"
                value={formData.stationName}
                onChange={handleChange}
                placeholder="أدخل اسم المحطة"
              />
              <InputField
                type="text"
                label="المدينة"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="أدخل المدينة"
              />
              <InputField
                type="text"
                label="الجهة المالكة"
                name="ownerEntity"
                value={formData.ownerEntity}
                onChange={handleChange}
                placeholder="أدخل الجهة"
              />
              <SelectField
                label="نوع المحطة"
                name="stationType"
                value={formData.stationType}
                onChange={handleChange}
                empty={"اختر النوع"}
                options={["تحلية", "صرف صحي"]}
              />
              <SelectField
                label="حالة التشغيل"
                name="operatingStatus"
                value={formData.operatingStatus}
                onChange={handleChange}
                empty={"اختر الحالة"}
                options={["قيد التشغيل", "مؤجل"]}
              />
              <SelectField
                label="سنة التشغيل"
                name="year"
                value={formData.year}
                onChange={handleChange}
                empty={"اختر السنة"}
                options={["2021", "2022", "2023", "2024"]}
              />
            </div>
            <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* القسم الثالث: بيانات التشغيل */}
            <h2 className="text-base font-bold mb-3 mt-1">بيانات التشغيل</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-5">
              <InputField
                type="number"
                label="عدد السكان المستفيدين"
                name="beneficiaryPopulation"
                value={formData.beneficiaryPopulation}
                onChange={handleChange}
                placeholder="أدخل العدد"
              />
              <InputField
                type="number"
                label="كمية المياه الداخلة للمحطة (م³)"
                name="inputWaterVolume"
                value={formData.inputWaterVolume}
                onChange={handleChange}
                placeholder="أدخل الكمية"
              />
              <InputField
                type="number"
                label="كمية المياه المفقودة (م³)"
                name="lostWaterVolume"
                value={formData.lostWaterVolume}
                onChange={handleChange}
                placeholder="أدخل الكمية"
              />
              <InputField
                type="number"
                label="الطاقة الاستيعابية للمحطة (م³)"
                name="stationCapacity"
                value={formData.stationCapacity}
                onChange={handleChange}
                placeholder="أدخل الطاقة"
              />
              <InputField
                type="number"
                label="الكمية المعالجة فعليًا (م³)"
                name="actualTreatedVolume"
                value={formData.actualTreatedVolume}
                onChange={handleChange}
                placeholder="أدخل الكمية"
              />
              <InputField
                type="number"
                label="عدد ساعات التشغيل في اليوم"
                name="operationHoursPerDay"
                value={formData.operationHoursPerDay}
                onChange={handleChange}
                placeholder="أدخل الساعات"
              />
            </div>
            <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* القسم الرابع: محطات المعالجة */}
            <h2 className="text-base font-bold mb-3 mt-1">تفاصيل المعالجة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5">
              <SelectField
                label="مصدر المياه الداخلة"
                name="inletSource"
                value={formData.inletSource}
                onChange={handleChange}
                empty={"اختر النوع"}
                options={["سكني", "فندقي وسكني", "فندقي"]}
              />
              <SelectField
                label="تقنية المعالجة"
                name="treatmentTechnology"
                value={formData.treatmentTechnology}
                onChange={handleChange}
                empty={"اختر النوع"}
                options={["بيولوجية تقليدية", "فيزيائية وكيميائية", "MBR"]}
              />
              <SelectField
                label="جودة المياه الخارجة"
                name="treatmentOutcomeQuality"
                value={formData.treatmentOutcomeQuality}
                onChange={handleChange}
                empty={"اختر النوع"}
                options={["مطابقة", "غير مطابقة"]}
              />
              <SelectField
                label="اختر موقف الرد"
                name="responseStatus"
                value={formData.responseStatus}
                onChange={handleChange}
                empty={"اختر موقف الرد"}
                options={["مرفوض", "مقبول"]}
              />
              {/* <InputField
                type="text"
                label="سبب الرفض (إن وجد)"
                name="rejectionReason"
                value={formData.rejectionReason || ""}
                onChange={handleChange}
                placeholder="سبب الرفض"
              /> */}
            </div>
            <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />
            {/* الفيديو توضيحي */}
            <h2 className="text-base font-bold mb-3 mt-1">رفع فيديو توضيحي</h2>
            <div className="mb-4">
              <label
                htmlFor="videoUpload"
                className="block text-xs font-normal text-gray-600 mb-1"
              >
                اختر فيديو (MP4, WebM, AVI)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // تحويله إلى Base64 للتخزين المحلي أو المعاينة
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData((prev) => ({
                        ...prev,
                        videoUrl: reader.result, // تخزين المحتوى كـ Base64
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full px-4 py-1 border rounded text-right text-xs bg-white dark:bg-gray-700"
                id="videoUpload"
              />

              {formData.videoUrl && (
                <video controls className="mt-2 max-h-52 w-full rounded shadow">
                  <source src={formData.videoUrl} type="video/mp4" />
                  المتصفح لا يدعم تشغيل الفيديو
                </video>
              )}
            </div>
            <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            <h2 className="text-base font-bold mb-3 mt-1">رفع صورة توضيحية</h2>
            <div className="mb-4">
              <label
                htmlFor="imageUpload"
                className="block text-xs font-normal text-gray-600 mb-1"
              >
                اختر صورة (JPG, PNG, JPEG)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData((prev) => ({
                        ...prev,
                        imageUrl: reader.result, // تخزين الصورة كـ Base64
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full px-4 py-1 border rounded text-right text-xs bg-white dark:bg-gray-700"
                id="imageUpload"
              />

              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="صورة مرفوعة"
                  className="mt-2 max-h-52 w-full rounded shadow object-contain"
                />
              )}
            </div>
            <div className="h-[1px] w-full  bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* القسم الخامس: الإحداثيات */}
            <h2 className="text-base font-bold mb-3 mt-1">الموقع الجغرافي</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
              <InputField
                type="number"
                label="خط العرض (Latitude)"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="أدخل خط العرض"
              />
              <InputField
                type="number"
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
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder, type }) => (
  <div className="flex gap-4">
    <div className="w-full">
      <label htmlFor={name} className="block text-xs font-normal text-gray-600">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-1 border rounded text-right text-xs"
        name={name}
        id={name}
        placeholder={placeholder}
      />
    </div>
  </div>
);
const SelectField = ({ label, name, value, onChange, options, empty }) => (
  <div className="flex gap-4">
    <div className="w-full">
      <label htmlFor={name} className="block text-xs font-normal text-gray-600">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 border rounded dark:bg-gray-600 dark:text-white bg-white sm:text-xs md:text-sm text-right text-xs"
      >
        <option value="">{empty}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default WaterForm;
