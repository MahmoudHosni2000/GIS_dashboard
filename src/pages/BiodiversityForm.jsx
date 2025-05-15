import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const BiodiversityForm = () => {
  const navigate = useNavigate();

  // استرجاع البيانات من localStorage (إذا كانت موجودة)
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("biodiversityFormData");
    return savedData ? JSON.parse(savedData) : initialFormData;
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

  return (
    <div className="space-y-8 p-5" dir="rtl">
      <Helmet>
        <title>نموذج التنوع البيولوجي | لوحة المعلومات</title>
      </Helmet>
      <div className="container mx-auto">
        <img
          className="form-logo"
          src="https://img.icons8.com/?size=100&id=115365&format=png&color=000000"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center mb-5 form-title">
          تطبيق إضافة وتحديث بيانات التنوع البيولوجي
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* القسم الأول: بيانات عامة */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="col-span-2 text-xl font-semibold mb-4">
              البيانات العامة
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "dailyTouristBoats",
                "mooringPoints",
                "coralChange",
                "trainedCrew",
                "trainedGuides",
              ].map((key) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="mb-1 font-medium">
                    {labels[key]}
                  </label>
                  <input
                    type="number"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                    placeholder="أدخل القيمة"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* القسم الثاني: الأنشطة البيئية */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="col-span-2 text-xl font-semibold mb-4">
              الأنشطة البيئية
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "ecoWaterSports",
                "sustainabilityIncentives",
                "visitorsPerSite",
                "greenFinsMembers",
                "greenFinsIncentives",
              ].map((key) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="mb-1 font-medium">
                    {labels[key]}
                  </label>
                  <input
                    type="number"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                    placeholder="أدخل القيمة"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* القسم الثالث: أنواع الشعاب */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="col-span-2 text-xl font-semibold mb-4">
              أنواع الشعاب المرجانية
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "reefSpeciesChange",
                "paTrainedPersonnel",
                "paBudgetIncrease",
                "enforcementPatrols",
                "patrolActions",
              ].map((key) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="mb-1 font-medium">
                    {labels[key]}
                  </label>
                  <input
                    type="number"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                    placeholder="أدخل القيمة"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* القسم الرابع: الإدارة والتدريب */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="col-span-2 text-xl font-semibold mb-4">
              الإدارة والتدريب
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "boatsWithSewageTanks",
                "seaNutrientDecrease",
                "boatsUsingLandFacilities",
                "dischargeSalinityDecrease",
                "greyWaterUseReduction",
              ].map((key) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="mb-1 font-medium">
                    {labels[key]}
                  </label>
                  <input
                    type="number"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                    placeholder="أدخل القيمة"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* القسم الخامس: المشغلين والنظافة */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="col-span-2 text-xl font-semibold mb-4">
              المشغلين والنظافة
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "operatorsPromotingSafeProducts",
                "marineCleanups",
                "coastalDamageReports",
                "illegalFishingReports",
                "birdMortalityDecrease",
              ].map((key) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="mb-1 font-medium">
                    {labels[key]}
                  </label>
                  <input
                    type="number"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                    placeholder="أدخل القيمة"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* القسم السادس: الحيوانات البحرية */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="col-span-2 text-xl font-semibold mb-4">
              الحيوانات البحرية
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "birdRehabilitationCases",
                "turtleNestingSites",
                "turtlesRescued",
              ].map((key) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="mb-1 font-medium">
                    {labels[key]}
                  </label>
                  <input
                    type="number"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                    placeholder="أدخل القيمة"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* قسم الموقع الجغرافي */}
          <div className="col-span-2 space-y-4 form !pt-0">
            <h2 className="col-span-2 text-xl font-semibold mb-4">
              قسم الموقع الجغرافي
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {["longitude", "latitude"].map((key) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="mb-1 font-medium">
                    {labels[key]}
                  </label>
                  <input
                    type="number"
                    name={key}
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded"
                    placeholder="أدخل القيمة"
                  />
                </div>
              ))}
            </div>
          </div>
          <div></div>
          <div className="text-center flex flex-col sm:flex-row justify-end">
            <button
              onClick={() => navigate("/")}
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
