import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";

const BiodiversityForm = () => {
  const navigate = useNavigate();

  // استرجاع البيانات من localStorage (إذا كانت موجودة)
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("biodiversityFormData");
      const parsed = JSON.parse(saved);
      return parsed && typeof parsed === "object" ? parsed : initialFormData;
    } catch (error) {
      console.error("خطأ في قراءة البيانات من localStorage:", error);
      return initialFormData;
    }
  });

  // حفظ البيانات في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem("biodiversityFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("تم إرسال البيانات:", formData);
    // هنا ممكن تبعت البيانات لـ API مستقبلاً
    navigate("/biodiversity");
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
        <title>نموذج التنوع البيولوجي | لوحة المعلومات</title>
      </Helmet>
      <div className="mx-auto flex flex-col h-[-webkit-fill-available]">
        <img
          className="form-logo"
          src="https://img.icons8.com/?size=100&id=115365&format=png&color=000000"
          alt="Logo"
        />
        <h2 className="text-2xl font-bold text-center mb-5 form-title">
          تطبيق إضافة وتحديث بيانات التنوع البيولوجي
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 h-0 md:flex-row form"
        >
          <div className="w-full md:w-1/3 p-2 overflow-auto">
            {/* القسم الأول: بيانات عامة */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">البيانات العامة</h2>
              <div className="grid grid-cols-2 gap-4 items-end">
                {[
                  "dailyTouristBoats",
                  "mooringPoints",
                  "coralChange",
                  "trainedCrew",
                  "trainedGuides",
                ].map((key) => (
                  <div key={key} className="flex flex-col">
                    <label
                      htmlFor={key}
                      className="block text-xs font-normal text-gray-600"
                    >
                      {labels[key]}
                    </label>
                    <input
                      type="number"
                      name={key}
                      id={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full px-4 py-1 border rounded text-right text-xs"
                      placeholder="أدخل القيمة"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* القسم الثاني: الأنشطة البيئية */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">الأنشطة البيئية</h2>
              <div className="grid grid-cols-2 gap-4 items-end">
                {[
                  "ecoWaterSports",
                  "sustainabilityIncentives",
                  "visitorsPerSite",
                  "greenFinsMembers",
                  "greenFinsIncentives",
                ].map((key) => (
                  <div key={key} className="flex flex-col">
                    <label
                      htmlFor={key}
                      className="block text-xs font-normal text-gray-600"
                    >
                      {labels[key]}
                    </label>
                    <input
                      type="number"
                      name={key}
                      id={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full px-4 py-1 border rounded text-right text-xs"
                      placeholder="أدخل القيمة"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* القسم الثالث: أنواع الشعاب */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                أنواع الشعاب المرجانية
              </h2>
              <div className="grid grid-cols-2 gap-4 items-end">
                {[
                  "reefSpeciesChange",
                  "paTrainedPersonnel",
                  "paBudgetIncrease",
                  "enforcementPatrols",
                  "patrolActions",
                ].map((key) => (
                  <div key={key} className="flex flex-col">
                    <label
                      htmlFor={key}
                      className="block text-xs font-normal text-gray-600"
                    >
                      {labels[key]}
                    </label>
                    <input
                      type="number"
                      name={key}
                      id={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full px-4 py-1 border rounded text-right text-xs"
                      placeholder="أدخل القيمة"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* القسم الرابع: الإدارة والتدريب */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                الإدارة والتدريب
              </h2>
              <div className="grid grid-cols-2 gap-4 items-end">
                {[
                  "boatsWithSewageTanks",
                  "seaNutrientDecrease",
                  "boatsUsingLandFacilities",
                  "dischargeSalinityDecrease",
                  "greyWaterUseReduction",
                ].map((key) => (
                  <div key={key} className="flex flex-col">
                    <label
                      htmlFor={key}
                      className="block text-xs font-normal text-gray-600"
                    >
                      {labels[key]}
                    </label>
                    <input
                      type="number"
                      name={key}
                      id={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full px-4 py-1 border rounded text-right text-xs"
                      placeholder="أدخل القيمة"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* القسم الخامس: المشغلين والنظافة */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                المشغلين والنظافة
              </h2>
              <div className="grid grid-cols-2 gap-4 items-end">
                {[
                  "operatorsPromotingSafeProducts",
                  "marineCleanups",
                  "coastalDamageReports",
                  "illegalFishingReports",
                  "birdMortalityDecrease",
                ].map((key) => (
                  <div key={key} className="flex flex-col">
                    <label
                      htmlFor={key}
                      className="block text-xs font-normal text-gray-600"
                    >
                      {labels[key]}
                    </label>
                    <input
                      type="number"
                      name={key}
                      id={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full px-4 py-1 border rounded text-right text-xs"
                      placeholder="أدخل القيمة"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* القسم السادس: الحيوانات البحرية */}
            <div className="col-span-3 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                الحيوانات البحرية
              </h2>
              <div className="grid grid-cols-3 gap-4 items-end">
                {[
                  "birdRehabilitationCases",
                  "turtleNestingSites",
                  "turtlesRescued",
                ].map((key) => (
                  <div key={key} className="flex flex-col">
                    <label
                      htmlFor={key}
                      className="block text-xs font-normal text-gray-600"
                    >
                      {labels[key]}
                    </label>
                    <input
                      type="number"
                      name={key}
                      id={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full px-4 py-1 border rounded text-right text-xs"
                      placeholder="أدخل القيمة"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            {/* قسم الموقع الجغرافي */}
            <div className="col-span-2 space-y-4 !pt-0">
              <h2 className="text-base font-bold mb-3 mt-1">
                قسم الموقع الجغرافي
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {/* خط العرض */}
                <input
                  label="خط العرض (Latitude)"
                  type="number"
                  value={formData.latitude}
                  onChange={(e) => handleChange("latitude", e.target.value)}
                  className="w-full px-4 py-1 border rounded text-right text-xs"
                />

                {/* خط الطول */}
                <input
                  label="خط الطول (Longitude)"
                  type="number"
                  value={formData.longitude}
                  onChange={(e) => handleChange("longitude", e.target.value)}
                  className="w-full px-4 py-1 border rounded text-right text-xs"
                />
              </div>
            </div>
            <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent" />

            <div className="text-center flex flex-col sm:flex-row justify-end !mt-2 !mb-0">
              <button
                onClick={() => navigate("/")}
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

          {/* قسم الموقع الجغرافي */}
          <div className="w-full md:w-2/3">
            <MapView onLocationSelect={handleLocationSelect} />
          </div>
        </form>
      </div>
    </div>
  );
};

// بيانات ابتدائية فارغة
const initialFormData = {
  dailyTouristBoats: "",
  mooringPoints: "",
  coralChange: "",
  trainedCrew: "",
  trainedGuides: "",
  ecoWaterSports: "",
  sustainabilityIncentives: "",
  visitorsPerSite: "",
  greenFinsMembers: "",
  greenFinsIncentives: "",
  reefSpeciesChange: "",
  paTrainedPersonnel: "",
  paBudgetIncrease: "",
  enforcementPatrols: "",
  patrolActions: "",
  boatsWithSewageTanks: "",
  seaNutrientDecrease: "",
  boatsUsingLandFacilities: "",
  dischargeSalinityDecrease: "",
  greyWaterUseReduction: "",
  operatorsPromotingSafeProducts: "",
  marineCleanups: "",
  coastalDamageReports: "",
  illegalFishingReports: "",
  birdMortalityDecrease: "",
  birdRehabilitationCases: "",
  turtleNestingSites: "",
  turtlesRescued: "",
  longitude: "", // 🆕 خط الطول
  latitude: "", // 🆕 خط العرض
};

// تسميات عربية للحقول
const labels = {
  dailyTouristBoats: "عدد القوارب السياحية اليومية / لكل موقع",
  mooringPoints: "عدد نقاط الرسو التشغيلية / لكل موقع",
  coralChange: "نسبة التغير في الغطاء المرجاني والتنوع",
  trainedCrew: "نسبة الطواقم البحرية المدربة",
  trainedGuides: "نسبة الأدلاء السياحيين المدربين",
  ecoWaterSports: "نسبة التحول نحو الرياضات المائية الصديقة للبيئة",
  sustainabilityIncentives: "عدد الحوافز المقدمة للمشغلين المستدامين",
  visitorsPerSite: "عدد الزوار / لكل موقع",
  greenFinsMembers: "نسبة الزيادة في أعضاء Green Fins",
  greenFinsIncentives: "عدد الحوافز المقدمة لمشغلي Green Fins",
  reefSpeciesChange: "نسبة التغير في تنوع ووفرة الأنواع المرجانية الدالة",
  paTrainedPersonnel:
    "نسبة الزيادة في عدد الموظفين المدربين في المناطق المحمية",
  paBudgetIncrease: "نسبة الزيادة في ميزانية المناطق المحمية",
  enforcementPatrols: "عدد الدوريات الرقابية",
  patrolActions: "عدد الإجراءات الرقابية والدوريات",
  boatsWithSewageTanks: "عدد القوارب المزودة بخزانات صرف صحي",
  seaNutrientDecrease: "نسبة الانخفاض في مستويات المغذيات في مياه البحر",
  boatsUsingLandFacilities:
    "عدد القوارب التي تستخدم مرافق تفريغ مياه الصرف في البر",
  dischargeSalinityDecrease:
    "نسبة انخفاض ملوحة مياه الصرف ودرجة الحرارة وتركيزات المتبقيات",
  greyWaterUseReduction: "نسبة تقليل استخدام المياه الرمادية للري الساحلي",
  operatorsPromotingSafeProducts:
    "عدد المشغلين الذين يروجون لمنتجات آمنة للشعاب المرجانية",
  marineCleanups: "عدد حملات التنظيف الساحلية والبحرية التطوعية",
  coastalDamageReports: "عدد تقارير الأضرار الناتجة عن الإنشاءات الساحلية",
  illegalFishingReports: "عدد البلاغات عن الصيد غير القانوني",
  birdMortalityDecrease: "نسبة انخفاض الوفيات بين الطيور",
  birdRehabilitationCases: "عدد حالات تأهيل الطيور",
  turtleNestingSites: "عدد مواقع تعشيش السلاحف المحمية",
  turtlesRescued: "عدد السلاحف التي تم علاجها وإنقاذها",
  longitude: "خط الطول", // 🆕
  latitude: "خط العرض", // 🆕
};

export default BiodiversityForm;
