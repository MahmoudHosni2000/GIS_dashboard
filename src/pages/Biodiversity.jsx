import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import CustomBarChart from "../components/CustomBarChart";
import SplashScreen from "../components/SplashScreen";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Biodiversity = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedData = localStorage.getItem("biodiversityFormData");
    const parsed = storedData ? JSON.parse(storedData) : {};

    const transformed = {
      tourism_boats_daily: { siteA: Number(parsed.dailyTouristBoats || 0) },
      operational_moorings: { siteA: Number(parsed.mooringPoints || 0) },
      visitors_per_site: { siteA: Number(parsed.visitorsPerSite || 0) },
      coral_change_percent: parsed.coralChange || "0",
      trained_crew_percent: parsed.trainedCrew || "0",
      trained_guides_percent: parsed.trainedGuides || "0",
      eco_friendly_sports_percent: parsed.ecoWaterSports || "0",
      sustainability_incentives: parsed.sustainabilityIncentives || "0",
      green_fins_growth_percent: parsed.greenFinsMembers || "0",
      green_fins_operator_incentives: parsed.greenFinsIncentives || "0",
      reef_species_change_percent: parsed.reefSpeciesChange || "0",
      pa_trained_personnel_percent: parsed.paTrainedPersonnel || "0",
      pa_budget_growth_percent: parsed.paBudgetIncrease || "0",
      enforcement_patrols: parsed.enforcementPatrols || "0",
      enforcement_actions: parsed.patrolActions || "0",
      boats_with_holding_tanks: parsed.boatsWithSewageTanks || "0",
      nutrient_level_reduction_percent: parsed.seaNutrientDecrease || "0",
      pump_out_facility_boats: parsed.boatsUsingLandFacilities || "0",
      effluent_quality_improvement_percent: parsed.dischargeSalinityDecrease || "0",
      grey_water_reduction_percent: parsed.greyWaterUseReduction || "0",
      reef_safe_product_operators: parsed.operatorsPromotingSafeProducts || "0",
      marine_cleanups: parsed.marineCleanups || "0",
      coastal_damage_reports: parsed.coastalDamageReports || "0",
      illegal_fishing_reports: parsed.illegalFishingReports || "0",
      bird_mortality_decrease_percent: parsed.birdMortalityDecrease || "0",
      bird_rehab_actions: parsed.birdRehabilitationCases || "0",
      protected_turtle_sites: parsed.turtleNestingSites || "0",
      rescued_turtles: parsed.turtlesRescued || "0"
    };

    setData(transformed);
    setTimeout(() => setShowSplash(false), 200);
  }, []);

  if (showSplash || !data) return <SplashScreen />;

  const boatsData = Object.entries(data.tourism_boats_daily).map(([site, value]) => ({ site, value }));
  const mooringsData = Object.entries(data.operational_moorings).map(([site, value]) => ({ site, value }));
  const visitorsData = Object.entries(data.visitors_per_site).map(([site, value]) => ({ site, value }));

  return (
    <>
      <Helmet>
        <title>التنوع البيولوجي | لوحة المؤشرات الجغرافية</title>
      </Helmet>

      <div className="space-y-6">
        {/* أزرار الفلترة */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilter("tourism")}
            className={`px-4 py-2 rounded ${filter === "tourism" ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
          >
            السياحة
          </button>
          <button
            onClick={() => setFilter("training")}
            className={`px-4 py-2 rounded ${filter === "training" ? "bg-yellow-500 text-white" : "bg-gray-200"
              }`}
          >
            التدريب والممارسات البيئية
          </button>
          <button
            onClick={() => setFilter("reef")}
            className={`px-4 py-2 rounded ${filter === "reef" ? "bg-purple-600 text-white" : "bg-gray-200"
              }`}
          >
            الشعاب البحرية
          </button>
          <button
            onClick={() => setFilter("conservation")}
            className={`px-4 py-2 rounded ${filter === "conservation"
              ? "bg-red-600 text-white"
              : "bg-gray-200"
              }`}
          >
            جهود الحماية
          </button>
          {/* زر التعديل */}
          <button
            onClick={() => navigate("/BiodiversityForm")}
            className="bg-green-500 text-white p-2 rounded col-span-2 sm:col-span-1 xl:col-span-2 m-0"
          >
            تعديل بيانات الاستدامة
          </button>
        </div>

        {/* المواقع السياحية */}
        {(filter === "all" || filter === "tourism") && (
          <>
            <h2 className="text-xl font-bold">المواقع السياحية</h2>
            <div className="grid grid-cols-3 gap-4">
              <CustomBarChart
                data={boatsData}
                xKey="site"
                barKey="value"
                title="عدد القوارب السياحية اليومية"
                barColor="#3b82f6"
              />
              <CustomBarChart
                data={mooringsData}
                xKey="site"
                barKey="value"
                title="مراسي صالحة للتشغيل"
                barColor="#22c55e"
              />
              <CustomBarChart
                data={visitorsData}
                xKey="site"
                barKey="value"
                title="الزوار لكل موقع"
                barColor="#facc15"
              />
            </div>
          </>
        )}

        {/* التدريب والممارسات البيئية */}
        {(filter === "all" || filter === "training") && (
          <>
            <h2 className="text-xl font-bold">التدريب والممارسات البيئية</h2>
            <div className="grid grid-cols-4 gap-4">
              <StatCard
                title="تغير في الشعاب المرجانية"
                value={data.coral_change_percent + "%"}
              />
              <StatCard
                title="الطاقم المدرب"
                value={data.trained_crew_percent + "%"}
              />
              <StatCard
                title="المرشدون المدربون"
                value={data.trained_guides_percent + "%"}
              />
              <StatCard
                title="الرياضات المائية الصديقة للبيئة"
                value={data.eco_friendly_sports_percent + "%"}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                title="حوافز الاستدامة"
                value={data.sustainability_incentives}
              />
              <StatCard
                title="نمو عضوية الزعانف الخضراء"
                value={data.green_fins_growth_percent + "%"}
              />
              <StatCard
                title="حوافز مشغلي الزعانف الخضراء"
                value={data.green_fins_operator_incentives}
              />
            </div>
          </>
        )}

        {/* تأثير الشعاب والبيئة البحرية */}
        {(filter === "all" || filter === "reef") && (
          <>
            <h2 className="text-xl font-bold">تأثير الشعاب والبيئة البحرية</h2>
            <div className="grid grid-cols-4 gap-4">
              <StatCard
                title="تغير أنواع الشعاب"
                value={data.reef_species_change_percent + "%"}
              />
              <StatCard
                title="الموظفون المدربون في المحميات"
                value={data.pa_trained_personnel_percent + "%"}
              />
              <StatCard
                title="نمو ميزانية المحميات"
                value={data.pa_budget_growth_percent + "%"}
              />
              <StatCard
                title="الدوريات الرقابية"
                value={data.enforcement_patrols}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                title="قوارب بها خزانات صرف"
                value={data.boats_with_holding_tanks}
              />
              <StatCard
                title="خفض المغذيات"
                value={data.nutrient_level_reduction_percent + "%"}
              />
              <StatCard
                title="قوارب بها مرافق تفريغ"
                value={data.pump_out_facility_boats}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                title="تحسين جودة مياه الصرف"
                value={data.effluent_quality_improvement_percent + "%"}
              />
              <StatCard
                title="خفض المياه الرمادية"
                value={data.grey_water_reduction_percent + "%"}
              />
              <StatCard
                title="مشغلو المنتجات الآمنة للشعاب"
                value={data.reef_safe_product_operators}
              />
            </div>
          </>
        )}

        {/* إجراءات الحماية */}
        {(filter === "all" || filter === "conservation") && (
          <>
            <h2 className="text-xl font-bold">إجراءات الحماية</h2>
            <div className="grid grid-cols-4 gap-4">
              <StatCard title="تنظيفات ساحلية وبحرية تطوعية" value={data.marine_cleanups} />
              <StatCard
                title="بلاغات الأضرار الساحلية"
                value={data.coastal_damage_reports}
              />
              <StatCard
                title="بلاغات الصيد غير القانوني"
                value={data.illegal_fishing_reports}
              />
              <StatCard
                title="إجراءات وإنفاذ الدوريات"
                value={data.enforcement_actions}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <StatCard
                title="انخفاض وفيات الطيور"
                value={data.bird_mortality_decrease_percent + "%"}
              />
              <StatCard
                title="إجراءات إعادة تأهيل الطيور"
                value={data.bird_rehab_actions}
              />
              <StatCard
                title="مواقع تعشيش السلاحف المحمية"
                value={data.protected_turtle_sites}
              />
              <StatCard title="السلاحف المُنقذة" value={data.rescued_turtles} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Biodiversity;
